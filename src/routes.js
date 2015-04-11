'use strict';
/*
  使用react-router定义路径
  (react-router以后的api可能会大变
 */

import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import SellPage from './components/SellPage';
import ShoppingPage from './components/ShoppingPage';
import DashboardPage from './components/DashboardPage';

export default (
  <Route name="app" path='/' handler={App}>
    <Route name='shop' handler={ShoppingPage} />
    <Route name='sell' handler={SellPage} />
    <Route name='my' handler={DashboardPage} path="my/:section"/>
    <Route name='test' handler={HomePage} />
    <DefaultRoute name="home" handler={HomePage}/>
  </Route>
);
//{HomePage}
