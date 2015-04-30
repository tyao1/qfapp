'use strict';

import Dispatcher from '../core/Dispatcher';
import OrderConstants from '../constants/OrderConstants';

export default {

  getItemsFailure(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.ORDER_FAILURE,
      data
    });
  },
  getItemsSuccess(data){
    Dispatcher.handleServerAction({
      actionType: OrderConstants.ORDER_SUCCESS,
      data
    });
  },

  setNewKeyword(keyword){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_NEW_KEY_WORD,
      keyword
    });
  },

  setNewType(typeId){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_CHANGE_TYPE,
      typeId
    });
  },

  changeOrder(page){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_CHANGE_ORDER,
      page
    });
  },

  refresh(){
    Dispatcher.handleViewAction({
      actionType: OrderConstants.ORDER_REFRESH
    });
  }
}
