const mqtt = require("mqtt");
const config = require("nconf");
const param = require("../param");
const processor = require("../processor/process-message");
RawMessage = require('../models/raw-message');


module.exports.sub = callback => {

  console.log(`subscribing to mqtt://${config.get("MQTT_BROKER")}`);
  //connecting to broker
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);
  //subscribing to configure topics
  for (topic of param.mqttTopics) {
    client.subscribe(topic);
  }
  //message event
  client.on("message", (topic, message) => {
    console.log(
      `MQTT message topic: ${topic} payload:${message.toString()} time:${new Date()}`
    );

    //stores raw message
    RawMessage.addRawMessage(message);

    //process a new message
    processedMessage = processor.process(message);

    //add message to mongoDB if valid
    if (processedMessage.valid) {
      processedMessage.message.topic = topic;
      Message.addMessage(processedMessage.message, (err, msg) => {
        if (err) throw err;
      });
    }
  });
};

module.exports.subscribeToTopic = topic => {
  //connecting to broker
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`);

  //subscribing to configure topics
  client.subscribe(topic);

  monitoreMessage(client);
  
};

var monitoreMessage = (client) =>{
  //message event
  client.on("message", (topic, message) => {
    console.log(
      `MQTT message topic: ${topic} payload:${message.toString()} time:${new Date()}`
    );
    //process a new message
    processedMessage = processor.process(message);

    //add message to mongoDB if valid
    if (processedMessage.valid) {
      Message.addMessage(processedMessage.message, (err, msg) => {
        if (err) throw err;
      });
    }
  });
}