const mongoose = require("mongoose");

const rawMessageSchema = mongoose.Schema({
  raw: {
     type: Object
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const rawMessage = (module.exports = mongoose.model(
  "rawMessage",
  rawMessageSchema
));

//Get rawMessages
module.exports.getRawMessages = (callback, limit) => {
  console.log("getting all the rawMessages");
  rawMessage.find(callback).limit(limit);
};

//Get rawMessages by id
module.exports.getRawMessageById = (_id, callback) => {
  console.log("get raw message by id:" + _id);
  rawMessage.findById(_id, callback);
};

//post new rawMessage
module.exports.addRawMessage = (msg, callback) => {
  let raw = { raw: (msg) };
  console.log("adding new rawMessage:" + raw);
  rawMessage.create(raw, callback);
};

// Delete rawMessage
module.exports.removeRawMessage = (_id, callback) => {
  let query = { _id: _id };
  rawMessage.remove(query, callback);
};
