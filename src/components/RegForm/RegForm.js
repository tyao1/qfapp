'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputNormal from '../InputNormal';
import ButtonNormal from '../ButtonNormal';
import {user,passkey,email} from '../SVGs';
import UserAction from '../../actions/UserAction.js';
import UserStore from '../../stores/UserStore.js';
require('./RegForm.scss');


const RegForm = React.createClass({
  getInitialState(){
    return {
      username:'',
      password: '',
      email:''
    };
  },
  _onUserChange(){
    this.setState({msg:UserStore.getRegMsg()});
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
    let {password, username, email} = this.state;
    UserAction.register({password, username, email});
  },
  render(){
    return (
      <div className="regForm">
        <span>{this.state.msg}</span>
        <p>快速注册</p>
        <InputNormal type="text" placeholder="用户名" svg={user} value={this.state.username} onChange={this.handleChange1}/>
        <InputNormal type="password" placeholder="密码" svg={passkey} value={this.state.password} onChange={this.handleChange2}/>
        <InputNormal type="email" placeholder="邮箱" svg={email} value={this.state.email} onChange={this.handleChange3}/>
        <ButtonNormal text="立即注册" onClick={this.handleClick}/>
      </div>
    );
  }
});

RegForm.defaultProps = {

};

export default RegForm;
