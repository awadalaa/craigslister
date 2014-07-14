// app/models/craigslist.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CraigslistSchema = new Schema({
  pid: { type: String, index: { unique: true }},
  category: String,
  date: Date,
  hasPic: Boolean,
  location: String,
  price: Number,
  title: String,
  url: String,
  textSent: Boolean,
  textSentDate: Date
});

module.exports.Craigslist = mongoose.model('Craigslist', CraigslistSchema);
