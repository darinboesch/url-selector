import axios from "axios";

const API = {
  fetchUrls: function(companyList) {
    return new Promise((resolve, reject) => {

      if (!companyList || companyList.length === 0) {
        // if there's nothing given, no results go back
        return resolve({ data: [] });
      }
      else if (typeof companyList !== 'string') {
        return reject("A comma-delmited list must be provided.");
      }

      // let arrCompanies = companyList.match(/(?=\S)[^,]+?(?=\s*(,|$))/g);
      let arrCompanies = companyList.trim().split(/\s*,\s*/);

      let qs = '';
      const maxCount = 25;
      let valuesSoFar = Object.create(null);
      for (let i=0, count=0; i<arrCompanies.length; i++) {
        if (arrCompanies[i].length > 0) {
          if (++count > maxCount) {
            return reject(`You cannot provide more than ${maxCount} values.`);
          }

          if (arrCompanies[i] in valuesSoFar) {
            return reject("All values must be unique.");
          }
          valuesSoFar[arrCompanies[i]] = true;

          let pre = i === 0 ? '?' : '&';
          let encCompany = encodeURIComponent(arrCompanies[i]);
          qs += `${pre}companies[]=${encCompany}`;
        }
      }

      return axios.get("/api/url" + qs)
        .then(res => {
          // normalize the data property level to be like
          // the rest for (for the application
          return resolve(res.data);          
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  getUrls: function() {
    return axios.get("/api/urls");
  },
  saveUrl: function(name) {
    return axios.post("/api/urls", { name });
  },
  deleteUrl: function(id) {
    return axios.delete(`/api/urls/${id}`);
  },
  favoriteUrl: function(url) {
    url.favorited = !url.favorited;
    const { _id, favorited } = url;
    return axios.patch(`/api/urls/${_id}`, { favorited });
  }
};

export default API;
