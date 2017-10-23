const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  name: { type: String, unique: true },
  domain: String,
  favorited: {
    type: Boolean,
    default: false
  }
});

const Url = mongoose.model("URL", urlSchema);

module.exports = Url;