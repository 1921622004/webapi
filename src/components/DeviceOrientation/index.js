import React, { Component, Fragment } from "react";
import "./index.css";

function thorttl(callback,delay){
  let timer = null;
  return function (arguments){
    if(timer){
      clearTimeout(this.timer);
      this.timer = null;
    };
    timer = setTimeout(callback.bind(arguments),delay);
  }
}

class DeviceOrientation extends Component {

  state = {
    gamma: null,
    beta: null,
    alpha: null
  }

  handler = ev => {
    console.log(ev);
    
  }

  componentDidMount() {
    window.addEventListener('deviceorientation', thorttl(this.handler,16))
  }

  render() {
    const { gamma, beta, alpha } = this.state;
    return (
      <Fragment>
        <div>
          <p>Gamma:{gamma}</p>
          <p>Beta:{beta}</p>
          <p>Alpha:{alpha}</p>
        </div>
        <div className="cube-wrapper">
          <div className="cube-box">
            <div className="cube-a cube">a</div>
            <div className="cube-b cube">b</div>
            <div className="cube-c cube">c</div>
            <div className="cube-d cube">d</div>
            <div className="cube-e cube">e</div>
            <div className="cube-f cube">f</div>
          </div>
        </div>
      </Fragment>

    )

  }
}

export default DeviceOrientation