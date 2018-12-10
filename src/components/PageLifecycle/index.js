import React, { Component, Fragment } from "react";

class PageLifecycle extends Component {
  state = { count: 1 }

  updateFn = () => {
    let { count } = this.state;
    this.setState({ count: ++count });
    document.title = `count:${count}`
  }

  visibilityStateChangeHandler = () => {
    switch (document.visibilityState) {
      case 'hidden':
        clearInterval(this.timer)
        break;
      case 'visible':
        this.timer = setInterval(this.updateFn,1000);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.initialDocTitle = document.title;
    this.timer = setInterval(this.updateFn, 1000);
    window.addEventListener('visibilitychange',this.visibilityStateChangeHandler)
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    window.removeEventListener('visibilitychange',this.visibilityStateChangeHandler)
  }

  render() {
    const { count } = this.state;
    return (
      <Fragment>
        <h1>PageLifecycle</h1>
        <p>{count}</p>
      </Fragment>
    )
  }
}

export default PageLifecycle