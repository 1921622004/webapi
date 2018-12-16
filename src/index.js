import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Link, Route } from "react-router-dom";
import "./index.css";

import PageLifecycle from "./components/PageLifecycle";
import OnlineState from "./components/OnlineState";
import Vibrate from "./components/Vibrate";
import DeviceOrientation from "./components/DeviceOrientation";
import AmbientLight from "./components/AmbientLight";
import BatteryStatus from "./components/BatteryStatus";
import CustomEventComponent from "./components/CustomEvent";
import ExecCommand from "./components/ExecCommand";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <ul className="nav-box">
            <li>
              <Link to={{ pathname: '/pageLifecycle' }}>
                page lifecycle
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/onlineState' }}>
                online state
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/vibrate' }}>
                vibrate
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/deviceOrientation' }} >
                device orientation
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/ambientLight' }}>
                ambient light
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/batteryStatus' }}>
                battery status
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/customevent' }}>
                custom event
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/execCommand' }}>
                execCommand
              </Link>
            </li>
          </ul>
          <div className="content">
            <Switch>
              <Route path="/pageLifecycle" component={PageLifecycle} exact />
              <Route path="/onlineState" component={OnlineState} exact />
              <Route path="/vibrate" component={Vibrate} exact />
              <Route path="/deviceOrientation" component={DeviceOrientation} exact />
              <Route path="/ambientLight" component={AmbientLight} exact />
              <Route path="/batteryStatus" component={BatteryStatus} exact />
              <Route path="/customEvent" component={CustomEventComponent} exact />
              <Route path="/execCommand" component={ExecCommand} exact />
            </Switch>
          </div>
        </div>

      </HashRouter>
    )
  }
}

render(<App />, document.querySelector('#app'))