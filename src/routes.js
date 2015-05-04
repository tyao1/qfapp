'use strict';
/*
  使用react-router定义路径
  (react-router以后的api可能会大变
 */

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
//import SellPage from './components/SellPage';
//import ShoppingPage from './components/ShoppingPage';
//import DashboardPage from './components/DashboardPage';
//import ItemDetailPage from './components/ItemDetailPage';

/*
const HomePageMixin = require("react-proxy!./components/HomePage").Mixin;
const HomePage = React.createClass({
  mixins: [HomePageMixin],
  renderUnavailable: function() {
    return <div className="proxyLoading">
      <div className="inner">
        <img src="facebook.svg"/>
      </div>
    </div>;
  }
});
*/
const ShoppingPageMixin = require("react-proxy!./components/ShoppingPage").Mixin;
const ShoppingPage = React.createClass({
  mixins: [ShoppingPageMixin],
  renderUnavailable: function() {
    return <div className="proxyLoading">
      <div className="inner">
        <img src="facebook.svg"/>
      </div>
    </div>;
  }
});
const SellPageMixin = require("react-proxy!./components/SellPage").Mixin;
const SellPage = React.createClass({
  mixins: [SellPageMixin],
  renderUnavailable: function() {
    return <div className="proxyLoading">
      <div className="inner">
        <img src="facebook.svg"/>
      </div>
    </div>;
  }
});
const ItemDetailPageMixin = require("react-proxy!./components/ItemDetailPage").Mixin;
const ItemDetailPage = React.createClass({
  mixins: [ItemDetailPageMixin],
  renderUnavailable: function() {
    return <div className="proxyLoading">
      <div className="inner">
        <img src="facebook.svg"/>
      </div>
    </div>;
  }
});
const DashboardPageMixin = require("react-proxy!./components/DashboardPage").Mixin;
const DashboardPage = React.createClass({
  mixins: [DashboardPageMixin],
  renderUnavailable: function() {
    return <div className="proxyLoading">
      <div className="inner">
        <img src="facebook.svg"/>
      </div>
    </div>;
  }
});

export default (
  <Route name="app" path='/' handler={App}>
    <Route name='shop' handler={ShoppingPage} path="shop" />
    <Route name='sell' handler={SellPage}/>
    <Route name='my' handler={DashboardPage} path="my/:section"/>
    <Route name='detail' handler={ItemDetailPage} path="detail/:id"/>
    <DefaultRoute name="home" handler={HomePage}/>
    <NotFoundRoute handler={HomePage}/>
  </Route>
);
//{HomePage}
