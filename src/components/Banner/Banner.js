'use strict';

import React from 'react';
import invariant from 'react/lib/invariant';
import {RouteHandler, Link} from 'react-router';

require('./Banner.scss');

const Banner =React.createClass({

  componentDidMount() {

  },

  componentWillUnmount() {

  },


  render() {
    return (
      <div className="banner">
        <div className="inner">
          <img className="logo"/>
          <div className="right">
              <ul>
                <li><Link to="shop">浏览物品</Link></li>
                <li><Link to="sell">出售物品</Link></li>
                <li><Link to="orders">我的订单</Link></li>
              </ul>
          </div>
        </div>
      </div>
    );
  }

});

export default Banner;
