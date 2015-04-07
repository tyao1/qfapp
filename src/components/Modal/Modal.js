'use strict';

import React from 'react';
import cn from 'classnames';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';


//modal起初为display:none
require('./Modal.scss');

//css动画时间
const TRANSTIME = 300;

const Modal = React.createClass({
  mixin:[PureRenderMixin],
  getInitialState(){
    return({transed:false});
  },


  componentDidUpdate(){
    //设置display:block后马上设置.active类
    if(this.props.isOpen&&!this.state.transed){
      window.requestAnimationFrame(()=>this.setState({transed:true}));
      //利用requestAnimationFrame防止两次渲染在同时发生
      //setTimeout(()=>this.setState({transed:true}),0);
    }
    else if(!this.props.isOpen&&this.state.transed){
      setTimeout(()=>this.setState({transed:false}),TRANSTIME);
    }
  },
  handleModalClick(){
    this.props.onClose();
  },
  handleInnerClick(event){
    event.stopPropagation();
  },

  render() {


    let classes = cn('modal',{active:this.props.isOpen&&this.state.transed});
    let styles = (this.props.isOpen||(!this.props.isOpen&&this.state.transed))?{display: 'flex'}:{};

    return (
      <div style={styles} className={classes}  onClick={this.handleModalClick}>
        <div className="inner" onClick={this.handleInnerClick}>
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
