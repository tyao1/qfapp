'use strict';

import Dispatcher from '../core/Dispatcher';
import OrderConstants from '../constants/OrderConstants';
import OrderAPIUtils from '../actions/OrderActions';
export default {

  getItemsFailure1(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.ORDER_FAILURE,
      data
    });
  },
  getItemsSuccess1(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.ORDER_SUCCESS,
      data
    });
  },

  getItemsFailure2(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.APPLY_ORDER_FAILURE,
      data
    });
  },
  getItemsSuccess2(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.APPLY_ORDER_SUCCESS,
      data
    });
  },

  getItemsFailure3(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.ON_SALE_ORDER_FAILURE,
      data
    });
  },
  getItemsSuccess3(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.ON_SALE_ORDER_SUCCESS,
      data
    });
  },
  getItemsFailure4(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.OFF_SALE_ORDER_FAILURE,
      data
    });
  },
  getItemsSuccess4(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.OFF_SALE_ORDER_SUCCESS,
      data
    });
  },



  setNewStatus(key, status){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_CHANGE_TYPE,
      key,
      status
    });
  },

  changePage(page, key){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_CHANGE_ORDER,
      key,
      page
    });
  },

  refresh(key){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_REFRESH,
      key
    });
  },


  cancelOrderSubmit(id,reason){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.CANCEL_ORDER_SUBMIT,
      id,
      reason
    });
    OrderAPIUtils.cancelOrder({id,reason});
  },
  cancelOrderSuccess(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.CANCEL_ORDER_SUCCESS,
      data
    });
  },
  cancelOrderFailure(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.CANCEL_ORDER_FAILURE,
      data
    });
  },
  newSubmit(){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.CANCEL_ORDER_NEW
    });
  }


}
