'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';
import OrderItem from '../OrderItem';
require('./SellOrders.scss');

const SellOrders = React.createClass({
  _onUserChange(){
    this.setState({
      sellOrders: UserStore.getSellOrders()
    });
  },

  mixins: [PureRenderMixin],
  getInitialState(){
    return {
      sellOrders: UserStore.getSellOrders()
    };
  },
  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnMount(){
    UserStore.removeChangeListener(this._onUserChange);

  },
  render(){
    let elem;
    const sellOrders = this.state.sellOrders;
    console.log(sellOrders);
    if(sellOrders===UserConstants.SELL_ORDERS_NULL){
      elem = <img src="./facebook.svg" />;
    }
    else if(sellOrders.length){
      elem = sellOrders.map((order)=>
        <OrderItem data={order}/>
      );

    }

    return (<div className="sellOrders">
      {elem}
    </div>);

  }



});


export default SellOrders;
