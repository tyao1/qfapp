'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputNormal from '../InputNormal';
import ButtonNormal from '../ButtonNormal';
import {user,passkey,email} from '../SVGs';


require('./RegForm.scss');



const RegForm = React.createClass({
  getInitialState(){
    return {curCount: 0};
  },
  componentDidMount(){

  },

  render(){
    return (
      <div className="regForm">
        <p>快速注册</p>
        <InputNormal type="text" placeholder="用户名" svg={user}/>
        <InputNormal type="password" placeholder="密码" svg={passkey}/>
        <InputNormal type="email" placeholder="邮箱" svg={email}/>
        <ButtonNormal text="立即注册"/>
      </div>
    );
  }
});

RegForm.defaultProps = {

};

export default RegForm;
