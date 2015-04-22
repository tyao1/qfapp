'use strict';

import React from 'react';
import Banner from '../Banner';
import CartStore from '../../stores/CartStore';


import CartListItem from '../CartListItem';
import ButtonNormal from '../ButtonNormal';
import {shoppingcart} from '../SVGs';


import CartActions from '../../actions/CartActions';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

require('./Cart.scss');



const Cart = React.createClass({

  mixins: [PureRenderMixin],
  _onCartChange(){
    this.setState({
      items: CartStore.getItems()
    });

  },

  getInitialState(){
    return {
      items: CartStore.getItems()
    };
  },

  componentWillMount() {
    CartStore.addChangeListener(this._onCartChange);
  },

  componentWillUnmount(){
    CartStore.removeChangeListener(this._onCartChange);
  },

  handleNumChange(id){
    return (num)=>{
      console.log(id,num);
      CartActions.changeNum({id,num});
    }
  },
  handleDelete(id){
    return ()=>{
      CartActions.deleteItem({id});
    }
  },

  render() {
    let elem;
    let cartList = [];
    if(this.state.items.size){
      let items = this.state.items.toJS();
      let price = 0;
      elem = <div className="cart">
        <div className="cartList">

          {

            Object.keys(items).map((key)=>{
              let data = items[key];
              console.log(data);
              price += data.price * data.num;
              return <CartListItem key={key} itemId={key} image={data.path} itemName={data.itemName}
                            itemType={data.itemType} name={data.nickname} price={(data.price * data.num).toFixed(2)}
                                   num={data.num} max={data.max} handleNumChange={this.handleNumChange(key)} handleDelete={this.handleDelete(key)}/>;
            })
          }
        </div>


        <div className="checkout">
          <div className="controls">
            <p className="total">总价：${price.toFixed(2)}元</p>
            <ButtonNormal text="下单" svg={shoppingcart}/>
          </div>
        </div>
      </div>;
    }
    else{
      elem = <div className="cart">
          asdasda
        </div>
    }
    return (
      <div>
        {elem}
      </div>
    );
  }
});

export default Cart;
