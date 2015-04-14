'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputNormal from '../InputNormal';
import ButtonNormal from '../ButtonNormal';
import {user, passkey, email} from '../SVGs';
import UserAction from '../../actions/UserAction.js';
import UserStore from '../../stores/UserStore.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

//require('./LoginForm.scss');


const LoginForm = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState(){

    return {
      username: '',
      password: '',
      email: '',
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),
      isLogining: UserStore.getIsLogining(),

    };
  },
  _onUserChange(){
    this.setState({
      msg: UserStore.getLoginMsg(),
      userData: UserStore.getUserData(),

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
  handleChange3(event) {
    this.setState({email: event.target.value});
  },
  handleClick(){
    //fire User action
    if(!this.state.isLogining) {
      let {password, username, email} = this.state;
      UserAction.login({password, username, email});
      console.log('login');
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
        <InputNormal type="text" placeholder="用户名" svg={user} value={this.state.username} onChange={this.handleChange1}/>
        <InputNormal type="password" placeholder="密码" svg={passkey} value={this.state.password} onChange={this.handleChange2}/>
        {this.state.needVerify?
          <InputNormal type="text" placeholder="验证码" svg={email} value={this.state.verify}
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
