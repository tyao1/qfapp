'use strict';

import React from 'react';
import invariant from 'react/lib/invariant';
import {RouteHandler, Link} from 'react-router';
import InputNormal from '../InputNormal';
import AppStore from '../../stores/AppStore';
import UserStore from '../../stores/UserStore';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import cn from 'classnames';

import {coffecup} from '../SVGs';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import RegForm from '../RegForm';

require('./Banner.scss');

function getIsHome(){
  return {isHome: AppStore.getIsHome()};
}
function getInitialData(){
  return {
    isHome: AppStore.getIsHome(),
    userData: UserStore.getUserData()
  };
}
function getScrollState(){
  return {
    isScrolled: window.pageYOffset>574-84
  };
}
const Banner = React.createClass({
  //不用担心不必要的rerender辣
  mixins: [PureRenderMixin],

  _onAppChange(){
    let tmp = getIsHome();
    this.setState(tmp);
    if(tmp.isHome) {
      window.addEventListener('scroll', this._onScroll);
    }
    else{
      window.removeEventListener('scroll', this._onScroll);
    }
  },
  _onUserChange(){
    this.setState({
      userData: UserStore.getUserData()
    });
  },
  _onScroll(){
    this.setState(getScrollState());
  },
  getInitialState(){
    return getInitialData();
  },
  componentWillMount() {
    AppStore.addChangeListener(this._onAppChange);
    UserStore.addChangeListener(this._onUserChange);
  },
  componentWillUnmount(){
    AppStore.removeChangeListener(this._onAppChange);
    UserStore.removeChangeListener(this._onUserChange);
  },

  handleLoginClick(){
    this.setState({modalLoginIsOpen:true});
  },
  handleLoginClose(){
    this.setState({modalLoginIsOpen:false});
  },
  handleRegClick(){
    this.setState({modalRegIsOpen:true});
  },
  handleRegClose(){
    this.setState({modalRegIsOpen:false});
  },
  render() {
    let isHome = this.state.isHome;
    let classes;
    if(isHome) {
      classes = cn('banner', {isHome}, {notScrolled: !this.state.isScrolled});
    }
    else{
      classes = 'banner';
    }

    let controls;
    if(this.state.userData){
      controls = <ul>
        <li><Link to="shop" data-text="浏览物品"><span>浏览物品</span></Link></li>
        <li><Link to="sell" data-text="出售物品"><span>出售物品</span></Link></li>
        <li><Link to="orders" data-text="我的订单"><span>我的订单</span></Link></li>
      </ul>;
    }
    else
    {
      controls = <ul>
        <li><Link to="shop" data-text="浏览物品"><span>浏览物品</span></Link></li>
        <li><a data-text="登入" onClick={this.handleLoginClick}><span>登入</span></a></li>
        <li className="special"><a data-text="注册清风" onClick={this.handleRegClick}><span>注册清风</span></a></li>
        <Modal isOpen = {this.state.modalLoginIsOpen} onClose = {this.handleLoginClose}>
          <LoginForm/>
        </Modal>
        <Modal isOpen = {this.state.modalRegIsOpen} onClose = {this.handleRegClose}>
          <RegForm/>
        </Modal>
      </ul>;
    }

    return (
      <div className={classes}>
        <div className="inner">
          <div className="left">
            <Link to="home"><img className="logo" src={require('./logo.png')}/></Link>
            <InputNormal placeholder="输入你想要买或者卖的内容" svg={coffecup}/>
          </div>
          <div className="right">
            {controls}
          </div>
        </div>

      </div>
    );
  }

});

export default Banner;
