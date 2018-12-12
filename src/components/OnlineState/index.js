import React, { Component, Fragment } from "react";

class OnlineState extends Component {
  state = {
    count: 1
  }

  updateHandler = () => {
    let { count } = this.state;
    this.setState({count: count + 1});
  }

  onlineHandler = () => {
    console.log(navigator.onLine);
    
    this.timer = setInterval(this.updateHandler,1000);
  }

  offlineHandler = () => {
    clearInterval(this.timer);
  }

  componentDidMount(){
    this.timer = setInterval(this.updateHandler,1000);
    window.addEventListener('online',this.onlineHandler);
    window.addEventListener('offline',this.offlineHandler);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    window.removeEventListener('online',this.onlineHandler);
    window.removeEventListener('offline',this.offlineHandler);
  }

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