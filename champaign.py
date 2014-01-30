import cumtd, pywunderground, feedparser, random, os, json
from flask import Flask, jsonify, render_template, url_for

app = Flask(__name__)

# For heroku...
BUS_STOPS = json.loads(os.environ['BUS_STOPS'])
CUMTD_API_KEY = os.environ['CUMTD_API_KEY']
WUND_API_KEY = os.environ['WUND_API_KEY']
FEEDS = json.loads(os.environ['FEEDS'])

"""
Built for a little display in my house, across from the Ike.

Displays bus times/weather
"""

@app.route('/updateCUMTD', methods=["POST"])
def updateCUMTD():
    api = cumtd.CumtdApi(CUMTD_API_KEY)
    results = []
    for stop_code, stop_readable in BUS_STOPS.items():
        departures = api.get_departures_by_stop(stop_code)["departures"]
        for departure in departures:
            departure["bus_stop"] = stop_readable
            results.append(departure)

    # we should probably sort these based on expected arrival times...
    results = sorted(results, key=lambda bus: bus["expected"])
    return jsonify({"results" : results})

@app.route('/updateWeather', methods=["POST"])
def updateWeather():
    api = pywunderground.WeatherUnderground(WUND_API_KEY)
    conditions = api.conditions('61820')["current_observation"]
    ret_hash = {}
    ret_hash["temp"] = conditions["temp_f"]
    ret_hash["desc"] = conditions["weather"]

    # conditions["icon"] will not yield proper "nighttime" images, so
    # let's do this manually
    # ex: http://icons-ak.wxug.com/i/c/k/nt_clear.gif
    
    icon = conditions["icon_url"].replace("http://icons-ak.wxug.com/i/c/k/", "weather/").replace("gif", "png")
    
    ret_hash["icon"] = url_for('static', filename=icon)

    return jsonify(ret_hash)

@app.route('/updateHeadlines', methods=["POST"])
def updateHeadlines():
    headlines = []
    for feed in FEEDS:
        rss = feedparser.parse(feed)
        for item in rss["items"]:
            headlines.append(item["title"])
    random.shuffle(headlines)
    return jsonify({"results" : headlines})


@app.route('/')
def index():
    return render_template('home.html')

if __name__ == '__main__':
    app.run()