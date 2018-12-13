import React, { Component, Fragment } from "react";
import "./index.css";

function thorttl(callback,delay){
  let timer = null;
  return function (arg){
    if(timer){
      clearTimeout(this.timer);
      this.timer = null;
    };
    timer = setTimeout(callback.bind(null,arg),delay);
  }
}

class DeviceOrientation extends Component {

  state = {
    gamma: null,
    beta: null,
    alpha: null
  }

  handler = ev => {
    this.setState({
      gamma:ev.gamma,
      beta:ev.beta,
      alpha:ev.alpha
    })
  }

  thorttlHandler = thorttl(this.handler,16);

  componentDidMount() {
    window.addEventListener('deviceorientation', this.thorttlHandler);
  }

  componentWillUnmount(){
    window.removeEventListener('deviceorientation',this.thorttlHandler);
  }

  render() {
    const { gamma, beta, alpha } = this.state;
    let rotateZ = (360 - alpha).toFixed(2);
    let rotateX = (360 - beta).toFixed(2);
    let rotateY = (360 - gamma).toFixed(2);
    return (
      <Fragment>
        <div>
          <p>Gamma:{gamma}</p>
          <p>Beta:{beta}</p>
          <p>Alpha:{alpha}</p>
        </div>
        <div className="cube-wrapper">
          <div className="cube-box" style={{
            transform:`rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
          }}>
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