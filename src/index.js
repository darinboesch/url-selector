/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import routes from "./config/routes";
import {loadNewUrls} from './actions/newUrlActions';
import {loadUrls} from './actions/urlActions';

const store = configureStore();
store.dispatch(loadNewUrls());
store.dispatch(loadUrls());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
