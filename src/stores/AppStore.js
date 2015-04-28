'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import AppConstants from '../constants/AppConstants';
import router from '../router';
import NotificationActions from '../actions/NotificationActions';

const CHANGE_EVENT = 'CHANGE_AppStore';

//let _isHome = false;
let _transition;
let _toTrans;


const AppStore = assign({}, EventEmitter.prototype, {

  getIsHome(){
    if(_transition){
     return (_transition.path === '/');
   }
    else{
      return false;
    }
  },
  getTransition(){
    return _transition;
  },
  getToTrans(){
    return _toTrans;
  },

  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.off(CHANGE_EVENT, callback);
  },
  requireLogin(){
    console.log('requireLogin');
    AppActions.needLogin(AppStore.getTransition().path);
    setTimeout(()=>{
      NotificationActions.addNotification(
        `需要登陆`
      );
    });
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
      router.transitionTo('home');
      AppStore.emitChange();
      break;

    default:
      console.log('AppStore Default');
      if(action.data&&action.data.Code===1007){
        requireLogin();
      }
      break;
      // Do nothing

  }

});

export default AppStore;
