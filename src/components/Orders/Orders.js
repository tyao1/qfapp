'use strict';

import React from 'react';
import OrderStore from '../../stores/OrderStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import OrderConstants from '../../constants/OrderConstants';
import OrderItem from '../OrderItem';
import SellOrderItem from '../SellOrderItem';
import BuyOrderItem from '../BuyOrderItem';
import OrderActions from '../../actions/OrderActions';
import Counter from '../../components/Counter';
require('./Orders.scss');

const SellOrders = React.createClass({
  mixins: [PureRenderMixin],
  _onOrderChange(){
    let key = OrderStore.getKey();
    this.setState({
      key,
      items: OrderStore.getItems(),
      currentPage: OrderStore.getPage()

    });
  },

  getInitialState(){
    let key = OrderStore.getKey();
    return {
      key,
      items: OrderStore.getItems(key)
    };
  },
  componentWillMount(){
    OrderStore.addChangeListener(this._onOrderChange);

  },
  componentWillUnmount(){
    OrderStore.removeChangeListener(this._onOrderChange);
  },
  handleRetry(){
    OrderActions.retry(this.state.key);
  },
  handlePageChange(page){
    OrderActions.changeOrder(page);
  },
  render(){
    let elem, max, pagination;
    const items = this.state.items;
    console.log(items);
    if(items===OrderConstants.ORDER_KEY_NULL){
      elem = <img src="./facebook.svg" />;
    }
    else if(items===OrderConstants.PAGE_KEY_FAILURE){
      elem = <div className="failure">
        <p>啊哦，加载失败了</p>
        <p>{this.state.failMsg}</p>
        <ButtonNormal text="重试" onClick={this.handleRetry}/>
      </div>;
    }
    else{
      pagination = <div className="pagination">
        <Counter initValue={this.state.currentPage} OnValueChange={this.handlePageChange} max={max} min={1}/>
      </div>
      if(items && items.length<10){
        max = this.state.currentPage;
      }
      else{
        max = 1;
      }
      switch (this.state.key){
        case OrderConstants.ORDER_KEY:
          if(items.length){
            elem = items.map( order => <BuyOrderItem key={order.app_id} data={order}/>);
          }
          else{
            elem = <div className="failure"><p>没有订单 ʅ(‾◡◝)ʃ</p></div>
          }
          break;
        case OrderConstants.ON_SALE_ORDER_KEY:
          if(items.length){
            elem = items.map((order)=>
                <SellOrderItem key={order.goods_id} data={order}/>
            );
          }
          else{
            elem = <div className="failure"><p>没有在售物品 (＠゜▽゜@)ノ</p></div>
          }
          break;
        case OrderConstants.OFF_SALE_ORDER_KEY:
          if(items.length){
            elem = items.map((order)=>
                <SellOrderItem key={order.goods_id} data={order}/>
            );
          }
          else{
            elem = <div className="failure"><p>没有历史物品ヾ(○゜▽゜○)</p></div>
          }
          break;
        case OrderConstants.APPLY_ORDER_KEY:
          if(items.length){
            elem = items.map( order => <OrderItem key={order.book_id} data={order}/>);
          }
          else{
            elem = <div className="failure"><p>没有申请ಠ_ಠ</p></div>
          }
      }
    }

    return (<div className="daOrders">
      {elem}
      {pagination}
    </div>);
  }

});


export default SellOrders;
