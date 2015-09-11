'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputEffect from '../InputEffect';
import ButtonNormal from '../ButtonNormal';
import {user, passkey, email} from '../SVGs';
import UserAction from '../../actions/UserActions.js';
import UserStore from '../../stores/UserStore.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import FormValidation from '../../mixins/FormValidation';
import {Link} from 'react-router';
import router from '../../router';
import Lang from '../../utils/zh-CN';

require('./RegForm.scss');


const RegForm = React.createClass({
  mixins: [PureRenderMixin, FormValidation],
  getInitialState(){
    return {
      nickname: '',
      password: '',
      email: '',
      verifyCode: '',
      //msg: UserStore.getRegMsg(),
      userData: UserStore.getUserData(),
      isRegistering: UserStore.getIsRegistering(),
      needVerify: UserStore.getRegVerify()
    };
  },
  _onUserChange(){
    console.log('user change in reg');
    this.setState({
      msg: UserStore.getRegMsg(),
      userData: UserStore.getUserData(),
      needVerify: UserStore.getRegVerify(),
      needActivation: UserStore.getNeedActivation(),
      isRegistering: UserStore.getIsRegistering()

    });
  },
  componentWillMount() {
    UserStore.addChangeListener(this._onUserChange);
  },
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);
  },
  handleChange1(event) {
    //昵称
    this.setState({nickname: event.target.value});
  },
  handleBlur1() {
    //昵称检验
    let res = RegForm.isValidUserName(this.state.nickname);
    let status;
    if(res){
      status = {
        isValid1: true,
        msg: ''
      };
    }
    else{
      status = {
        isValid1: false,
        msg: Lang.NICKNAME_ERROR
      };
    }

    this.setState(status);
  }
  ,
  handleChange2(event) {
    this.setState({password: event.target.value});
  },
  handleBlur2() {
    //密码检验
    let res = RegForm.isValidPassword(this.state.password);
    let status;
    if(res){
      status = {
        isValid2: true,
        msg: ''
      };
    }
    else{
      status = {
        isValid2: false,
        msg: Lang.PASSWORD_ERROR
      };
    }
    this.setState(status);
  },
  handleChange3(event) {
    this.setState({email: event.target.value});
  },
  handleBlur3() {
    //邮箱检验
    let res = RegForm.isValidEmail(this.state.email);
    let status;
    if(res){
      status = {
        isValid3: true,
        msg: ''
      };
    }
    else{
      status = {
        isValid3: false,
        msg: Lang.EMAIL_ERROR
      };
    }
    this.setState(status);
  },
  handleChange4(event) {
    this.setState({verifyCode: event.target.value});
  },
  handleBlur4() {
    //验证码检验
    let res = RegForm.isValidVerify(this.state.verifyCode);
    let status;
    if(res){
      status = {
        isValid4: true,
        msg: ''
      };
    }
    else{
      status = {
        isValid4: false,
        msg: Lang.VERIFY_ERROR
      };
    }
    this.setState(status);
  },
  checkAndClearMsg(){
    if(this.state.isValid1&&this.state.isValid2&&this.state.isValid3&&this.state.isValid4){
      this.setState({msg: null});
    }
  },
  handleClick(){
    //fire User action
    if(!this.state.isRegistering) {
      //check valid
      let status = {};
      let msg = '';
      if(RegForm.isValidUserName(this.state.nickname)){
        status.isValid1 = true;
      }
      else {
        status.isValid1 = false;
        msg = Lang.NICKNAME_ERROR;
      }
      if(RegForm.isValidPassword(this.state.password)){
        status.isValid2 = true;
      }
      else {
        status.isValid2 = false;
        msg = Lang.PASSWORD_ERROR;
      }
      if(RegForm.isValidEmail(this.state.email)){
        status.isValid3 = true;
      }
      else {
        status.isValid3 = false;
        msg = Lang.EMAIL_ERROR;
      }
      /*
      if(RegForm.isValidVerify(this.state.verifyCode)){
        status.isValid4 = true;
      }
      else {
        status.isValid4 = false;
        msg = '验证码格式不正确';
      }
      */
      status.msg = msg;
      if(status.isValid1&&status.isValid2&&status.isValid3) { //&&status.isValid4
        let {password, nickname, email, verifyCode} = this.state;
        UserAction.register({password, nickname, email, verifyCode});
      }
      else{
        this.setState(status);
        /*
        let obj = {};
        for(let i = 1; i<5; i++){
          if(this.state['isValid'+i]!==true){
            obj['isValid'+i] = false;
          }
        }
        this.setState(obj);
        */
      }
    }
  },
  handleVerifyImgClick(){
    UserAction.refreshRegVerify();
  },
  handleSellClick(){
    router.transitionTo('sell');
  },
  handleEnterClick(e){
    if(e.keyCode===13){
      this.handleClick();
    }
  },
  render(){
    let regForm;
    if(this.state.userData){
      regForm = <div className="regForm">
        <div className="center">
          <Link to="my" params={{section: 'info'}}><img src={this.state.userData.path.replace('Uploads/','Uploads/Thumb/')} /></Link>
          <p>欢迎回来,{this.state.userData.nickname}</p>
          <ButtonNormal text={'出售物品'} onClick={this.handleSellClick}/>
        </div>
      </div>;
    }
    else if(this.state.needActivation) {
      regForm = <div className="regForm">
        <div className="center">
          <p>注册成功,请先前往邮箱激活！</p>
        </div>
      </div>;
    }
    else{
      regForm = <div className="regForm">
        <span>{this.state.msg}</span>
        <h3>快速注册</h3>

        <InputEffect type="email" className={this.state.isValid3===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 输入常用邮箱" label="邮箱" svg={email} value={this.state.email} onChange={this.handleChange3} onBlur={this.handleBlur3} onKeyUp={this.handleEnterClick}/>
        <InputEffect type="password" className={this.state.isValid2===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 仅含字母数字@，6-16位" label="密码" svg={passkey} value={this.state.password} onChange={this.handleChange2} onBlur={this.handleBlur2} onKeyUp={this.handleEnterClick}/>
        <InputEffect type="text" className={this.state.isValid1===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 小于16位" label="昵称" svg={user} value={this.state.nickname} onChange={this.handleChange1} onBlur={this.handleBlur1} onKeyUp={this.handleEnterClick}/>

        <ButtonNormal text={this.state.isRegistering?'注册中……':'注册'} onClick={this.handleClick}/>

      </div>;
    }
    return (
      <div className="container">
        {regForm}
      </div>
    );
  }
});
/*
 <InputEffect type="text" className={this.state.isValid4===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 4位" label="验证码"  svg={email} value={this.state.verifyCode} onChange={this.handleChange4} onBlur={this.handleBlur4} onKeyUp={this.handleEnterClick}>
 <img className="verify" src={API + '/Home/Verify.png?time='+this.state.needVerify} onClick={this.handleVerifyImgClick}/>
 </InputEffect>
 */
RegForm.defaultProps = {

};

export default RegForm;
