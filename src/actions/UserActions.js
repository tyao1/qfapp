'use strict';

import Dispatcher from '../core/Dispatcher';
import UserConstants from '../constants/UserConstants';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
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

  //登出
  logout(){
    //直接发AppActions
    AppActions.needLogin(AppStore.getTransition().path);
    UserAPIUtils.logout();
  },

  applySellSubmit(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_SUBMIT,
      data
    });
    console.log('sell submit', data);
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
  }


};
