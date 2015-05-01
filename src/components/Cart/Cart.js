'use strict';

import React from 'react';
import Banner from '../Banner';
import CartStore from '../../stores/CartStore';


import CartListItem from '../CartListItem';
import ButtonNormal from '../ButtonNormal';
import {shoppingcart, boxface, paperplane} from '../SVGs';


import CartActions from '../../actions/CartActions';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

require('./Cart.scss');



const Cart = React.createClass({

  mixins: [PureRenderMixin],
  _onCartChange(){
    this.setState({
      items: CartStore.getItems(),
      realErrMsg: CartStore.getSubmitMsg(),
      isSubmitting: CartStore.getIsSubmitting(),
      isSuccessful: CartStore.getSuccess()
    });

  },

  getInitialState(){
    return {
      items: CartStore.getItems(),
      aboutToOrder: false,
      //b_NO: '',
      //NO: '',
      realErrMsg: CartStore.getSubmitMsg(),
      isSubmitting: CartStore.getIsSubmitting(),
      isSuccessful: CartStore.getSuccess()
    };
  },

  componentWillMount() {
    CartStore.addChangeListener(this._onCartChange);
  },

  componentWillUnmount(){
    CartStore.removeChangeListener(this._onCartChange);
  },

  handleNumChange(goods_id){
    return (num)=>{
      CartActions.changeNum({goods_id, num});
    };
  },
  handleDelete(goods_id){
    return ()=>{
      CartActions.deleteItem({goods_id});
    };
  },
  handleOrder(){
    this.setState({aboutToOrder: true});
  },
  handleCloseOrder(){
    this.setState({aboutToOrder: false});
  },
/*
  handleBNOChange(e){
    this.setState({b_NO: e.target.value});

  },
  handleNOChange(e){
    this.setState({NO: e.target.value});
  },
*/
  handleRealSubmitClick(){
    if(this.state.isSuccessful){
      this.setState({
        aboutToOrder: false
      });
      this.props.onCartClose();
      setTimeout(()=>{CartActions.cartOrderNew(); }, 430);
    }
    else{
      if(!this.state.isSubmitting){
        let items = this.state.items.toJS();
        let submitItems = [];
        Object.keys(items).map((key)=> {
         let data = items[key];
         if (data) {
           submitItems.push({
             gid: data.goods_id,
             num: data.num
           });
         }
        });
        console.log('submitItems', submitItems);
        CartActions.cartOrderSubmit({bookInfo: JSON.stringify(submitItems)});
      }
    }
  },
  render() {
    let elem;
    //let cartList = [];
    if(this.state.items.size || this.state.isSuccessful){
      let items = this.state.items.toJS();
      let price = 0;
      elem = <div className="cart">
        <div className="cartList">
          {
            Object.keys(items).map((key)=>{
              let data = items[key];
              if(!data) {
                return;
              }
              let goods_id = data.goods_id;
              price += data.price * data.num;
              data.price = data.price * data.num;
              return <CartListItem key={goods_id} data={data} handleNumChange={this.handleNumChange(goods_id)} handleDelete={this.handleDelete(goods_id)}/>;
            })
          }
        </div>


        <div className="checkout">
          <div className="controls">
            <p className="total">总价：${price.toFixed(2)}元</p>
            <div className={`orderWrapper${this.state.aboutToOrder?' active':''}`}>
              <ButtonNormal text="下单" svg={shoppingcart} onClick={this.handleOrder}/>
              <div className="morph">
                {
                  this.state.isSuccessful?
                  <div className="submitForm">
                    <p className="main">哇呼～<br/>订单已经成功提交~<br/>请等待我们打包物品</p>
                    <ButtonNormal className="ButtonNormal submit" text="关闭"
                                  svg={paperplane} onClick={this.handleRealSubmitClick}/>
                  </div>
                  :
                  <div className="submitForm">
                    <p className="main">确认订单
                      <span className="price">物品总价：${price.toFixed(2)}元</span>
                    </p>
                    <p className="err">{this.state.realErrMsg}</p>
                    <div className="controls">
                      <ButtonNormal className="ButtonNormal submit" text={this.state.isSubmitting?'提交中……':'正式提交'}
                                    svg={paperplane} onClick={this.handleRealSubmitClick}/>
                      <ButtonNormal className="ButtonNormal cancel" text="返回"
                                    onClick={this.handleCloseOrder}/>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>;
    }
    else{
      elem = <div className="cart">
          <div className="inner">
            {boxface}
            <span>
              购物车里空空如也，<br/>
              快去淘些好东西吧～
            </span>
          </div>
        </div>;
    }
    return (
      <div>
        {elem}
      </div>
    );
  }
});

export default Cart;

/*
 <!--
 <div className="inputEffectAgain">
 <input type="text" value={this.state.b_NO} onChange={this.handleBNOChange}/>
 <label className={this.state.b_NO.length?'active':null}>宿舍楼号</label>
 </div>

 <div className="inputEffectAgain">
 <input type="text" value={this.state.NO} onChange={this.handleNOChange}/>
 <label className={this.state.NO.length?'active':null}>宿舍号</label>
 </div>
 -->
 */
