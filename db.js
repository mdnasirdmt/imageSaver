// db.js
const mongoose = require('mongoose');
const db = mongoose.connection;

// const url= 'mongodb://127.0.0.1:27017'

mongoose.connect('mongodb://127.0.0.1:27017/ImagesDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


db.on('error', console.error.bind(console, 'MongoDB connection errorrrrrrrrrrrrrrrrrr:'));
db.once('open', () => {
  console.log('Connected to MongoDB', 'port : 127.0.0.1');
});

module.exports = mongoose;
