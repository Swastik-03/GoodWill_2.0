const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ngoname: String,
  campagainname: String,
  image: String,
  desc: String,
  category: String,
  goal: Number,
  raised: Number
})

//model
var ngomodel = mongoose.model('ngodetails', ngoSchema);
module.exports = ngomodel;
