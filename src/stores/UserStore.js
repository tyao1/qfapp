'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';

import UserAPIUtils from '../utils/UserAPIUtils';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'CHANGE_UserStore';

let _userData = JSON.parse(localStorage.getItem('userData'));
let _loginMsg;
let _regMsg;
let _isRegistering;
let _isLogining;
let _section;

const UserStore = assign({}, EventEmitter.prototype, {

  cache:{},

  getUserData(){
    return _userData;
  },

  getRegMsg(){
    return _regMsg;
  },

  getLoginMsg(){
    return _LoginMsg;
  },

  getIsRegistering(){
    return _isRegistering;
  },

  getIsLogining(){
    return _isLogining;
  },

  getSellOrders() {
    if (!this.cache[UserConstants.SELL_ORDERS_KEY]) {
      //开始异步获取数据
      UserAPIUtils.getSellOrders();
      //设置无内容标志
      this.cache[UserConstants.SELL_ORDERS_KEY] = UserConstants.SELL_ORDERS_NULL;
      setTimeout(()=>{this.cache[UserConstants.SELL_ORDERS_KEY]=null},5000);//cache for 5 sec

    }

      return this.cache[UserConstants.SELL_ORDERS_KEY];


  },
  getSection(){
    return _section;
  },

  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.off(CHANGE_EVENT, callback);
  }

});

UserStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case UserConstants.SELL_ORDERS_SUCCESS:
        UserStore.cache[UserConstants.SELL_ORDERS_KEY] = action.data;
        UserStore.emitChange();
        break;
      case UserConstants.SELL_ORDERS_FAILURE:
        UserStore.emitChange();
        break;


      case UserConstants.REG_SUBMIT:
        _isRegistering = true;
        UserStore.emitChange();
        break;

      case UserConstants.REG_FAILURE:
        _regMsg = '啊哦，网络出错辣！';
        _isRegistering = false;
        UserStore.emitChange();
        break;
      case UserConstants.REG_SUCCESS:
        if (action.data.code == '0000') {
          _userData = action.data.userData;
          setTimeout(()=> {
            localStorage.setItem('userData', JSON.stringify(action.data.userData));
          }, 0);
        }
        _isRegistering = false;
        UserStore.emitChange();
        break;
      case UserConstants.LOGIN_SUBMIT:
        _isLogining = true;
        UserStore.emitChange();
        break;

      case UserConstants.LOGIN_FAILURE:
        _loginMsg = '啊哦，网络出错辣！';
        _isLogining = false;
        UserStore.emitChange();
        break;
      case UserConstants.LOGIN_SUCCESS:
        if (action.data.code == '0000') {
          _userData = action.data.userData;
          setTimeout(()=> {
            localStorage.setItem('userData', JSON.stringify(action.data.userData));
          }, 0);
        }
        _isLogining = false;
        UserStore.emitChange();
        break;
      default:
      // Do nothing

    }
  }
  else
  {
    switch (action.actionType){

      case AppConstants.TRANSITION:
        if(action.data.path.startsWith('/my'))
        {
          _section=action.data.params.section;
          UserStore.emitChange();
        }
        break;
      default:
        break;
    }
  }

});

export default UserStore;
