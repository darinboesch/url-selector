import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function newUrlReducer(state = initialState.newUrls, action) {
  switch (action.type) {
    case types.LOAD_URLS_BY_COMPANY_LIST_SUCCESS:
      return action.urls;

    case types.LOAD_URLS_BY_COMPANY_LIST_FAIL:
      // todo: something here
      return state;

    default:
      return state;
  }
}