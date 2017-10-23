//import Url from "../models/url";
const Url = require("../models/url");

module.exports = {
  index: function(req, res) {
    let query = {};
    if (req.query) {
      const pId = req.query['id'];
      const pCompanies = req.query['companies'];

      if (pId) {
        query = { _id: pId };
      }
      else if (pCompanies) {
        if (typeof pCompanies === 'string') {
          if (pCompanies.indexOf(',') > 0) {
            query = { name: { $in: pCompanies.split(',') } };
          }
          else {
            query = { name: { $in: [ pCompanies ] } };
          }
        }
        else if (Array.isArray(pCompanies)) {
          query = { name: { $in: pCompanies } };
        }
      }
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
