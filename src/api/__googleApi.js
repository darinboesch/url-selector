const request = require("request");
const async = require("async");
const config = require("../../config.dev");
const mongoose = require("mongoose");

module.exports = {
  customSearch: function(companies, cb) {
    const errMsg = "Error: Request failed.";
    const asyncTasks = [];
    const { url, cx, key } = config.gcsApi;
    const items = [];

    return new Promise((resolve, reject) => {
      companies.forEach(name => {
        const query = `${url}?q=${name}&cx=${cx}&key=${key}&num=1`;
        asyncTasks.push(cb => {
          request(query, cb);
        });
      });

      async.parallel(asyncTasks, (err, results) => {
        if (err) {
          if (cb) { cb(err); }
          return reject(err);
        }

        results.forEach(item => {
          const { error, body } = item[0];

          // any errors at all, we fail the lot
          if (error) {
            if (cb) { cb(errMsg); }
            return reject(error);
          }

          const obj = JSON.parse(body);
          // const newItem = new Url({
          //   name: obj.queries.request[0].searchTerms,
          //   domain: obj.items ? obj.items[0].displayLink : '< Not Found >'
          // });

          // items.push(newItem);
          // process.nextTick(() => newItem.save());
        });

        if (cb) { cb(null, items); }
        resolve(items);
      });
    });
  }
};
