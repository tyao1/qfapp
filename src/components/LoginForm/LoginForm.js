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
      isLogining: UserStore.getIsLogining()

    };
  },
  _onUserChange(){
    this.setState({
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),
      needVerify : UserStore.getLoginVerify()
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
  handleBlur1(event) {
    //邮箱登陆
    let res = LoginForm.isValidEmail(this.state.username);
    let status;
    if(res){
      status = {
        isValid1: true,
        msg: ''
      }
    }
    else{
      status = {
        isValid1: false,
        msg: '用户名格式不符合要求'
      }
    }

    this.setState(status);
  },
  handleChange2(event) {
    this.setState({password: event.target.value});
  },
  handleBlur2(event) {
    //密码检验
    let res = LoginForm.isValidPassword(this.state.password);
    let status;
    if(res){
      status = {
        isValid2: true,
        msg: ''
      }
    }
    else{
      status = {
        isValid2: false,
        msg: '密码格式不符合要求'
      }
    }
    this.setState(status);
  },
  handleChange3(event) {
    this.setState({email: event.target.value});
  },
  handleBlur3(event){
    //用户名检验
    let res = LoginForm.isValidEmail(this.state.email);
    let status;
    if(res){
      status = {
        isValid3: true,
        msg: ''
      }
    }
    else{
      status = {
        isValid3: false,
        msg: '用户名格式不符合要求'
      }
    }

    this.setState(status);
  },
  handleChange4(event) {
    this.setState({verifyCode: event.target.value});
  },
  handleBlur4(event) {
    //验证码检验
    let res = LoginForm.isValidVerify(this.state.verifyCode);
    let status;
    if(res){
      status = {
        isValid4: true,
        msg: ''
      }
    }
    else{
      status = {
        isValid4: false,
        msg: '验证码格式不符合要求'
      }
    }
    this.setState(status);
  },
  handleClick(){
    //fire User action
    if(!this.state.isLogining) {
      if(true===this.state.isValid3===this.state.isValid2===true) {
        let {password, email, verifyCode} = this.state;
        UserAction.login({password, email, verifyCode});
      }
      else{
        let obj={};
        for(let i=1;i<5;i++){
          if(this.state['isValid'+i]!==true){
            obj['isValid'+i] = false;
          }
        }
        this.setState(obj);
      }
    }
  },
  handleVerifyImgClick(){
    UserAction.refreshLoginVerify();
  },
  render(){
    let regForm;
    if(this.state.userData){
      regForm= <div className="regForm">
        test
      </div>;
    }
    else{
      regForm = <div className="regForm">
        <span>{this.state.msg}</span>
        <h3>登录</h3>
        <InputNormal type="email" className={this.state.isValid3===false?'invalid': null} placeholder="邮箱" svg={email} value={this.state.email} onChange={this.handleChange3} onBlur={this.handleBlur3}/>
        <InputNormal type="password" className={this.state.isValid2===false?'invalid': null} placeholder="密码" svg={passkey} value={this.state.password} onChange={this.handleChange2} onBlur={this.handleBlur2}/>
        {this.state.needVerify?
          <InputNormal type="text" className={this.state.isValid4===false?'invalid': null} placeholder="验证码" svg={email} value={this.state.verifyCode}
                       onChange={this.handleChange4}>
            <img className="verify"
                 src={'http://10.60.136.39/qfplan/index.php/Home/Verify.png?type=1&time='+this.state.needVerify}
                 onClick={this.handleVerifyImgClick}/>
          </InputNormal>
          :
          null
        }
        <ButtonNormal text={this.state.isLogining?'登录中……':'登录'} onClick={this.handleClick}/>
      </div>;
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
