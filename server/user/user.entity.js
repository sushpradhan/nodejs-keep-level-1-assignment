let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', userSchema);