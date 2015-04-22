'use strict';

import React from 'react';
import Banner from '../Banner';

import Counter from '../Counter';
import CartListItem from '../CartListItem';

import Cart from '../Cart';

require('./ShoppingPage.scss');

var cartItemNum = 0;

var CartIcon = React.createClass({
  render: function() {
    return (
      <div className="cart-page-cart-container">
        <a><img src={require('./iconfont-gouwuche.png')} className="cart-page-cart-icon"></img></a>
        <span className="cart-page-cart-num">{cartItemNum.toString()}</span>
      </div>
    );
  }
});

var GreenNav = React.createClass({
  render: function(){
    return (
      <div className="green-nav">
        <span className="gouwuche-title">购物车</span>
        <CartIcon />
      </div>
    );
  }
});


var CartListComponent = React.createClass({
  getInitialState: function() {
    return {
      itemList: [],
      totalPrice: 0
    };
  },

render: function(){
  return (
    <div className="cart-list-main-container">
      <ul>
        <CartListItem image="./test-book.png" itemname="论演员的自我修养啊自我修养啊自我修养啊"
          itemtype="书籍" sellername="没名字能用了啊啊啊啊" price={24} lastChild={false}/>
        <CartListItem image="./test-book.png" itemname="论演员的自我修养自我修养"
          itemtype="书籍" sellername="没名字能用了啊啊啊啊" price={36} lastChild={true}/>
      </ul>
    </div>
  );
}
});

const ShoppingPage = React.createClass({
  render() {
    return (
      <div className="cart-page-main-container">
        <Cart/>

      </div>
    );
  }
});

export default ShoppingPage;
