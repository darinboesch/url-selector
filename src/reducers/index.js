import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import urls from './urlReducer';
import newUrls from './newUrlReducer';
import searchText from './searchReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  newUrls,
  searchText,
  urls
});

export default rootReducer;
