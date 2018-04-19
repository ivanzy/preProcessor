const params = require("../param");
const nconf = require("nconf");
const subscribe = require("../mqtt/subscribe");

module.exports = router => {
  //get threshold params
  router
    .route("/threshold")
    .get((req, res) => res.send(params.treshold))
    //adding new treshold
    .post((req, res) => {
      let tresh = req.body;
      console.log(JSON.stringify(req.body));
      params.treshold.push(tresh);
    });

  router
    .route("/threshold/:field")
    //get a treshold by field name
    .get((req, res) => {
      res.send(params.findTresholdByField(req.params.field));
    })
    //updating a treshold
    .put((req, res, next) => {
      let newTresh = params.findTresholdByField(req.params.field);
      if (newTresh) {
        newTresh.treshold = req.body.treshold;
      }
      next();
    });

  router
    .route("/mqtt")
    //get broker configuration
    .get((req, res) => {
      res.send({
        address: nconf.get("MQTT_BROKER"),
        port: nconf.get("MQTT_PORT"),
        topic: params.mqttTopics
      });
    })
    .post((req, res, next) => {
      if (req.body.topic != undefined) {
        params.mqttTopics.push(req.body.topic);
        subscribe.subscribeToTopic(req.body.topic);
      }
     next(); 
    });
};
