Treshold  = require('./models/treshold');

module.exports.mqttTopics = ["1","2"];

//array of pair value objects
module.exports.loadTreshold = () => {
   Treshold.getTreshold((err, msg)=>{
      if (err) throw err;
      else{
         module.exports.treshold = msg;
      }
   });
   
}

module.exports.findTresholdByField = field => {
  for (param of module.exports.treshold ) {
    if (field == param.field) return (param);
  }
  return false;
};
