'use strict';

import Dispatcher from '../core/Dispatcher';
import UserConstants from '../constants/UserConstants';

import UserAPIUtils from '../utils/UserAPIUtils';

export default {

  /*
   * 注册
   */
  register(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.REG_SUBMIT,
      data
    });
    UserAPIUtils.register(data);
  },
  registerFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.REG_FAILURE,
      data
    });
  },
  registerSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.REG_SUCCESS,
      data
    });
  },
  refreshRegVerify(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.REFRESH_REGV
    });
  },

  login(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.LOGIN_SUBMIT,
      data
    });
    UserAPIUtils.login(data);
  },
  loginFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.LOGIN_FAILURE,
      data
    });
  },
  loginSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.LOGIN_SUCCESS,
      data
    });
  },
  refreshLoginVerify(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.REFRESH_LOGINV
    });
  },



  getSellOrdersFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.SELL_ORDERS_FAILURE,
      data
    });
  },
  getSellOrdersSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.SELL_ORDERS_SUCCESS,
      data
    });
  },

};
