/*
 * svg - svg文件
 * bindValue - 绑定value属性
 * bindChange - 绑定onChange事件
 *
 */

'use strict';

import React from 'react';
import {edit} from '../SVGs';
import ButtonNormal from '../ButtonNormal';
require('./ModText.scss');

const ModText = React.createClass({

  getInitialState(){
    return {
      editing: false,
      val: this.props.text
    }
  },

  handleChange(e){
    this.setState({val: e.target.value});
  },
  handleKeyUp(e){
    if(e.keyCode===13){
      this.handleConfirm();
    }
  },
  handleStartEdit(){
    this.setState({editing: true});
  },
  handleCancelEdit(){
    this.setState({
      editing: false,
      val: this.props.text
    });
  },
  handleConfirm(){
    this.setState({
      editing: false
    });
    if(this.state.val!==this.props.text) {
      this.props.getEdited(this.state.val);
    }
  },
  render() {
    let { text, ...others } = this.props;
    return (
      <div className="modText">
        <div className="text">
          {this.state.editing?
            <input {...others} autoFocus={this.state.editing} value={this.state.val} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>:
            <p>{this.state.val?this.state.val:'暂无'}</p>
          }
        </div>
        {this.state.editing?
        <div className="controls">
          <ButtonNormal className="ButtonNormal confirm" text="确认" onClick={this.handleConfirm}/>
          <ButtonNormal text="取消" onClick={this.handleCancelEdit}/>
        </div>:
        <div className="controls">
          <div className="svgWrapper" onClick={this.handleStartEdit}>
            {edit}
          </div>
        </div>
        }
      </div>
    );
  }
});

ModText.propTypes = {
};

ModText.defaultProps = {
};
export default ModText;
