const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    data: Buffer, 
    contentType: String 
  },
  date: {
    type: Date,
    default: Date.now
  }
},{
  collection: 'Profile'
});
module.exports = User = mongoose.model("Profile", UserSchema);