const mqtt = require("mqtt");
const config = require("nconf");
const param = require("../param");
const processor = require("../processor/process-message");

//get config topic
var topic = config.get("DEFAULT_TOPIC");

//subscribing to a topic
module.exports.sub = callback => {
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);

  //connecting to broker
  client.on("connect", () => client.subscribe(param.mqttTopic));

  //message event
  client.on("message", (topic, message) => {
    console.log(`MQTT message: ${message.toString()} time: ${new Date()}`);
    //process a new message
    processor.process(message);
  });
};
