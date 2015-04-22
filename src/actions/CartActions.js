'use strict';

import Dispatcher from '../core/Dispatcher';
import CartConstants from '../constants/CartConstants';

import UserAPIUtils from '../utils/UserAPIUtils';

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
    }


};
