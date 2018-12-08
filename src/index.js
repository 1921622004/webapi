import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Link, Route } from "react-router-dom";
import "./index.css";

import PageLifecycle from "./components/PageLifecycle";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <ul className="nav-box">
            <li>
              <Link
                to={{
                  pathname: '/pageLifecycle'
                }}
              >
                page lifecycle
            </Link>
            </li>
          </ul>
          <div className="content">
            <Switch>
              <Route path="/pageLifecycle" component={PageLifecycle} exact />
            </Switch>
          </div>
        </div>

      </HashRouter>
    )
  }
}

render(<App />, document.querySelector('#app'))