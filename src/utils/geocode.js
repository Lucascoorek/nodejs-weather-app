const request = require("request");

function getGeoLoc(location, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoibHVrYXNjb29yZWsiLCJhIjoiY2p4cWRybzI2MDZwdzNtcHFmNzhwY2Y1bSJ9.8yn2JmJYXUIsCW46sWahyw`;

  request({ url, json: true }, (error, response) => {
    if (error) callback("No internet connection", undefined);
    else if (response.statusCode !== 200)
      callback("You messed up the URL", undefined);
    else {
      if (!response.body.features[0])
        return callback("is not a city name", undefined);
      const lat = response.body.features[0].center[1];
      const long = response.body.features[0].center[0];
      const name = response.body.features[0].place_name;
      callback(undefined, { lat, long, name });
    }
  });
}
module.exports = getGeoLoc;
