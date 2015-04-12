'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';
require('./MyInfo.scss');

const MyInfo = React.createClass({
  _onUserChange(){
    this.setState({
      userData: UserStore.getUserData()
    });
  },

  mixins:[PureRenderMixin],

  getInitialState(){
    return {
      userData: UserStore.getUserData()
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
      <div className="headline">
        <div className="avartar">
          <span>暂不支持更换头像</span>
          <img src={this.state.userData.avartar}/>
        </div>
        <div className="info">
          <h3 className="name">{this.state.userData.name}</h3>
          <p>已购物品：<span className="value">123件</span></p>
          <p>已售物品：<span className="value">22件</span></p>
          <p className="earning">累计收益：<span className="value">2323元</span></p>
        </div>

      </div>

      <div className="content">
        <div className="inner">


          </div>
      </div>
    </div>);

  }
});


export default MyInfo;
