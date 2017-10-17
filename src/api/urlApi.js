import axios from "axios";

class UrlApi {
  static getNewUrls() {

    // todo: do this correctly
    
    return axios.get("/api/urls");
  }

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
}

export default UrlApi;
