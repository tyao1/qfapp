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
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
require('./ModText.scss');

const ModText = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState(){
    return {
      editing: false,
      val: this.props.text,
      valid: true
    }
  },

  handleChange(e){
    let val = e.target.value;
    this.setState({val: val});
    if(this.props.valide(val)){
      this.setState({valid: true});
      if(val!==this.props.text) {
        this.props.getEdited(e.target.value);
      }
      else{
        this.props.cancelEdit();
      }
    }
    else{
      this.setState({valid: false});
      this.props.cancelEdit();
    }
    /*
    if(!this.props.regex||this.props.regex.test(val)){
      this.setState({valid: true});
      if(e.target.value!==this.props.text) {
        this.props.getEdited(e.target.value);
      }
      else{
        this.props.cancelEdit();
      }
    }else{
      this.setState({valid: false});
      this.props.cancelEdit();
    }
    */
  },

  handleKeyUp(e){
    if(e.keyCode===13){
      this.props.onConfirm();
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
    this.props.cancelEdit();
  },

  render() {
    let { text, ...others } = this.props;
    return (
      <div className="modText">
        <div className="text">
          {this.state.editing?
            <input className={this.state.valid?'':'invalid'} {...others} autoFocus={this.state.editing} value={this.state.val} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>:
            <p>{this.state.val?this.state.val:'暂无'}</p>
          }
        </div>
        {this.state.editing?
        <div className="controls">
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
//          <ButtonNormal className="ButtonNormal confirm" text="确认" onClick={this.handleConfirm}/>
/*
 handleConfirm(){
 this.setState({
 editing: false
 });
 if(this.state.val!==this.props.text) {
 this.props.getEdited(this.state.val);
 }
 },

 */
ModText.propTypes = {
};

ModText.defaultProps = {
};
export default ModText;
