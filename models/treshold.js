//TO DO
var mongoose = require("mongoose");

var tresholdSchema = mongoose.Schema({
  field: {
    type: String,
    required: true
  },
  treshold: {
    type: String,
    required: true
  }
});

var Treshold = (module.exports = mongoose.model("Treshold", tresholdSchema));

//Get Tresholds
module.exports.getTreshold = (callback, limit) => {
  console.log("getting all the tresholds");
  Treshold.find(callback).limit(limit);
};

//Get Tresholds by id
module.exports.getTresholdById = (_id, callback) => {
  console.log("get treshold by id:" + _id);
  Treshold.findById(_id, callback);
};

//get Treshold by field
module.exports.getTresholdByField = (type, callback) => {
  console.log("get treshold by field:" + type);
  Message.find({ field: field }, callback);
};

//post new Treshold
module.exports.addTreshold = (msg, callback) => {
  console.log("adding new treshold:" + JSON.stringify(msg));
  Treshold.create(msg, callback);
};
