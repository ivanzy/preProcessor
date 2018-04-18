const mqtt = require("mqtt");
const config = require("nconf");

//get config topic
var topic = config.get("DEFAULT_TOPIC");
module.exports.topic = topic;

//subscribing to a topic
module.exports.sub = callback => {
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);

  //connecting to broker
  client.on("connect", () => client.subscribe(topic));

  //message event
  client.on("message", (topic, message) =>
    console.log(`MQTT message: ${message.toString()} time: ${new Date()}`)
  );
};
