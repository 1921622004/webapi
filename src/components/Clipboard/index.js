import React, { Component, Fragment, createRef } from "react";
import { findDOMNode } from "react-dom";

class Clipboard extends Component {

  input = createRef(null)

  clickHandler = () => {
    let input = this.input.current;
    input.focus();
    input.setSelectionRange(0,input.value.length);
    try{
      document.execCommand('copy')
    } catch(err){
      console.log('当前浏览器不支持~~~~~~~')
    }
  }

  copyHandler = ev => {
    ev.clipboardData.setData('text/plain','滑稽~~~');
  }

  componentDidMount(){
    window.addEventListener('copy',this.copyHandler);
  }

  render(){
    return(
      <Fragment>
        <h1>Clipboard</h1>
        <input type="text" ref={this.input}/>
        <button
          onClick={this.clickHandler}
        >Click me!</button>
        <input type="text" placeholder="复制试试"/>
      </Fragment>
    )
  }
}

export default Clipboard