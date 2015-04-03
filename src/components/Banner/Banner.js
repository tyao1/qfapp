'use strict';

import React from 'react';
import invariant from 'react/lib/invariant';
import {RouteHandler, Link} from 'react-router';
import InputNormal from '../InputNormal';


require('./Banner.scss');

const Banner = React.createClass({

  componentDidMount() {

  },

  componentWillUnmount() {

  },


  render() {
    return (
      <div className="banner">
        <div className="inner">
          <div className="left">
            <Link to="home"><img className="logo" src={require('./logo.png')}/></Link>
            <InputNormal placeholder="输入你想要买或者卖的内容"/>
          </div>
          <div className="right">
              <ul>
                <li><Link to="shop" data-name="浏览物品"><span>浏览物品</span></Link></li>
                <li><Link to="sell" data-name="出售物品"><span>出售物品</span></Link></li>
                <li><Link to="orders" data-name="我的订单"><span>我的订单</span></Link></li>
              </ul>
          </div>
        </div>
      </div>
    );
  }

});

export default Banner;
