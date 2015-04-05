'use strict';

import React from 'react';
import Banner from '../Banner';
import InputLarge from '../InputLarge';
import ButtonNormal from '../ButtonNormal';
import WordsFlasher from '../WordsFlasher';
import RegForm from '../RegForm';

import AppStore from '../../stores/AppStore.js';
import AppActions from '../../actions/AppActions.js';

import {coffecup, shoppingbag, truck} from '../SVGs';


require('./HomePage.scss');



const HomePage = React.createClass({


  componentWillMount() {
    AppActions.loadHome();
  },
  componentWillUnmount(){
    AppActions.leaveHome();
  },

  render() {
    return (
      <div>
        <section className="FirstSection">
          <div className="inner">
            <p className="subtle">最便捷二手物品交易平台</p>
            <p className="main">轻松购买闲置的<WordsFlasher/></p>
            <InputLarge placeholder="键入你想买或想卖的物品" btnText="搜索" svg={coffecup}/>
            <ButtonNormal text="我们如何运作"/>
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
          <ButtonNormal text="前去淘货"/>

        </section>
        <section className="ThirdSection">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M-5 100q5-80 10 0zm5 0q5-100 10 0m-5 0q5-70 10 0m-5 0q5-90 10 0m-5 0q5-70 10 0m-5 0q5-110 10 0m-5 0q5-90 10 0m-5 0q5-70 10 0m-5 0q5-90 10 0m-5 0q5-50 10 0m-5 0q5-80 10 0m-5 0q5-60 10 0m-5 0q5-40 10 0m-5 0q5-50 10 0m-5 0q5-80 10 0m-5 0q5-55 10 0m-5 0q5-70 10 0m-5 0q5-80 10 0m-5 0q5-50 10 0m-5 0q5-75 10 0m-5 0q5-85 10 0z"/></svg>
          <div className="inner">
            {truck}
            <div className="left">
              <p className="minor">拥有闲置物品？</p>
              <p className="huge">在清风上出售<br/>享受前所未有的便利</p>
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
