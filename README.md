'Champaign Watchdog'
====================
About
-----
I couldn't come up with a good name, but this just displays the bus stops nearest me, the weather in Champaign, and some news. It's very customisable and easily changeable.

It was designed for an 8" monitor that I found and my raspberry pi. It's written in python, so it can be used pretty much everywhere...

Setup
-----
In a file (config.py) define the constants (API Keys, Feed URLs, Bus Stops), like below:
    
```python
# file: config.py
BUS_STOPS = {"GRGIKE": "Gregory at Ikenberry", "4THGRG": "Fourth and Gregory"}
CUMTD_API_KEY = "123123..." # cumtd API Key
WUND_API_KEY = "123123..."  # Weather Underground API Key
FEEDS = ["https://www.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss", "http://www.theverge.com/rss/index.xml"]
```


Stuff Used that I Didn't Make 
-----------------------------
- jQuery NewsTicker ([rhodimus/jQuery-News-Ticker](/rhodimus/jQuery-News-Ticker))
- CUMTD Python Library ([sunahsuh/python-cumtd](/sunahsuh/python-cumtd))
- FeedParser ([kurtmckee/feedparser](/kurtmckee/feedparser))
- Flask ([mitsuhiko/flask](/mitsuhiko/flask))
- Requests ([kennethreitz/requests](/kennethreitz/requests))

Future
------
I don't really have any more ideas for this... I might finish the weather underground library that I started

Reqs
----
You'll need images for the weather. I used the HDWeather Icons from Beautiful Widgets. You'll need to rename stuff though, here are all the files you'll need (and their night equivalents, with the prefix nt_). Store them in static/weather:
- chanceflurries.png
- chancerain.png
- chancesleet.png
- chancesnow.png
- chancetstorms.png
- clear.png
- cloudy.png
- cloudyrain.png
- flurries.png
- fog.png
- hazy.png
- mostlycloudy.png
- mostlysunny.png
- partlycloudy.png
- partlysunny.png
- rain.png
- sleet.png
- snow.png
- sunny.png
- tstorms.png

I think that's it.