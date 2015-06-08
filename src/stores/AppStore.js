'use strict';

import router from '../router';
import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import AppConstants from '../constants/AppConstants';
import NotificationActions from '../actions/NotificationActions';
import AppActions from '../actions/AppActions';

import UserStore from '../stores/UserStore';

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

  getPath(){
    return _transition?_transition.path:null;
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
    setTimeout(()=>{
      let trans = AppStore.getTransition();
      AppActions.needLogin(trans?trans.path:'/' );
      NotificationActions.addNotification(
        `>_<需要登录`
      );
    });
  }

});

AppStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;

  switch (action.actionType) {
    case AppConstants.TRANSITION:
      _transition = action.data;
      console.log('transition',action.data);
      AppStore.emitChange();
      break;
    case AppConstants.NEED_LOGIN:
      _toTrans = action.data;
      router.transitionTo('/');
      AppStore.emitChange();
      break;

    default:
      if(action.data&&action.data.body&&action.data.body.Code===1007&&UserStore.getUserData()){
        AppStore.requireLogin();
      }
      break;
      // Do nothing

  }

});

export default AppStore;
