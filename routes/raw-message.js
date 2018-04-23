RawMessage = require('../models/raw-message');

module.exports = router => {
   //get message by id
   router.route("/id/:_id").get((req, res) => {
      RawMessage.getRawMessageById(req.params._id, (err, msg) => {
       if (err) throw err;
       else res.json(msg);
     });
   });
 
   //get all messages
   router
     .route("/")
     .get((req, res) => {
      RawMessage.getRawMessages((err, msg) => {
         if (err) throw err;
         else res.json(msg);
       });
     })
     //post new message
     .post((req, res) => {
       let msg = req.body;
       console.log(msg);
       Message.addRawMessage(msg, (err, msg) => {
         if (err) throw err;
         else res.json(msg);
       });
     });
 };
 