const param = require("../param");
const axios = require("axios");
const nconf = require("nconf");

module.exports.process = message => {
  //convert JSON to string
  let msg = JSON.parse(message.toString());

  //look for any tresholds
  for (let prop in msg) {
    for (let item of param.treshold)
      if (item.field == prop)
        if (msg[prop] > item.treshold) {
          console.log("ERROR found in " + item.field + " field");
          axios
            .post(`http://${nconf.get("ANALYTICS_ADDRESS")}/errorHandler`, msg)
            .then(response => console.log("Detected error sent"));
        }
  }
};
