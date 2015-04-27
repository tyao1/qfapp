'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';

import AppConstants from '../constants/AppConstants';
import AppActions from '../actions/AppActions';
import UserAction from '../actions/UserActions';

const CHANGE_EVENT = 'CHANGE_SellStore';


let _isSubmitting = false;
let _submitMsg = '';
let _success = false;
const SellStore = assign({}, EventEmitter.prototype, {

  getIsSubmitting(){
    return _isSubmitting;
  },
  getSubmitMsg(){
    return _submitMsg;
  },
  getSuccess(){
    return _success;
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

SellStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case UserConstants.APPLY_SELL_SUBMIT:
        _isSubmitting = true;
        _success = false;
        _submitMsg = '';
        SellStore.emitChange();
        break;

      case UserConstants.APPLY_SELL_FAILURE:
        _submitMsg = '啊哦，网络出错辣！';
        _isSubmitting = false;
        SellStore.emitChange();
        break;
      case UserConstants.APPLY_SELL_SUCCESS:
        if (action.data.Code === 0) {
          _success = true;
        }
        else if(action.data.Code === 1007){
          //需要登陆
          AppActions.needLogin(AppStore.getTransition().path);
          //UserAction.needLogin();
        }
        else{
          _submitMsg = action.data.Msg;
        }
        _isSubmitting = false;
        SellStore.emitChange();
        break;
      default:
      // Do nothing

    }
  }
  else{
    switch (action.actionType) {
      case UserConstants.APPLY_SELL_NEW:
        _success = false;
        _submitMsg = '';
        SellStore.emitChange();
        break;
    }
  }

});

export default SellStore;
