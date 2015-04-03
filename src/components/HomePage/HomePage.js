'use strict';

import React from 'react';
import Banner from '../Banner';
import InputLarge from '../InputLarge';
import ButtonNormal from '../ButtonNormal';
import WordsFlasher from '../WordsFlasher';

import AppStore from '../../stores/AppStore.js';
import AppActions from '../../actions/AppActions.js';

import {coffecup, shoppingbag} from '../SVGs';


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

        </section>
      </div>
    );
  }
});
export default HomePage;
