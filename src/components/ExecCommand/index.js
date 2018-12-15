import React, { Component, Fragment, createRef } from "react";

import "./index.css";

class ExecCommand extends Component {

  document = createRef(null);

  chooseAll = () => {
    this.editor.execCommand('selectAll')
  }

  copy = () => {
    this.editor.execCommand('copy');
  }

  cut = () => {
    this.editor.execCommand('cut')
  }

  bold = () => {
    this.editor.execCommand('bold');
  }

  italic = () => {
    this.editor.execCommand('italic')
  }

  fontSize = () => {
    this.editor.execCommand('fontSize',true,20)
  }

  underline = () => {
    this.editor.execCommand('underline')
  }

  backgroundColor = () => {
    this.editor.execCommand('hiliteColor',true,'red')
  }

  backgroundColor = () => {
    this.editor.execCommand('backColor',true,'red')
  }

  getHtml = () => {
    console.log(this.editor.body.innerHTML)
  }

  componentDidMount() {
    this.editor = this.document.current.contentDocument;
    this.editor.designMode = 'On';
    this.editor.contentEditable = true;
  }

  render() {
    return (
      <Fragment>
        <h1>ExecCommand</h1>
        <div className="operation">
          <button onClick={this.chooseAll}>全选</button>
          <button onClick={this.copy}>复制</button>
          <button onClick={this.cut}>剪切</button>
          <button onClick={this.bold}>加粗</button>
          <button onClick={this.italic}>斜体</button>
          <button onClick={this.fontSize}>修改字体大小</button>
          <button onClick={this.underline}>下划线</button>
          <button onClick={this.backgroundColor}>修改背景颜色</button>
          <button onClick={this.getHtml}>获取内容</button>
        </div>
        <iframe ref={this.document} frameborder="0" style={{
          width: 400,
          height: 400,
          border: '1px solid #e3e3e3'
        }}></iframe>
      </Fragment>
    )
  }
}

export default ExecCommand