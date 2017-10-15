const Url = require("../models/url");
const url = require("url");
const request = require("request");
const async = require("async");
const config = require("../../config.dev");

function callGcsApi(companies, cb) {
  const asyncTasks = [];
  const { url, cx, key } = config.gcsApi;
  const items = [];

  companies.forEach(name => {
    const query = `${url}?q=${name}&cx=${cx}&key=${key}&num=1`;
    asyncTasks.push(cb => {
      request(query, cb);
    });
  });

  async.parallel(asyncTasks, (err, results) => {
    if (err) {
      return cb(err);
    }

    results.forEach(item => {
      const { error, body } = item[0];

      // any errors at all, we fail the lot
      if (error) {
        return cb("Error: Request failed.");
      }

      const obj = JSON.parse(body);
      const newItem = new Url({
        name: obj.queries.request[0].searchTerms,
        domain: obj.items ? obj.items[0].displayLink : '< Not Found >'
      });

      items.push(newItem);
      process.nextTick(() => newItem.save());
    });

    return cb(null, items);
  });
}

module.exports = {
  fetch: function(req, res) {
    const qs_params = url.parse(req.url, true).query;
    // the documentation requested 'companies[]' for the query string argument
    // i don't endorse using []'s inside of a query string, but i took the challenge.
    const parms = qs_params['companies[]'];
    let companies = [];
    if (typeof parms === 'string') {
      companies.push(parms);
    }
    else if (parms) {
      companies = parms;
    }

    let doc = { data: [], length: companies.length };

    // check each name with mongo first so that we don't hit
    // the api for a url we already have
    Url.find({ name: { $in: companies }})
      .then(urls => {
        urls.forEach(url => {
          doc.data.push(url);

          // remove company so it's not called for the gcs api        
          for (let i=companies.length-1; i>=0; i--) {
            if (companies[i].toLowerCase() === url.name.toLowerCase()) {
              companies.splice(i, 1);
            }
          } 
        });

        if (companies.length > 0) {
          callGcsApi(companies, (err, apiResults) => {
            if (err) {
              return res.json(err);
            }

            //doc.data = [...doc.data, apiResults];
            apiResults.forEach(url => {
              doc.data.push(url);
            });
            return res.json(doc);
          });
        }
        else {
          return res.json(doc);
        }
      }).catch(err => {
        return res.json(err);
      });
  },
  index: function(req, res) {
    let query = req.query;
    if (!query) {
      query = req.params.id ? { _id: req.params.id } : {};
    }

    Url.find(query)
      .then(function(doc) {
        res.json(doc);
      }).catch(function(err) {
        res.json(err);
      });
  },
  create: function(req, res) {
    Url.create(req.body).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  update: function(req, res) {
    Url.update({
      _id: req.params.id
    },
      req.body
    ).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  destroy: function(req, res) {
    Url.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};
