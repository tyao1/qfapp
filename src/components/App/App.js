'use strict';

import React from 'react';
import invariant from 'react/lib/invariant';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Navbar from '../Navbar';
import ContentPage from '../ContentPage';
import NotFoundPage from '../NotFoundPage';
import InputNormal from '../InputNormal';
import Banner from '../Banner';
import {RouteHandler} from 'react-router';
require('./App.scss');

export default class App extends React.Component {

  componentDidMount() {

  }

  componentWillUnmount() {

  }



  render() {
    return (
      <div className="wrapper">
        <Banner/>
        <RouteHandler/>

      </div>
    );
  }

}
