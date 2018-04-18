const nconf = require("nconf");
const async = require("async");

//Load Environment variables from .env file
require("dotenv").load();
nconf.use("memory");
nconf.env().argv();

//Load application modules
const server = require("./config/initializers/server");
const db = require("./config/initializers/database")
const subscribe = require("./mqtt/subscribe");

// //subscribing to a mqtt broker
// subscribe.connect;
// subscribe.messageListener;

//initializing modules
async.series(
  [
    callback => db(callback),
  ],
  function(err) {
    if (err) console.log("[APP] initialization failed" + err);
    else console.log("[APP] initialized SUCCESSFULLY");
  }
);

async.parallel(
  [
    callback => server(callback),
    callback => subscribe.sub(callback)
  ],
  function(err) {
    if (err) console.log("[APP] initialization failed" + err);
    else console.log("[APP] initialized SUCCESSFULLY");
  }
);


