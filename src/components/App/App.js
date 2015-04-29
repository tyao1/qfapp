'use strict';

import React from 'react';
import Banner from '../Banner';
import Notification from '../Notification';
import {RouteHandler} from 'react-router';

const App = React.createClass({
  render() {
    return (
      <div className="wrapper">
        <RouteHandler/>
      </div>
    );
  }
});
export default App;
//        <Banner/>
//        <Notification/>
