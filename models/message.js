var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    payload:{
        type: Number,
        required:true
    },
    unit:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Message = module.exports = mongoose.model('Message',messageSchema );

//Get Messages
module.exports.getMessages = (callback, limit) => {
    console.log('getting all the messages');
    Message.find(callback).limit(limit);
}

//Get Messages by id
module.exports.getMessagesById = ( _id, callback) => {
    console.log('get message by id:' + _id);
    Message.findById(_id,callback );
}

//get Messages by type
module.exports.getMessagesByType = (type,callback) => {
     console.log('get message by type:' + type);
     Message.find({'type':type}, callback); 
}

//post Message
module.exports.addMessage = (msg,callback) => {
    console.log('adding new message:' + JSON.stringify(msg));
    Message.create(msg, callback); 
}