import React, { Component, Fragment } from "react";

class OnlineState extends Component {
  render() {
    const { count } = this.state;
    return (
      <Fragment>
        <h1>onLineState</h1>
        <p>{count}</p>
      </Fragment>
    )
  }
}

export default OnlineState