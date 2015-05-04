'use strict';

import React from 'react';
import Banner from '../Banner';
import Notification from '../Notification';
import {RouteHandler} from 'react-router';
import Feedback from '../Feedback';

//保证某些stores已经在页面中
import DetailStore from '../../stores/DetailStore';

const App = React.createClass({

  render() {
    return (
      <div className="wrapper">
        <Banner/>
        <RouteHandler/>
        <Notification/>
        <Feedback/>
      </div>
    );
  }
});
export default App;
