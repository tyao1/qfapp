'use strict';

import React from 'react';
import Banner from '../Banner';

require('./ShoppingPage.scss');

var cartItemNum = 0;

var CartIcon = React.createClass({
  render: function() {
    return (
      <div className="cart-page-cart-container">
        <a><img src={require('./iconfont-gouwuche.png')} className="cart-page-cart-icon"></img></a>
        <span className="cart-page-cart-num">{cartItemNum}</span>
      </div>
    );
  }
});

var GreenNav = React.createClass({
  render: function(){
    return (
      <div className="green-nav">
        <CartIcon />
      </div>
    );
  }
});

const ShoppingPage = React.createClass({
  render() {
    return (
      <div className="cart-page-main-container">
        <GreenNav />
        <p>this is shopping!!!!!!!!</p>
      </div>
    );
  }
});

export default ShoppingPage;
