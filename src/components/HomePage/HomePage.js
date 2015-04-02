'use strict';

import React from 'react';
import Banner from '../Banner';
import InputLarge from '../InputLarge';
import ButtonNormal from '../ButtonNormal';
import WordsFlasher from '../WordsFlasher';

require('./HomePage.scss');

const HomePage = React.createClass({
  render() {
    return (
      <div className="FirstSection">
        <div className="inner">
          <p className="subtle">最便捷二手物品交易平台</p>
          <p className="main">轻松购买闲置的<WordsFlasher/></p>
          <InputLarge placeholder="键入你想买或想卖的物品" btnText="搜索"/>
          <ButtonNormal text="我们如何运作"/>
        </div>
      </div>
    );
  }
});
export default HomePage;
