'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import InputNormal from '../InputNormal';
import ButtonNormal from '../ButtonNormal';
import {user,passkey,email} from '../SVGs';
import UserAction from '../../actions/UserAction.js';
import UserStore from '../../stores/UserStore.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import {Link} from 'react-router';
import router from '../../router';

require('./RegForm.scss');


const RegForm = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState(){

    return {
      nickname: '',
      password: '',
      email: '',
      verifyCode:'',
      msg:UserStore.getRegMsg(),
      userData:UserStore.getUserData(),
      isRegistering:UserStore.getIsRegistering(),
      regVerify:UserStore.getRegVerify()
    };
  },
  _onUserChange(){
    this.setState({
      msg:UserStore.getRegMsg(),
      userData:UserStore.getUserData(),
      regVerify:UserStore.getRegVerify(),
      needActivation : UserStore.getNeedActivation()
    });
  },
  componentWillMount() {
    UserStore.addChangeListener(this._onUserChange);
  },
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);
  },
  handleChange1(event) {
    this.setState({nickname: event.target.value});
  },
  handleChange2(event) {
    this.setState({password: event.target.value});
  },
  handleChange3(event) {
    this.setState({email: event.target.value});
  },
  handleChange4(event) {
    this.setState({verifyCode: event.target.value});
  },
  handleClick(){
    //fire User action
    if(!this.state.isRegistering) {
      let {password, nickname, email, verifyCode} = this.state;
      UserAction.register({password, nickname, email, verifyCode});
    }
  },
  handleVerifyImgClick(){
  
  },
  handleSellClick(){
    router.transitionTo('sell');
  },
  render(){
    let regForm;
    if(this.state.userData){
      regForm= <div className="regForm">
        <div className="center">
          <Link to="my"  params={{section: 'info'}}><img src={this.state.userData.avartar} /></Link>
          <p>欢迎回来,{this.state.userData.name}</p>
          <ButtonNormal text={'出售物品'} onClick={this.handleSellClick}/>
        </div>
      </div>;
    }
    else if(this.state.needActivation) {
      regForm =<div className="regForm">
        <div className="center">
          <p>注册成功,请先前往邮箱激活！</p>
        </div>
      </div>
    }
    else{
      regForm = <div className="regForm">
        <span>{this.state.msg}</span>
        <h3>快速注册</h3>
        <InputNormal type="text" placeholder="用户名" svg={user} value={this.state.nickname} onChange={this.handleChange1}/>
        <InputNormal type="password" placeholder="密码" svg={passkey} value={this.state.password} onChange={this.handleChange2}/>
        <InputNormal type="email" placeholder="邮箱" svg={email} value={this.state.email} onChange={this.handleChange3}/>
        <InputNormal type="text" placeholder="验证码" svg={email} value={this.state.verify} onChange={this.handleChange4}>
          <img className="verify" src={'http://10.60.136.39/qfplan/index.php/Home/Verify.png?type=1&time='+this.state.regVerify} onClick={this.handleVerifyImgClick}/>
        </InputNormal>
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

RegForm.defaultProps = {

};

export default RegForm;
