import React from "react";
import {
  Route,
  IndexRoute,
  Router
} from "react-router";
import Auth from "../modules/Auth";

import Index from "../components/Index";
import Main from "../components/Main";
import Favorites from "../components/Favorites";
import All from "../components/All";
import Home from "../components/Home";
import Login from "../components/common/LoginForm";
import Register from "../components/common/RegisterForm";

export default function createRoutes(store, history) {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated } } = store.getState();

    if (!authenticated) {
      // Takes a Location object
      // https://github.com/mjackson/history/blob/master/docs/Location.md
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  return(
    <Router history={history}>
      <Route path="/" component={Main}>
        <Route path="home" component={Home} onEnter={requireAuth} />
        <Route path="all" component={All} onEnter={requireAuth} />
        <Route path="favorites" component={Favorites} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <IndexRoute component={Index} />
      </Route>
    </Router>
  );
}
