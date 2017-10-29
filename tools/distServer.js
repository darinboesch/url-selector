import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
require('../src/models/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('dist'));

require("../src/routes/apiRoutes")(app);
require("../src/routes/htmlRoutes")(app);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});



