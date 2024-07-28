const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  seq: {
    type: String,
    // required: true,
  },
  output: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('sequences', sequenceSchema);
