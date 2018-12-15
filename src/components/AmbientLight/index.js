import React, { Component, Fragment } from "react";

class AmbientLight extends Component {

  state = {
    lux: null
  }

  deviceLightHandler = ev => {
    this.setState({ lux: ev.value })
    console.log(`${ev.value} lux`);
  }

  componentDidMount() {
    window.addEventListener('devicelight', this.deviceLightHandler);
  }

  render() {
    const { lux } = this.state;
    return (
      <Fragment>
        <h1>AmbientLight</h1>
        <p>Light : {lux}lux</p>
      </Fragment>
    )
  }
}

export default AmbientLight