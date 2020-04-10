import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";

import history from "./history";
import Ingresso from "../Ingresso/index";
import Attrezzaggio from "../Attrezzaggio/index";
import Riporto from "../Riporto/index";
import Chiusura from "../Chiusura/index";
import Auth from "./Auth";

const Routers = props => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Ingresso} />
      <Route exact path="/Ingresso" component={Ingresso} />
      <ProtectedRoute exact path="/Attrezzaggio" component={Attrezzaggio} />
      <ProtectedRoute exact path="/Riporto" component={Riporto} />
      <ProtectedRoute exact path="/Chiusura" component={Chiusura} />
      <Route path="*" component={() => "404 ERROR PAGE NOT FOUND"} />
    </Switch>
  </Router>
);

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

export default Routers;
