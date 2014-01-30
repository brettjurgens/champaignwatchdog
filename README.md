'Champaign Watchdog'
====================
About
-----
I couldn't come up with a good name, but this just displays the bus stops nearest me, the weather in Champaign, and some news. It's very customisable and easily changeable.

It was designed for an 8" monitor that I found and my raspberry pi. It's written in python, so it can be used pretty much everywhere...

Setup
-----
This uses environment variables for the stops, feeds and api keys.
```bash
# file: .env
BUS_STOPS='{"GRGIKE": "Gregory at Ikenberry", "4THGRG": "Fourth and Gregory"}'
CUMTD_API_KEY=123123... # cumtd API Key
WUND_API_KEY=123123...  # Weather Underground API Key
FEEDS='["https://www.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss", "http://www.theverge.com/rss/index.xml"]'
```


Stuff Used that I Didn't Make 
-----------------------------
- jQuery NewsTicker ([rhodimus/jQuery-News-Ticker](/rhodimus/jQuery-News-Ticker))
- CUMTD Python Library ([sunahsuh/python-cumtd](/sunahsuh/python-cumtd))
- FeedParser ([kurtmckee/feedparser](/kurtmckee/feedparser))
- Flask ([mitsuhiko/flask](/mitsuhiko/flask))
- Requests ([kennethreitz/requests](/kennethreitz/requests))
- HDWeather Icons from Beautiful Widgets

Running
-------
This branch is meant to be run on heroku, so to run locally, use foreman.
```bash
$ forman start
```