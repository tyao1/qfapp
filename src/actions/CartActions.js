'use strict';

import Dispatcher from '../core/Dispatcher';
import CartConstants from '../constants/CartConstants';

import CartAPIUtils from '../utils/CartAPIUtils';

export default {

  changeNum(data){
    Dispatcher.handleViewAction({
      actionType: CartConstants.CHANGE_NUM,
      data
    });
  },
  deleteItem(data){
    Dispatcher.handleViewAction({
      actionType: CartConstants.DELETE_ITEM,
      data
    });
  },
  deleteItemSuccess(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.DELETE_ITEM_SUCCESS,
      data
    });
  },
  deleteItemFailure(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.DELETE_ITEM_FAILURE,
      data
    });
  },

  cartOrderSubmit(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.CART_ORDER_SUBMIT,
      data
    });
    console.log(data);
    CartAPIUtils.submitOrder(data);
  },
  cartOrderSuccess(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.CART_ORDER_SUCCESS,
      data
    });
  },
  cartOrderFailure(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.CART_ORDER_FAILURE,
      data
    });
  },
  cartOrderNew(){
    Dispatcher.handleViewAction({
      actionType: CartConstants.CART_ORDER_NEW
    });
  },


  cartAdd(data){
    Dispatcher.handleViewAction({
      actionType: CartConstants.CART_ADD,
      data:data
    });
    //CartAPIUtils.submitOrder(data);
  },

  cartAddSuccess(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.CART_ADD_SUCCESS,
      data:data
    });
  },
  cartAddFailure(data){
    Dispatcher.handleServerAction({
      actionType: CartConstants.CART_ADD_FAILURE,
      data:data
    });
  },




};
