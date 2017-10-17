import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import newUrls from './newUrlReducer';
import urls from './urlReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  newUrls,
  urls
});

export default rootReducer;
