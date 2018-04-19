module.exports.mqttTopics = ["/1","/2"];

//array of pair value objects
module.exports.treshold = [
  { field: "payload", treshold: 1 },
  { field: "temperature", treshold: 13 }
];
module.exports.findTresholdByField = field => {
  for (param of module.exports.treshold ) {
    if (field == param.field) return (param);
  }
  return false;
};
