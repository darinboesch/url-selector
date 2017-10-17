import * as types from './actionTypes';
import urlApi from '../api/urlApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadNewUrlsSuccess(urls) {
  return { type: types.LOAD_NEW_URLS_SUCCESS, urls };
}

export function loadNewUrls() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return urlApi.getNewUrls().then(res => {
      // todo - validate 'data' property (else handle error)
      dispatch(loadNewUrlsSuccess(res.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}