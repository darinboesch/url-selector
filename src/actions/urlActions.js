import * as types from './actionTypes';
// import urlApi from '../api/mockUrlApi';
import UrlApi from '../api/urlApi';
import GoogleApi from '../api/googleApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadUrlsSuccess(urls) {
  return { type: types.LOAD_URLS_SUCCESS, urls };
}

export function createUrlSuccess(url) {
  return { type: types.CREATE_URL_SUCCESS, url };
}

export function updateUrlSuccess(url) {
  return { type: types.UPDATE_URL_SUCCESS, url };
}

export function updateUrlFail() {
  return { type: types.UPDATE_URL_FAIL };
}

export function deleteUrlSuccess(url) {
  return { type: types.DELETE_URL_SUCCESS, url };
}

export function loadUrlsByCompanyListSuccess(newUrls) {
  return { type: types.LOAD_URLS_BY_COMPANY_LIST_SUCCESS, newUrls };
}

export function loadUrlsByCompanyListFail() {
  return { type: types.LOAD_URLS_BY_COMPANY_LIST_FAIL };
}

export function loadUrls() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return UrlApi.getAllUrls().then(res => {
      // todo - validate 'data' property (else handle error)
      dispatch(loadUrlsSuccess(res.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function saveUrl(url) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return UrlApi.saveUrl(url).then(url => {
      url._id ? dispatch(updateUrlSuccess(url)) :
        dispatch(createUrlSuccess(url));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function favoriteUrl(url) {
  return function (dispatch, getState) {
    let newUrl = Object.assign({}, url);
    newUrl.favorited = !url.favorited;

    dispatch(beginAjaxCall());
    return UrlApi.favoriteUrl(newUrl).then(res => {
      if (res.data && res.data.nModified === 1) {
        dispatch(updateUrlSuccess(newUrl));
      }
      else {
        dispatch(updateUrlFail());
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteUrl(url) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return UrlApi.deleteUrl(url._id).then(res => {
      if (res.data && res.data.n === 1) {
        dispatch(deleteUrlSuccess(url));
      }
      else {
        dispatch(updateUrlFail());
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadUrlsByCompanyList(names) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return UrlApi.getUrlsForCompanies(names).then(res => {
      const data = res.data;
      return new Promise((resolve, reject) => {
        // call google api for url's that don't have a source
        let companies = data.reduce((company, url) => {
          if (url.source === '') {
            company.push(url.name);
          }
          return company;
        }, []);

        if (companies.length > 0) {
          return GoogleApi.customSearch(companies)
            .then(res => {
              // update the values on our return set
              const newUrls = [];
              res.data.forEach(url => {
                let newUrl = data.find(u => u.name === url.name);
                newUrl.domain = url.domain;
                newUrl.source = 'google';
                newUrls.push(newUrl);
              });

              // update the returned urls in mongo
              return UrlApi.updateUrls(newUrls)
                .then(() => {
                  dispatch(loadUrlsByCompanyListSuccess(data));
                  resolve(data);
                })
                .catch(error => {
                  dispatch(ajaxCallError(error));
                  reject(error);
                });
            })
            .catch(error => {
              dispatch(ajaxCallError(error));
              reject(error);
            });
        }
        else {
          dispatch(loadUrlsByCompanyListSuccess(data));
          resolve(data);
        }
      });
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}