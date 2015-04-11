'use strict';

import React from 'react';
import Banner from '../Banner';
import InputLarge from '../InputLarge';
import ButtonNormal from '../ButtonNormal';
import WordsFlasher from '../WordsFlasher';
import RegForm from '../RegForm';
import Modal from '../Modal';
import AppStore from '../../stores/AppStore.js';
import AppActions from '../../actions/AppActions.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';


import {coffecup, shoppingbag, truck} from '../SVGs';


require('./HomePage.scss');



const HomePage = React.createClass({
  mixins:[PureRenderMixin],
  getInitialState(){
    return {
      openedHow:false,
      textHow:'我们如何运作',
      isGoShopping:false
    }
  },
  /*
  componentWillMount() {
    AppActions.loadHome();
  },
  componentWillUnmount(){
    AppActions.leaveHome();
  },
  */
  handleHowClick(){
    if(this.state.openedHow) {
      this.setState({
        openedHow: false,
        textHow:'我们如何运作'
      });
    }
    else{
      this.setState({
        openedHow: true,
        textHow:'回到搜索'
      });
    }
  },
  handleGoShoppingClick(){
    this.setState({isGoShopping:true});
  },
  handleGoShoppingClose(){
    this.setState({isGoShopping:false});
  },
  render() {
    return (
      <div>
        <section className="FirstSection">
          <div className="inner">
            <h3 className="subtle">最便捷二手物品交易平台</h3>
            <h1 className="main">轻松购买闲置的<WordsFlasher/></h1>
            <InputLarge placeholder="键入你想买或想卖的物品" btnText="搜索" svg={coffecup}/>
            <div className={`how${this.state.openedHow?' active':''}`}>
              <ul className="inner">
                <li>
                  <h2>收</h2>
                  <p>您在清风发布闲置物品，我们派专人上门收取物件</p>
                </li>
                <li>
                  <h2>存</h2>
                  <p>我们将您的物件拍照，小心存放在我们的仓库中</p>
                </li>
                <li>
                  <h2>售</h2>
                  <p>在我们的网站上购买您喜欢的闲置物品，我们将由专人配送；而卖家在物品售出后，将会获得自己的收入</p>
                </li>
              </ul>
            </div>
            <ButtonNormal text={this.state.textHow} onClick={this.handleHowClick}/>

          </div>
        </section>
        <section className="SecondSection">
          <header>
            {shoppingbag}
            <h2>每日新品</h2>
            <p>想淘最新最好的便宜货，就在这里</p>
          </header>
          <main>
           ［TODO］<br/>
            小不正在赶工！<br/>
            欢迎来出售你的物品
          </main>
          <ButtonNormal text="前去淘货" onClick={this.handleGoShoppingClick}/>
          <Modal isOpen={this.state.isGoShopping} onClose={this.handleGoShoppingClose}>
            <h2>我们正在努力收集大家的物件中，购物功能将在未来推出~</h2>
          </Modal>
        </section>
        <section className="ThirdSection">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M-5 100q5-80 10 0zm5 0q5-100 10 0m-5 0q5-70 10 0m-5 0q5-90 10 0m-5 0q5-70 10 0m-5 0q5-110 10 0m-5 0q5-90 10 0m-5 0q5-70 10 0m-5 0q5-90 10 0m-5 0q5-50 10 0m-5 0q5-80 10 0m-5 0q5-60 10 0m-5 0q5-40 10 0m-5 0q5-50 10 0m-5 0q5-80 10 0m-5 0q5-55 10 0m-5 0q5-70 10 0m-5 0q5-80 10 0m-5 0q5-50 10 0m-5 0q5-75 10 0m-5 0q5-85 10 0z"/></svg>
          <div className="inner">
            {truck}
            <div className="left">
              <h3 className="minor">拥有闲置物品？</h3>
              <h2 className="huge">在清风上出售<br/>享受前所未有的便利</h2>
              <p className="more">只需轻敲键盘，我们的工作人员就会上门收件，替您完成闲置物品的保管和运送，一旦交易成功，我们就会将收入支付给您。</p>
            </div>
            <div className="right">
              <RegForm/>
            </div>
          </div>
        </section>
      </div>
    );
  }
});
export default HomePage;
