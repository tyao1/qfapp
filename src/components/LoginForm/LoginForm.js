'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputNormal from '../InputNormal';
import ButtonNormal from '../ButtonNormal';
import {user,passkey,email} from '../SVGs';
import UserAction from '../../actions/UserAction.js';
import UserStore from '../../stores/UserStore.js';
//require('./LoginForm.scss');


const LoginForm = React.createClass({
  getInitialState(){

    return {
      username: '',
      password: '',
      email: '',
      msg:UserStore.getRegMsg(),
      userData:UserStore.getUserData(),
      isLogining:UserStore.getIsLogining()
    };
  },
  _onUserChange(){
    this.setState({
      msg:UserStore.getRegMsg(),
      userData:UserStore.getUserData()
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
    if(!this.state.isRegistering) {
      let {password, username, email} = this.state;
      UserAction.register({password, username, email});
    }
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
        <p>登入</p>
        <InputNormal type="text" placeholder="用户名" svg={user} value={this.state.username} onChange={this.handleChange1}/>
        <InputNormal type="password" placeholder="密码" svg={passkey} value={this.state.password} onChange={this.handleChange2}/>
        <ButtonNormal text={this.state.isLogining?'登入中……':'登入'} onClick={this.handleClick}/>
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
