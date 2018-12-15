import React, { Component, Fragment, createRef } from "react";

class CustomEventComponent extends Component{

  ele = createRef(null)
  btn = createRef(null)

  componentDidMount(){
    let ele = this.ele.current;
    window.addEventListener('log-in',ev => {
      console.log(ev);
      const { detail } = ev;
      ele.innerText = `你好！ ${detail}`
    });
  }

  dispatch = () => {
    window.dispatchEvent(new CustomEvent('log-in',{
      detail:"awesome"
    }))
  }

  render(){
    return(
      <Fragment>
        <h1>Custom Event</h1>
        <button onClick={this.dispatch}>登录</button>
        <p ref={this.ele}>未登录</p>
      </Fragment>
    )
  }
}

export default CustomEventComponent