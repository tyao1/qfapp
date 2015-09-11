'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputNormal from '../InputNormal';
import ButtonNormal from '../ButtonNormal';
import {user, passkey, email} from '../SVGs';
import UserAction from '../../actions/UserActions.js';
import UserStore from '../../stores/UserStore.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import FormValidation from '../../mixins/FormValidation';
import InputEffect from '../InputEffect';
import AppActions from '../../actions/AppActions';
import Lang from '../../utils/zh-CN';

//require('./LoginForm.scss');


const LoginForm = React.createClass({
  mixins: [PureRenderMixin, FormValidation],

  getInitialState(){

    return {
      username: '',
      password: UserStore.getPassword(),
      email: UserStore.getEmail(),
      verifyCode: '',
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),
      isLogining: UserStore.getIsLogining(),
      forget: false,
      isForgetting: UserStore.getIsForgetting(),
      forgetMsg: UserStore.getForgetMsg(),
      findPassWordSuccess: UserStore.getFindPassWordSuccess()

    };
  },
  _onUserChange(){
    this.setState({
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),
      needVerify: UserStore.getLoginVerify(),
      isLogining: UserStore.getIsLogining(),
      isForgetting: UserStore.getIsForgetting(),
      forgetMsg: UserStore.getForgetMsg(),
      findPassWordSuccess: UserStore.getFindPassWordSuccess()
    });
  },
  componentWillMount() {
    UserStore.addChangeListener(this._onUserChange);
  },
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);
  },
  handleChange1(event) {
    this.setState({username: event.target.value});
  },
  handleChange2(event) {
    this.setState({password: event.target.value});
  },
  handleBlur2() {
    //密码检验

    let res = LoginForm.isValidPassword(this.state.password);
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
    console.log('check password', status);
    this.setState(status);
  },
  handleChange3(event) {
    this.setState({email: event.target.value});
  },
  handleBlur3(){
    //邮箱校验
    console.log('check email');
    let res = LoginForm.isValidEmail(this.state.email);
    let status;
    if(res){
      status = {
        isValid3: true,
        msg: '',
        forgetMsg: ''
      };
    }
    else{
      status = {
        isValid3: false,
        msg: Lang.EMAIL_ERROR,
        forgetMsg: Lang.EMAIL_ERROR
      };
    }

    this.setState(status);
  },
  handleChange4(event) {
    this.setState({verifyCode: event.target.value});
  },
  handleBlur4() {
    //验证码检验
    let res = LoginForm.isValidVerify(this.state.verifyCode);
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
  handleClick(){
    if(!this.state.isLogining) {
      //check valid
      let status = {};
      let msg = '';
      if(LoginForm.isValidPassword(this.state.password)){
        status.isValid2 = true;
      }
      else {
        status.isValid2 = false;
        msg = Lang.PASSWORD_ERROR;
      }
      if(LoginForm.isValidEmail(this.state.email)){
        status.isValid3 = true;
      }
      else {
        status.isValid3 = false;
        msg = Lang.EMAIL_ERROR;
      }
      /*
      if(this.state.needVerify){
        if(LoginForm.isValidVerify(this.state.verifyCode)){
          status.isValid4 = true;
        }
        else{
          status.isValid4 = false;
          msg = '验证码格式不正确';
        }
      }
      */
      status.msg = msg;
      if(status.isValid3&&status.isValid2) { //&&(!this.state.needVerify||status.isValid3)
        let {password, email, verifyCode} = this.state;
        UserAction.login({password, data: email, verifyCode});
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
  handleClickForget(){
    if(!this.state.isForgetting) {
      //check valid
      let status = {};
      let msg = '';
      if(LoginForm.isValidEmail(this.state.email)){
        status.isValid3 = true;
        status.forgetMsg ='';
      }
      else {
        status.isValid3 = false;
        status.forgetMsg = Lang.EMAIL_ERROR;
      }
      if(status.isValid3===true) {
        let {email} = this.state;
        UserAction.findPasswordSubmit({email});
      }
      else{
        this.setState(status);
      }
    }
  },
  handleVerifyImgClick(){
    UserAction.refreshLoginVerify();
  },
  handleChangeType(){
    this.setState({forget: !this.state.forget, findPassWordSuccess: false});
  },
  handleEnterClick(e){
    if(e.keyCode===13){
      this.handleClick();
    }
  },
  handleEnterClickForget(e){
    if(e.keyCode===13){
      this.handleClickForget();

    }
  },
  handleGoReg(){
    AppActions.toggleReg();
  },
  render(){
    let regForm;
    if(this.state.userData){
      regForm = <div className="regForm">
        test
      </div>;
    }
    else{
      if(this.state.forget){
       if(this.state.findPassWordSuccess) {
          regForm = <div className="regForm">
            <div className="center">
              <p>找回密码成功,请先前往邮箱查看修改密码链接！</p>
              <ButtonNormal className="ButtonNormal minor" text="返回登录" onClick={this.handleChangeType}/>
            </div>
          </div>;
        } else {
         regForm = <div className="regForm">
           <span>{this.state.forgetMsg}</span>
           <h3>找回密码</h3>
           <InputEffect type="email" className={this.state.isValid3===false?'invalid': null}
                        tmpPlaceHolder="╰(*°▽°*)╯ 输入注册的邮箱" label="邮箱" svg={email} value={this.state.email}
                        onChange={this.handleChange3} onBlur={this.handleBlur3} onKeyUp={this.handleEnterClickForget}/>
           <ButtonNormal text={this.state.isForgetting?'找回中……':'找回密码'} onClick={this.handleClickForget}/>
           <ButtonNormal className="ButtonNormal minor" text="返回登录" onClick={this.handleChangeType}/>
         </div>;
       }
      }
      else {
        regForm = <div className="regForm">
          <span>{this.state.msg}</span>
          <h3>登录</h3>
          <InputEffect type="email" className={this.state.isValid3===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 输入注册的邮箱" label="邮箱" svg={email}
                       value={this.state.email} onChange={this.handleChange3} onBlur={this.handleBlur3} onKeyUp={this.handleEnterClick}/>
          <InputEffect type="password" className={this.state.isValid2===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 仅含字母数字@，6-16位" label="密码"
                       svg={passkey} value={this.state.password} onChange={this.handleChange2}
                       onBlur={this.handleBlur2} onKeyUp={this.handleEnterClick}/>

          <ButtonNormal text={this.state.isLogining?'登录中……':'登录'} onClick={this.handleClick}/>
          <ButtonNormal className="ButtonNormal minor" text="忘记密码" onClick={this.handleChangeType}/>
          <ButtonNormal className="ButtonNormal minor" text="注册" onClick={this.handleGoReg}/>

        </div>;
      }
    }
    return (
      <div className="container">
        {regForm}
      </div>
    );
  }
});
/*

 {this.state.needVerify ?
 <InputEffect type="text" className={this.state.isValid4===false?'invalid': null} tmpPlaceHolder="╰(*°▽°*)╯ 4位" label="验证码"
 svg={email} value={this.state.verifyCode}
 onChange={this.handleChange4} onKeyUp={this.handleEnterClick}>
 <img className="verify"
 src={API + '/Home/Verify.png?type=1&time='+this.state.needVerify}
 onClick={this.handleVerifyImgClick}/>
 </InputEffect>
 :
 null
 }
 */
LoginForm.defaultProps = {

};

export default LoginForm;
