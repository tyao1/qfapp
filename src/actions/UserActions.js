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

  /*
    出售物品页面(Page Store)
   */

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
  },

  addNewSell(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.SELL_NEW_ITEM
    });
  },

  removeSell(id){
    Dispatcher.handleViewAction({
      actionType: UserConstants.SELL_REMOVE_ITEM,
      id
    });
  },

  changeData(id, key, value){
    Dispatcher.handleViewAction({
      actionType: UserConstants.SELL_CHANGE_DATA,
      id,
      key,
      value
    });
  },
  /*
    友易
   */
  applySellNewC2C(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.APPLY_SELL_NEW_C2C
    });
  },

  applySellSubmitC2C(data, images){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_SUBMIT_C2C,
      data
    });
    console.log('sell c2c submit', data);
    UserAPIUtils.applySellC2C(data, images);
  },
  applySellC2CSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_SUCCESS_C2C,
      data
    });
  },
  applySellC2CFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.APPLY_SELL_FAILURE_C2C,
      data
    });
  },
  changeDataC2C(key, value){
    Dispatcher.handleViewAction({
      actionType: UserConstants.SELL_CHANGE_DATA_C2C,
      key,
      value
    });
  },
  changeImageC2C(key, value){
    Dispatcher.handleViewAction({
      actionType: UserConstants.SELL_CHANGE_IMAGE_C2C,
      key,
      value
    });
  },


  /*
    个人信息修改
   */
  addToSubmit(key, value){
    Dispatcher.handleViewAction({
      actionType: UserConstants.ADD_TO_SUBMIT,
      key,
      value
    });
  },
  removeFromSubmit(key){
    Dispatcher.handleViewAction({
      actionType: UserConstants.REMOVE_FROM_SUBMIT,
      key
    });
  },
  changeInfoSubmit(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.CHANGE_INFO_SUBMIT,
      data
    });
    UserAPIUtils.changeInfo(data);
  },
  changeInfoSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.CHANGE_INFO_SUCCESS,
      data
    });
  },
  changeInfoFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.CHANGE_INFO_FAILURE,
      data
    });
  },

  findPasswordSubmit(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.FIND_PASSWORD_SUBMIT,
      data
    });
    UserAPIUtils.findPassword(data);
  },
  findPasswordSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.FIND_PASSWORD_SUCCESS,
      data
    });
  },
  findPasswordFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.FIND_PASSWORD_FAILURE,
      data
    });
  },


  uploadAvatarSubmit(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.UPLOAD_AVATAR_SUBMIT,
      data
    });
    UserAPIUtils.uploadAvatar(data);
  },
  uploadAvatarSuccess(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.UPLOAD_AVATAR_SUCCESS,
      data
    });
  },
  uploadAvatarFailure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.UPLOAD_AVATAR_FAILURE,
      data
    });
  },

  uploadAvatarStart(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.UPLOAD_AVATAR_START
    });
  },
  uploadAvatarEnd(){
    Dispatcher.handleViewAction({
      actionType: UserConstants.UPLOAD_AVATAR_END
    });
  }
};
