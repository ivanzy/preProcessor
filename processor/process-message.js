const param = require("../param");
const axios = require("axios");
const nconf = require("nconf");

module.exports.process = message => {
  //convert JSON string to JavaScript Object
  let msg = JSON.parse(message.toString());
  let checkedMessage = checkAnomaly(message);
};

var checkAnomaly = message => {
  //look for any tresholds
  for (let prop in msg) {
    for (let item of param.treshold)
      if (item.field == prop)
        if (msg[prop] > item.treshold) {
          console.log("ANOMALY detected in " + item.field + " field");
          axios
            .post(`http://${nconf.get("ANALYTICS_ADDRESS")}/errorHandler`, msg)
            .then(response => console.log("Detected error sent"))
            .catch(error =>
              console.log(
                "could not connect to analytics server to send ANOMALY"
              )
            );
          return { valid: false };
        } else {
          axios
            .post(`http://${nconf.get("REASONER_ADDRESS")}/message`, msg)
            .then(response => console.log("message sent to reasoner"))
            .catch(error =>
              console.log(
                "could not connect to reasoner server to send NEW MESSAGE"
              )
            );
        }
  }
  return { valid: true, message: msg };
};
