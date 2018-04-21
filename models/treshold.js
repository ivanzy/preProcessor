const mongoose = require('mongoose');

const tresholdSchema = mongoose.Schema({
  field: {
    type: String,
    required: true
  },
  treshold: {
    type: String,
    required: true
  }
});

const Treshold = module.exports = mongoose.model('Treshold', tresholdSchema);

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

// Update Treshold
module.exports.updateTreshold = (field, treshold, options, callback) => {
	let query = {field: field};
	let update = {
      field: treshold.field,
      treshold: treshold.treshold 
   };
   console.log("updating  treshold:" + JSON.stringify(treshold));
	Treshold.findOneAndUpdate(query, update, options, callback);
}

// Delete Treshold
module.exports.removeTreshold = (_id, callback) => {
	let query = {_id: _id};
	Treshold.remove(query, callback);
}