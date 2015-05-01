'use strict';

import Dispatcher from '../core/Dispatcher';
import OrderConstants from '../constants/OrderConstants';

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



  setNewType(key, typeId){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_CHANGE_TYPE,
      typeId
    });
  },

  changeOrder(key, page){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_CHANGE_ORDER,
      page
    });
  },

  refresh(key){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_REFRESH,
      key
    });
  }
}
