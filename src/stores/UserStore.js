'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';

const CHANGE_EVENT = 'CHANGE_UserStore';

let _userData;
let _loginMsg;
let _regMsg;
let _isRegistering;
let _isLogining;
const UserStore = assign({}, EventEmitter.prototype, {

  getUserData(){
    return _userData;
  },

  getRegMsg(){
    return _regMsg;
  },

  getIsRegistering(){
    return _isRegistering;
  },

  getIsLogining(){
    return _isLogining;
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

  switch (action.actionType) {
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
      console.log(action.data);
      if(action.data.code=='0000'){
        _userData = action.data.userData;
      };
      _isRegistering = false;
      UserStore.emitChange();
      break;
    case UserConstants.LOGIN_SUBMIT:
      _isLogining = true;
      UserStore.emitChange();
      break;

    case UserConstants.LOGIN_FAILURE:
      _regMsg = '啊哦，网络出错辣！';
      _isLogining = false;
      UserStore.emitChange();
      break;
    case UserConstants.LOGIN_SUCCESS:
      console.log(action.data);
      if(action.data.code=='0000'){
        _userData = action.data.userData;
      };
      _isLogining = false;
      UserStore.emitChange();
      break;
    default:
    // Do nothing

  }

});

export default UserStore;
