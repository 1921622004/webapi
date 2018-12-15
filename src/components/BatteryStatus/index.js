import React, { Component, Fragment } from "react";

class BatteryStatus extends Component {

  state = {
    isCharging: false,
    batteryLevel: null
  }

  componentDidMount() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const { charging, level } = battery;
        this.setState({
          isCharging: charging,
          batteryLevel: `${level * 100} %`
        })
        battery.onchargingchange = ev => {
          const { currentTarget } = ev;
          const { charging } = currentTarget;
          this.setState({
            isCharging: charging,
          })
        };
        battery.onlevelchange = ev => {
          const { currentTarget } = ev;
          const { level } = ev;
          this.setState({
            batteryLevel: `${level * 100 } %`
          })
        }
      })
    } else {
      alert('当前浏览器不支持~~~')
    }

  }

  render() {
    const { batteryLevel, isCharging } = this.state;
    return (
      <Fragment>
        <h1>BatteryStatus</h1>
        <p>当前电量剩剩余: {batteryLevel}</p>
        <p>
          {
            isCharging ? 
            '正在充电':
            '未插入充电器'
          }
        </p>

      </Fragment>
    )
  }
}

export default BatteryStatus