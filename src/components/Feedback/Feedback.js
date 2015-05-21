'use strict';
import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import {close, paperplane, email} from '../SVGs';
import ButtonNormal from '../ButtonNormal';
import Modal from '../Modal';
import request from 'superagent';
import InputEffect from '../InputEffect';
import UserStore from '../../stores/UserStore';

require('./Feedback.scss');

const Feedback = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState(){
    return {
      feedOpen: false,
      text: '',
      email: UserStore.getEmail()
    }
  },
  handleShow(){
    this.setState({feedOpen: true});
  },
  handleClose(){
    this.setState({
      feedOpen: false
    });
    setTimeout(()=>{
      this.setState({
        successful: false,
        text: ''
      });
    }, 500);
  },
  handleTextChange(e){
    this.setState({
      text: e.target.value
    });
  },
  handleRealSubmitClick(){
    if(this.state.successful){
      this.handleClose();
    }
    else if(!this.state.isSubmitting) {
      if (this.state.text.length < 6) {
        this.setState({realErrMsg: '反馈至少写6个字吧'});
      }
      else if(!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(this.state.email)){
        this.setState({realErrMsg: '邮箱格式不正确'});
      }
      else {
        this.setState({isSubmitting: true, realErrMsg: ''});
        request
          .post('http://10.60.136.39/index.php/Home/Feedback.json')
          .type('form')
          .send({
            email: this.state.email,
            content: this.state.text
          })
          .end((err, res) => {
            this.setState({isSubmitting: false});
            if (err) {
              this.setState({realErrMsg: '网络错误'});
            }
            else {
              if (res.body.Code === 0) {
                this.setState({successful: true});
              }
              else {
                this.setState({realErrMsg: res.body.Msg});
              }
            }
          });
      }
    }
  },
  handleCloseSelf(){
    var node = this.getDOMNode();
    React.unmountComponentAtNode(node);
    node.outerHTML='';
  },
  handleEmailChange(e){
    this.setState({email: e.target.value, realErrMsg: ''});
  },
  render() {

    console.log('feedopen', this.state.feedOpen);
    return (
      <div className="feedback">
        <ButtonNormal text="提交反馈" onClick={this.handleShow}/>
        <div className="close" onClick={this.handleCloseSelf}>
          {close}
        </div>

        <Modal isOpen={this.state.feedOpen} onClose={this.handleClose}>
          {
            this.state.successful?
              <div className="submitForm">
                <p className="main">╰(*°▽°*)╯<br/>提交反馈成功，非常感谢，我们将认真查看！</p>
                <ButtonNormal className="ButtonNormal submit" text="关闭" svg={paperplane} onClick={this.handleRealSubmitClick}/>
              </div>
              :
              <div className="submitForm">
                <p className="main">提交反馈</p>
                <p>我们刚刚起步，您的反馈对我们至关重要</p>
                <InputEffect type="email" tmpPlaceHolder="╰(*°▽°*)╯ 输入邮箱，用于我们给您反馈" label="邮箱" svg={email} value={this.state.email} onChange={this.handleEmailChange}/>
                <textarea placeholder="输入您的反馈" value={this.state.text} onChange={this.handleTextChange}></textarea>
                <p>{this.state.realErrMsg}</p>
                <ButtonNormal className="ButtonNormal submit" text={this.state.isSubmitting?'提交中……':'提交反馈'} svg={paperplane} onClick={this.handleRealSubmitClick}/>
              </div>
          }
        </Modal>

      </div>
    );
  }

});

Feedback.propTypes = {
};

Feedback.defaultProps = {
};

export default Feedback;
