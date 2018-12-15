import React, { Component, Fragment } from "react";

class AmbientLight extends Component {

  sensor = null

  state = {
    lux: null
  }

  getLux = () => {
    this.sensor = new AmbientLightSensor();
    this.sensor.start();
    this.sensor.onchange = ev => {
      this.setState({
        lux: ev.reading.illuminance
      })
    }
  }

  componentDidMount() {
    if (window.AmbientLightSensor) {
      navigator.permissions.query({ name: 'ambient-light-sensor' }).then(status => {
        // 代表许可状态
        if (status.state === 'granted') {
          this.getLux();
          // 代表需要授权
        } else if (status.state === 'promt') {

          // 代表拒绝状态 status.state === 'denied'
        } else {

        }
      })

    } else {
      alert('浏览器不支持~~~~')
    }
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