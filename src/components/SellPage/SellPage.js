'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';
require('./SellPage.scss');

const SellPage = React.createClass({
  _onUserChange(){

  },

  mixins:[PureRenderMixin],
  getInitialState(){
    return {

    }
  },
  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnMount(){
    UserStore.removeChangeListener(this._onUserChange);

  },
  render(){

    return (
      <div className="sellPage">
        <div className="inner">
          <div className="title">

          </div>
        </div>
      </div>
    );

  }



});


export default SellPage;
