'use strict';

import React from 'react';
import cn from 'classnames';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import {close} from '../SVGs';

//modal起初为display:none
require('./Modal.scss');

//css动画时间
const TRANSTIME = 300;

const Modal = React.createClass({
  getInitialState(){
    return ({transed: false});
  },

  componentDidUpdate(){
    //设置display:block后马上设置.active类
    if(this.props.isOpen&&!this.state.transed){
      window.addEventListener('keydown', this.handleKeyPress);
      //解决部分情况下class未显示完成
      setTimeout(()=> {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(()=>this.setState({transed: true}));
        }
        else {
          setTimeout(()=>this.setState({transed: true}), 0);
        }
      }, 10);
      //利用requestAnimationFrame防止两次渲染在同时发生,but ie>=10

    }
    else if(!this.props.isOpen&&this.state.transed){
      setTimeout(()=>this.setState({transed: false}), TRANSTIME);
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  },
  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  handleKeyPress(event){
    if(event.keyCode===27){
      this.props.onClose();
    }
  },
  handleModalClick(){
    this.props.onClose();
  },
  handleInnerClick(event){
    event.stopPropagation();
  },

  render() {
    let classes = cn('modal', {active: this.props.isOpen&&this.state.transed}, {ready: this.props.isOpen||(!this.props.isOpen&&this.state.transed)});
    return (
      <div className={classes} onClick={this.handleModalClick}>
        <div className="inner" onClick={this.handleInnerClick}>
          <div className="deco"/>
          <a className="close" onClick={this.handleModalClick}>{close}</a>
            {this.props.children}
        </div>
      </div>
    );
  }

});

Modal.propTypes = {
};

Modal.defaultProps = {
};

export default Modal;
