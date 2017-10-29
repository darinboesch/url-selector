import axios from "axios";

class UrlApi {
  static getAllUrls() {
    return axios.get("/api/urls");
  }

  static updateUrls(urls, cb) {
    const asyncTasks = [];
    const response = { success: false };

    return new Promise((resolve, reject) => {
      urls.forEach(u => {
        asyncTasks.push(axios.patch(`/api/urls/${u._id}`, u));
      });

      return axios.all(asyncTasks)
        .then(response => {
          response.success = true;
          if (cb) { cb(null, response); }
          resolve(response);
        })
        .catch(err => {
          if (cb) { cb(err); }
          return reject(err);
        });
    });
  }

  static deleteUrl(id) {
    return axios.delete(`/api/urls/${id}`);
  }

  static favoriteUrl(url) {
    const { _id, favorited } = url;
    return axios.patch(`/api/urls/${_id}`, { favorited });
  }

  static getUrlsForCompanies(companies) {
    let qs = '';
    for (let i=0; i<companies.length; i++) {
      let pre = i === 0 ? '?' : '&';
      let encCompany = encodeURIComponent(companies[i]);
      qs += `${pre}companies[]=${encCompany}`;
    }

    return axios.get("/api/urls" + qs);
  }
}

export default UrlApi;
