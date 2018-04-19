module.exports = router => {
  //get message by id
  router.route("/id/:_id").get((req, res) => {
    Message.getMessagesById(req.params._id, (err, msg) => {
      if (err) throw err;
      else res.json(msg);
    });
  });

  //get message by type
  router.route("/type/:type").get((req, res) => {
    Message.getMessagesByType(req.params.type, (err, msg) => {
      if (err) throw err;
      else res.json(msg);
    });
  });

  //get message by topic
  router.route("/topic/:topic").get((req, res) => {
    Message.getMessagesByTopic(req.params.topic, (err, msg) => {
      if (err) throw err;
      else res.json(msg);
    });
  });

  //get all messages
  router
    .route("/")
    .get((req, res) => {
      Message.getMessages((err, msg) => {
        if (err) throw err;
        else res.json(msg);
      });
    })
    //post new message
    .post((req, res) => {
      let msg = req.body;
      Message.addMessage(msg, (err, msg) => {
        if (err) throw err;
        else res.json(msg);
      });
    });
};
