import React, { Component, Fragment } from "react";

function Vibrate() {
  const startFn = () => {
    window.navigator.vibrate(2000)
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