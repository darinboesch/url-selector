import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import routes from '../src/routes/routes';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
const db = process.env.MONGODB_URI || "mongodb://localhost/urlSelectorApp";

mongoose.Promise = bluebird;
mongoose.connect(db, function(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('dist'));
app.use("/", routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});


