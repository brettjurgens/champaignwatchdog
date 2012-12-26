import requests

# Constants
BASE_URL = 'http://api.wunderground.com/api/'

"""
Python library implementation of the wunderground's REST API
Very limited to what my thingy needs to do. Might make it fully
functional... Don't know yet.

Returns Dictionary object
"""
class WeatherUnderground:
    key = None
    base_url = BASE_URL

    def __init__(self, key):
        self.key = key
        self.url = self.base_url + self.key + '/'

    # Conditions
    def conditions(self, zip):
        return self._make_request('conditions', zip)

    def _make_request(self, api_function, function_args):
        req_url = self.url + api_function + "/q/" + function_args + ".json"
        r = requests.get(req_url)

        # raise an error if the http response code was not ok
        r.raise_for_status()
        return r.json

