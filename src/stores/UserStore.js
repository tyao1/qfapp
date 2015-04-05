'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';

const CHANGE_EVENT = 'CHANGE_UserStore';

let _userData;
let _regMsg;

const UserStore = assign({}, EventEmitter.prototype, {

  getUserData(){
    return _userData;
  },

  getRegMsg(){
    return _regMsg;
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
          console.log(action.data);
          break;

    case UserConstants.REG_FAILURE:
          _regMsg='啊哦，网络出错辣！';
          UserStore.emitChange();
          break;
    default:
    // Do nothing

  }

});

export default UserStore;
