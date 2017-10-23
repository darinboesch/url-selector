import express from 'express';
import webpack from 'webpack';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);
const db = process.env.MONGODB_URI || "mongodb://localhost/urlSelectorApp";

mongoose.Promise = bluebird;
mongoose.connect(db, { useMongoClient: true }, function(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));

require("../src/routes/apiRoutes")(app);
require("../src/routes/htmlRoutes")(app);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});



