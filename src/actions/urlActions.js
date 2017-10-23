import * as types from './actionTypes';
// import urlApi from '../api/mockUrlApi';
import UrlApi from '../api/urlApi';
import googleApi from '../api/googleApi';
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

export function loadUrlsByCompanyListSuccess(urls) {
  return { type: types.LOAD_URLS_BY_COMPANY_LIST_SUCCESS, urls };
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
    url.favorited = !url.favorited;

    dispatch(beginAjaxCall());
    return UrlApi.favoriteUrl(url).then(res => {
      if (res.data && res.data.nModified === 1) {
        dispatch(updateUrlSuccess(url));
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
      let companies = Object.assign([], names);
      let data = [];
      res.data.forEach(url => {
        data.push(url);

        // remove company so it's not called for the gcs api        
        for (let i=companies.length-1; i>=0; i--) {
          if (companies[i].toLowerCase() === url.name.toLowerCase()) {
            companies.splice(i, 1);
          }
        } 
      });

      if (companies.length > 0) {
        // googleApi.customSearch(companies)
        //   .then(res => console.log(res))
        //   .catch(err => console.log('Error: ' + err));
      }

      dispatch(loadUrlsByCompanyListSuccess(data));

  //     .then(urls => {
  //       urls.forEach(url => {
  //         doc.data.push(url);

  //         // remove company so it's not called for the gcs api        
  //         for (let i=companies.length-1; i>=0; i--) {
  //           if (companies[i].toLowerCase() === url.name.toLowerCase()) {
  //             companies.splice(i, 1);
  //           }
  //         } 
  //       });

  //       if (companies.length > 0) {
  //         callGcsApi(companies, (err, apiResults) => {
  //           if (err) {
  //             return res.json(err);
  //           }

  //           //doc.data = [...doc.data, apiResults];
  //           apiResults.forEach(url => {
  //             doc.data.push(url);
  //           });
  //           return res.json(doc);
  //         });
  //       }
  //       else {
  //         return res.json(doc);
  //       }
  //     }).catch(err => {
  //       return res.json(err);
  //     });      // todo - validate 'data' property (else handle error)

 //     dispatch(loadUrlsByCompanyListSuccess(res.data));
      // searchCompaniesFail()
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}