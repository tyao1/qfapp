'use strict';

import React from 'react';
import Banner from '../Banner';
//For test
import ItemRegisterForm from '../ItemRegisterForm';


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

var Counter = React.createClass({
  render: function(){
    // CSS 该怎么找啊啊~~~
    return (
      <div>
        <form>
          <input className="btn-plus" type="button" value="-"></input>
          <input className="input-number" type="number" value={this.props.initValue}></input>
          <input className="btn-minus" type="button" value="+"></input>
        </form>
      </div>
    );
  }
});

var CartListItem = React.createClass({
  render: function(){
    // 价格部分的逻辑还要改啊啊啊！
    return (
      <li>
        <div className={"cart-list-item-container " + (this.props.lastChild ? "lastItem" : "")}>
          <img src={require(this.props.image)} />
          <span className="cart-list-item-simple-info">
            <h3>{this.props.itemtype}</h3>
            <p>{this.props.itemname}</p>
          </span>

          <span className="cart-list-item-simple-info">
            <h3>数量</h3>
            <Counter initValue={1} />
          </span>

          <span className="cart-list-item-simple-info">
            <h3>卖家</h3>
            <p>{this.props.sellername}</p>
          </span>

          <span className="cart-list-item-simple-info">
            <h3>价格</h3>
            <p className="item-price-text">
            {"￥ " + (this.props.price | 0).toString() + '.00'}
            </p>
          </span>

          <span className="cart-list-item-others">
            <div className="delete-item">
              <a>删除</a>
            </div>
          </span>
        </div>
      </li>
    );
  }
});

var CartListComponent = React.createClass({
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
        <GreenNav />
        <CartListComponent />
        <ItemRegisterForm />
        <p>this is shopping!!!!!!!!</p>
      </div>
    );
  }
});

export default ShoppingPage;
