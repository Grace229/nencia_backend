const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let userSchema = new Schema({
  fullname: String,
  email: String,
  phonenumber: String,
  password: String,
  avatarSmall: String,
  avatar: String,
  secretToken: String,
  role: {
    type: String,
    enum: ['Admin', 'Vendor', 'User'],
    default: 'User'
}, 
  address: [{
    type: Schema.Types.ObjectId,
    ref: "address"
  }],
  confirmed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports =  {
  User: model('user', userSchema)
}