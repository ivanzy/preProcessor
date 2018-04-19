const config = require('nconf');
const mongoose = require('mongoose');

module.exports = (callback) => {
   //initializing database
   console.log('connecting to database... \n');
   mongoose.connect(`mongodb://${config.get('DB_ADDRESS')}/test`);
   const db = mongoose.connection;
   callback();
 };