import React, { Fragment } from "react";

function Vibrate() {
  const startFn = () => {
    if("vibrate" in navigator){
      window.navigator.vibrate([3000,2000,1000]);
    } else {
      alert('no support for vibrate')
    }
  }

  const stopFn = () => {
    window.navigator.vibrate(0);
  }

  return (
    <Fragment>
      <h1>vibrate</h1>
      <button onClick={startFn}>点击震动</button>
      <button onClick={stopFn}>点击停止</button>
    </Fragment>
  )
}

export default Vibrate