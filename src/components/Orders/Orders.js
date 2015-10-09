'use strict';

import React from 'react';
import OrderStore from '../../stores/OrderStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import OrderConstants from '../../constants/OrderConstants';
import OrderItem from '../OrderItem';
import SellOrderItem from '../SellOrderItem';
import BuyOrderItem from '../BuyOrderItem';
import OrderActions from '../../actions/OrderActions';
import Counter from '../Counter';
import Modal from '../Modal';
import ButtonNormal from '../ButtonNormal';
import {paperplane} from '../SVGs';
require('./Orders.scss');

const SellOrders = React.createClass({
  mixins: [PureRenderMixin],
  _onOrderChange(){
    let key = OrderStore.getKey();
    this.setState({
      key,
      items: OrderStore.getItems(),
      currentPage: OrderStore.getPage(),
      isSubmitting: OrderStore.getIsSubmitting(),
      isSuccessful: OrderStore.getSuccess(),
      realErrMsg: OrderStore.getSubmitMsg()
    });
  },

  getInitialState(){
    let key = OrderStore.getKey();
    return {
      key,
      items: OrderStore.getItems(key),
      modalCancelIsOpen: false,
      applyReason: '',
      isSubmitting: OrderStore.getIsSubmitting(),
      isSuccessful: OrderStore.getSuccess(),
      realErrMsg: OrderStore.getSubmitMsg(),
      isNormalOrder: false
    };
  },
  componentDidMount(){
    document.title='订单信息 - 清风';
  },
  componentWillMount(){
    OrderStore.addChangeListener(this._onOrderChange);

  },
  componentWillUnmount(){
    OrderStore.removeChangeListener(this._onOrderChange);
  },
  handleRetry(){
    OrderActions.refresh(this.state.key);
  },
  handlePageChange(page){
    OrderActions.changePage(page);
  },
  handleApplyCancel(id){
    OrderActions.newSubmit();
    this.setState({
      cancelBook: id,
      modalCancelIsOpen: true,
      isNormalOrder: false
    })
  },
  handleApplyCancelNormal(id){
    OrderActions.newSubmit();
    this.setState({
      cancelBook: id,
      modalCancelIsOpen: true,
      isNormalOrder: true
    })
  },
  handleCloseModal(){
    this.setState({
      modalCancelIsOpen: false
    })
  },
  handleApplyReasonChange(e){
    this.setState({
      applyReason: e.target.value
    })
  },
  handleRealSubmitClick(){
    if(this.state.isSuccessful){
      this.setState({
        modalCancelIsOpen: false
      });
      return;
    }
    if(this.state.isNormalOrder){
      OrderActions.cancelOrderNormalSubmit(this.state.cancelBook);
    }
    else {
      if (!this.state.isSubmitting) {
        if (this.state.applyReason.length < 6) {
          this.setState({realErrMsg: '理由最少6个字额'});
        }
        else {
          OrderActions.cancelOrderSubmit(this.state.cancelBook, this.state.applyReason);
        }
      }
    }
  },
  render(){
    let elem, max;
    const items = this.state.items;
    if(items===OrderConstants.ORDER_KEY_NULL){
      elem = <img src="./facebook.svg" />;
      document.title='载入中 - 清风';
    }
    else if(items===OrderConstants.ORDER_KEY_FAILURE){
      document.title='加载失败(ง •̀_•́)ง┻━┻ - 清风';
      elem = <div className="failure">
        <p>啊哦，加载失败了</p>
        <p>{this.state.failMsg}</p>
        <ButtonNormal text="重试" onClick={this.handleRetry}/>
      </div>;
    }
    else{
      if(items && items.length>=8){
        max = 999999999;
      }
      else{
        max = this.state.currentPage;
      }
      switch (this.state.key){
        case OrderConstants.ORDER_KEY:
          document.title='我的订单 - 清风';
          if(items.length){
            elem = items.map( order => <BuyOrderItem key={order.book_id} data={order} cancelClick={this.handleApplyCancelNormal}/>);
          }
          else{
            elem = <div className="failure"><p>没有订单 ʅ(‾◡◝)ʃ</p></div>
          }
          break;
        case OrderConstants.ON_SALE_ORDER_KEY:
          document.title='上线 - 清风';
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
          document.title='历史物品 - 清风';
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
          document.title='我的申请 - 清风';
          if(items.length){
            elem = items.map( order => <OrderItem key={order.app_id} data={order}  cancelClick={this.handleApplyCancel}/>);
          }
          else{
            elem = <div className="failure"><p>没有申请ಠ_ಠ</p></div>
          }
          break;
        case OrderConstants.C2C_APPLY_ORDER_KEY:
          document.title='我的售卖 - 清风';
          if(items.length){
            elem = items.map( order => <OrderItem key={order.app_id} data={order}  cancelClick={this.handleApplyCancel}/>);
          }
          else{
            elem = <div className="failure"><p>没有申请ಠ_ಠ</p></div>
          }
          break;
        case OrderConstants.C2C_ORDER_KEY:
          document.title='我的购买 - 清风';
          if(items.length){
            elem = items.map( order => <OrderItem key={order.app_id} data={order}  cancelClick={this.handleApplyCancel}/>);
          }
          else{
            elem = <div className="failure"><p>没有申请ಠ_ಠ</p></div>
          }
          break;
        default:
          break;

      }
    }

    return (<div className="daOrders">
      <div className="main">
        {elem}
      </div>
      <div className="pagination">
        <Counter isPage={true} initValue={this.state.currentPage} OnValueChange={this.handlePageChange} max={max} min={1}/>
      </div>
      <Modal isOpen={this.state.modalCancelIsOpen} onClose={this.handleCloseModal}>
        {this.state.isSuccessful?
          <div className="submitForm">
            <p className="main">{this.state.isNormalOrder?'提交申请成功(✪ω✪)':'提交申请成功，我们将会审核(✪ω✪)'}</p>
            <ButtonNormal className="ButtonNormal submit" text="关闭"
                          svg={paperplane} onClick={this.handleRealSubmitClick}/>
          </div>
          :
          <div className="submitForm">
            <p className="main">确认要取消这个{this.state.isNormalOrder?'订单':'申请'}吗？</p>
            {
              this.state.isNormalOrder?null:
              <div className="inputEffectAgain">
                <input type="text" value={this.state.applyReason} onChange={this.handleApplyReasonChange}/>
                <label className={this.state.applyReason.length?'active':null}>申请理由</label>
              </div>
            }
            <p>{this.state.realErrMsg}</p>
            <ButtonNormal className="ButtonNormal submit" text={this.state.isSubmitting?'提交中……':'提交申请'} svg={paperplane} onClick={this.handleRealSubmitClick}/>
          </div>
        }
      </Modal>
    </div>);
  }

});


export default SellOrders;
