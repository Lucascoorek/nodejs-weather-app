var request = require("request");

function forecast(lat, long, callback) {
  const url = `https://api.darksky.net/forecast/6227412de6d9a90efaf08f08060d36e1/${lat},${long}?units=si`;
  request({ url, json: true }, function(error, response) {
    if (error) callback("No internet connection", undefined);
    else if (response.statusCode !== 200)
      callback("You messed up the URL", undefined);
    else {
      const {
        summary,
        temperature,
        precipProbability
      } = response.body.currently;
      callback(
        undefined,
        `${summary}. The temperature is: ${temperature} C. The chance of rain is ${Math.round(
          precipProbability * 100
        )}%`
      );
    }
  });
}
module.exports = forecast;
