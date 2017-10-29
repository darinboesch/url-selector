import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import urls from './urlReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  urls
});

export default rootReducer;
