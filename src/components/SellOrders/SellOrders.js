'use strict';

import React from 'react';
import OrderStore from '../../stores/OrderStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import OrderConstants from '../../constants/OrderConstants';
import OrderItem from '../OrderItem';
require('./SellOrders.scss');

const SellOrders = React.createClass({
  _onOrderChange(){
    this.setState({
      sellOrders: OrderStore.getSellOrders()
    });
  },

  mixins: [PureRenderMixin],
  getInitialState(){
    return {
      sellOrders: OrderStore.getSellOrders()
    };
  },
  componentWillMount(){
    OrderStore.addChangeListener(this._onOrderChange);

  },
  componentWillUnmount(){
    OrderStore.removeChangeListener(this._onOrderChange);

  },
  render(){
    let elem;
    const sellOrders = this.state.sellOrders;
    console.log(sellOrders);
    if(sellOrders===OrderConstants.SELL_ORDERS_NULL){
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
