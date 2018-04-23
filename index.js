const nconf = require("nconf");
const async = require("async");
const axios = require("axios");
const param = require('./param');

//Load Environment variables from .env file
require("dotenv").load();
nconf.use("memory");
nconf.env().argv();

//Load application modules
const server = require("./config/initializers/server");
const db = require("./config/initializers/database");
const subscribe = require("./mqtt/subscribe");

//setting MQTT topic
param.mqttTopic = "/novo";

//initializing db
async.series([
  callback => db(callback), 
  param.loadTreshold
], function(err) {
  if (err) console.log("DB initialization failed" + err);
  else console.log("DB initialized SUCCESSFULLY");
});

//initializing modules
async.parallel(
  [
    //initalizing server
    callback => server(callback),
    //subscribing to MQTT broker
    callback => subscribe.sub(callback)
  ],
  function(err) {
    if (err) console.log("[APP] initialization failed" + err);
    else console.log("[APP] initialized SUCCESSFULLY");
  }
);
