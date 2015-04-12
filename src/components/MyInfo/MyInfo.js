'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';
require('./MyInfo.scss');

const MyInfo = React.createClass({
  _onUserChange(){
    this.setState({
      sellOrders: UserStore.getSellOrders()
    });
  },

  mixins:[PureRenderMixin],

  getInitialState(){
    return {
      sellOrders: UserStore.getSellOrders()
    }
  },
  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnMount(){
    UserStore.removeChangeListener(this._onUserChange);

  },
  render(){

    return (<div className="myInfo">
      Info!
    </div>);

  }
});


export default MyInfo;
