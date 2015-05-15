'use strict';

import React from 'react';
import {Link} from 'react-router';
import InputNormal from '../InputNormal';
import AppStore from '../../stores/AppStore';
import UserStore from '../../stores/UserStore';
import CartStore from '../../stores/CartStore';
import PageStore from '../../stores/PageStore';
import UserActions from '../../actions/UserActions';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import cn from 'classnames';

import {coffecup, logo, shoppingcart, close, search} from '../SVGs';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import RegForm from '../RegForm';
import Cart from '../Cart';

import PageActions from '../../actions/PageActions';

require('./Banner.scss');

function getIsHome(){
  return {isHome: AppStore.getIsHome()};
}

const Banner = React.createClass({
  //不用担心不必要的rerender辣
  mixins: [PureRenderMixin],

  _onAppChange(){
    let tmp = getIsHome();
    this.setState(tmp);
    if(tmp.isHome) {
      this._onScroll();
    }
  },
  _onUserChange(){
    this.setState({
      userData: UserStore.getUserData()
    });
  },

  _onCartChange(){
    const itemsCount = CartStore.getItemsCount();
    const isChanged = itemsCount!==this.state.itemsCount;
    if(isChanged){
      setTimeout(()=>this.setState({isChanged: false}), 300);
    }
    this.setState({
      itemsCount,
      isChanged
    });
  },

  _onPageChange(){
    this.setState({
      searchText: PageStore.getKeyWord()
    })
  },

  yOffset:0,
  _onScroll(){
    const yOff = window.pageYOffset;
    this.setState({
      isScrolled: yOff > 574-84,
      miniBanner: yOff >= this.yOffset
      });
    this.yOffset = yOff;
  },
  getInitialState(){
    return {
      isHome: AppStore.getIsHome(),
      userData: UserStore.getUserData(),
      itemsCount: CartStore.getItemsCount(),
      cartOpen: false,
      searchText: ''
    };
  },


  componentWillMount() {
    window.addEventListener('scroll', this._onScroll);
    AppStore.addChangeListener(this._onAppChange);
    UserStore.addChangeListener(this._onUserChange);
    CartStore.addChangeListener(this._onCartChange);
    PageStore.addChangeListener(this._onPageChange);
  },
  componentWillUnmount(){
    AppStore.removeChangeListener(this._onAppChange);
    UserStore.removeChangeListener(this._onUserChange);
    CartStore.removeChangeListener(this._onCartChange);
    PageStore.removeChangeListener(this._onPageChange);
    if(this.keyListener){
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  },


  keyListener: false,
  componentDidUpdate(){
    if(this.state.cartOpen){
      if(!this.keyListener) {
        this.keyListener = true;
        window.addEventListener('keydown', this.handleKeyPress);
      }
    }
    else if(this.keyListener){
      this.keyListener = false;
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  },

  handleKeyPress(event){
    if(event.keyCode===27){
      this.setState({cartOpen: false});
    }
  },

  handleLoginClick(){
    this.setState({modalLoginIsOpen: true});
  },
  handleLoginClose(){
    this.setState({modalLoginIsOpen: false});
  },
  handleRegClick(){
    this.setState({modalRegIsOpen: true});
  },
  handleRegClose(){
    this.setState({modalRegIsOpen: false});
  },
  handleShoppingCartClick(){
    this.setState({cartOpen: !this.state.cartOpen});
  },
  handleShoppingCartClose(){
    this.setState({cartOpen: false});
  },
  handleLogout(){
    UserActions.logout();
  },
  handleSearchChange(e){
    this.setState({searchText: e.target.value});
  },
  handleSearchKey(e){
    if(e.keyCode===13){
      let text = this.state.searchText.substr(0,20);
      PageActions.setNewKeyword(text);
    }
    else if(e.keyCode===27){
      PageActions.setNewKeyword('');
    }
  },
  handleSearchBlur(e){
    let text = this.state.searchText.substr(0,20);
    PageActions.setNewKeyword(text);
  },
  render() {
    let isHome = this.state.isHome;
    let classes;
    if(isHome) {
      classes = cn('banner', {isHome}, {notScrolled: !this.state.isScrolled}, {miniBanner: this.state.miniBanner});
    }
    else{
      classes = cn('banner', {miniBanner: this.state.miniBanner});
    }

    let controls;

    if(this.state.userData){
      let avatar = this.state.userData.path.replace('Uploads/','Uploads/Thumb/');
      controls = <ul>
        <li><Link to="shop" data-text="浏览物品"><span>浏览物品</span></Link></li>
        <li><Link to="sell" data-text="出售物品"><span>出售物品</span></Link></li>
        <li><Link to="my" data-text="我的订单" params={{section: 'buy'}}><span>我的订单</span></Link></li>
        <li className="user">
          <Link to="my" params={{section: 'info'}}><img key={avatar} src={avatar}/></Link>
          <ul className="controls">
            <li><Link to="my" data-text="我的售卖" params={{section: 'sell'}}><span>我的售卖</span></Link></li>
            <li onClick={this.handleLogout}>登出</li>
          </ul>
        </li>
      </ul>;

    }
    else
    {
      controls = <ul>
        <li><Link to="shop" data-text="浏览物品"><span>浏览物品</span></Link></li>
        <li><a data-text="登录" onClick={this.handleLoginClick}><span>登录</span></a></li>
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
            <Link to="home">{logo}</Link>
            <InputNormal type="text" autocomplete="off" placeholder="找找看闲置的物品" svg={coffecup} value={this.state.searchText} onChange={this.handleSearchChange} onKeyUp={this.handleSearchKey} onBlur={this.handleSearchBlur}>
              <div className="searchButton" onClick={this.handleSearchBlur}>{search}</div>
            </InputNormal>
          </div>
          <div className="right">
            {controls}
            <button className={`shoppingCart${this.state.cartOpen?' active':''}${this.state.isChanged?' changed':''}`} onClick={this.handleShoppingCartClick}>
              <div className="svgWrapper">{shoppingcart}</div><span>{this.state.itemsCount}</span>
                <div className="close">{close}</div>
            </button>
          </div>

        </div>
        <div className={`cartWrapper${this.state.cartOpen?' active':''}`}>
          <Cart onCartClose={this.handleShoppingCartClose}/>
        </div>
      </div>
    );
  }

});

export default Banner;
