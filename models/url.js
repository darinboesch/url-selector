var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  name: { type: String, unique: true },
  domain: String,
  favorited: {
    type: Boolean,
    default: false
  }
});

var Url = mongoose.model("URL", urlSchema);

module.exports = Url;
