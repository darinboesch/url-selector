import axios from "axios";

class UrlApi {
  static getAllUrls() {
    return axios.get("/api/urls");
  }

  // static saveUrl(url) {
  // }

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
