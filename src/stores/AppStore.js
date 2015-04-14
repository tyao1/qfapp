'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'CHANGE_AppStore';

let _isHome = false;
let _transition;
let _toTrans;


const AppStore = assign({}, EventEmitter.prototype, {

  getIsHome(){
    if(_transition)
     return (_transition.path === '/');
    else
      return false;
  },
  getTransition(){
    return _transition;
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

AppStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;

  switch (action.actionType) {
    case AppConstants.TRANSITION:
      _transition = action.data;
      AppStore.emitChange();
      break;
    case AppConstants.NEED_LOGIN:
      _toTrans = action.data;
      AppStore.emitChange();
      break;
    /*
    case AppConstants.LOAD_HOME:
      _isHome = true;
      AppStore.emitChange();
      break;
    case AppConstants.LEAVE_HOME:
      _isHome = false;
      AppStore.emitChange();
      break;
      */
    default:
      // Do nothing

  }

});

export default AppStore;
