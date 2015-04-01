'use strict';

import React from 'react';
import Banner from '../Banner';
import InputLarge from '../InputLarge';

require('./HomePage.scss');

const HomePage = React.createClass({
  render() {
    return (
      <div className="FirstSection">
        <div className="inner">
          <p className="subtle">最便捷二手物品交易平台</p>
          <p className="main">轻松购买闲置的电子用品</p>
          <InputLarge placeholder="键入你想买或想卖的物品"/>
        </div>
      </div>
    );
  }
});
export default HomePage;
