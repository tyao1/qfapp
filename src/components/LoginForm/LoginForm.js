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

//require('./LoginForm.scss');


const LoginForm = React.createClass({
  mixins: [PureRenderMixin, FormValidation],

  getInitialState(){

    return {
      username: '',
      password: '',
      email: '',
      verifyCode: '',
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),
      isLogining: UserStore.getIsLogining(),
      forget: false,
      isForgetting: UserStore.getIsForgetting(),
      forgetMsg: UserStore.getForgetMsg()

    };
  },
  _onUserChange(){
    this.setState({
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),
      needVerify: UserStore.getLoginVerify(),
      isForgetting: UserStore.getIsForgetting(),
      forgetMsg: UserStore.getForgetMsg()
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
        msg: '密码需要在6-16位之间，且仅含英文字母、数字、@'
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
        msg: '邮箱格式不正确',
        forgetMsg: '邮箱格式不正确'
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
        msg: '验证码格式不符合要求'
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
        msg = '密码需要在6-16位之间，且仅含英文字母、数字、@';
      }
      if(LoginForm.isValidEmail(this.state.email)){
        status.isValid3 = true;
      }
      else {
        status.isValid3 = false;
        msg = '邮箱格式不正确';
      }
      if(this.state.needVerify){
        if(LoginForm.isValidVerify(this.state.verifyCode)){
          status.isValid4 = true;
        }
        else{
          status.isValid4 = false;
          msg = '验证码格式不正确';
        }
      }
      status.msg = msg;
      console.log('status', status);
      if(status.isValid3&&status.isValid2&&(!this.state.needVerify||status.isValid3)) {
        let {password, email, verifyCode} = this.state;
        UserAction.login({password, email, verifyCode});
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
        status.forgetMsg = '邮箱格式不正确';
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
    this.setState({forget: !this.state.forget});
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
  render(){
    let regForm;
    if(this.state.userData){
      regForm = <div className="regForm">
        test
      </div>;
    }
    else{
      if(this.state.forget){
        regForm = <div className="regForm">
          <span>{this.state.forgetMsg}</span>
          <h3>找回密码</h3>
          <InputNormal type="email" className={this.state.isValid3===false?'invalid': null} placeholder="邮箱" svg={email} value={this.state.email} onChange={this.handleChange3} onBlur={this.handleBlur3} onKeyUp={this.handleEnterClickForget}/>
          <ButtonNormal text={this.state.isForgetting?'找回中……':'找回密码'} onClick={this.handleClickForget}/>
          <ButtonNormal className="ButtonNormal minor" text="返回登录" onClick={this.handleChangeType}/>

        </div>;
      }
      else {
        regForm = <div className="regForm">
          <span>{this.state.msg}</span>
          <h3>登录</h3>
          <InputNormal type="email" className={this.state.isValid3===false?'invalid': null} placeholder="邮箱" svg={email}
                       value={this.state.email} onChange={this.handleChange3} onBlur={this.handleBlur3} onKeyUp={this.handleEnterClick}/>
          <InputNormal type="password" className={this.state.isValid2===false?'invalid': null} placeholder="密码"
                       svg={passkey} value={this.state.password} onChange={this.handleChange2}
                       onBlur={this.handleBlur2} onKeyUp={this.handleEnterClick}/>
          {this.state.needVerify ?
            <InputNormal type="text" className={this.state.isValid4===false?'invalid': null} placeholder="验证码"
                         svg={email} value={this.state.verifyCode}
                         onChange={this.handleChange4} onKeyUp={this.handleEnterClick}>
              <img className="verify"
                   src={'http://10.60.136.39/index.php/Home/Verify.png?type=1&time='+this.state.needVerify}
                   onClick={this.handleVerifyImgClick}/>
            </InputNormal>
            :
            null
          }
          <ButtonNormal text={this.state.isLogining?'登录中……':'登录'} onClick={this.handleClick}/>
          <ButtonNormal className="ButtonNormal minor" text="忘记密码" onClick={this.handleChangeType}/>

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

LoginForm.defaultProps = {

};

export default LoginForm;
