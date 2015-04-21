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


  /*
   * 登录
   */
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


  /*
   * 卖单
   */
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


  applySellSubmit(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_SUBMIT,
      data
    });
    console.log(data);
    UserAPIUtils.applySell(data);
  },
  applySellSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_SUCCESS,
      data
    });
  },
  applySellFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_FAILURE,
      data
    });
  },
  applySellNew(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.APPLY_SELL_NEW
    });
  },
  needLogin(wait=2){
    Dispatcher.handleViewAction({
      actionType: UserConstants.NEED_LOGIN,
      wait
    });
  }


};
