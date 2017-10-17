import * as types from './actionTypes';
// import urlApi from '../api/mockUrlApi';
import urlApi from '../api/urlApi';
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

export function loadUrls() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return urlApi.getAllUrls().then(res => {
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
    return urlApi.saveUrl(url).then(url => {
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
    return urlApi.favoriteUrl(url).then(res => {
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
    return urlApi.deleteUrl(url._id).then(res => {
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