'use strict';

import React from 'react';
import Banner from '../Banner';
import Notification from '../Notification';
import {RouteHandler} from 'react-router';

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
        <Notification/>
      </div>
    );
  }

}
