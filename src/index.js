/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import routes from "./config/routes";

const store = configureStore();
//store.dispatch(loadUrls());

render(routes, document.getElementById("app"));
