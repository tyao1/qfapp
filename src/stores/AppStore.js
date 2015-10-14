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

let _modalLoginIsOpen = false;
let _modalRegisterIsOpen = false;

let _token = localStorage.getItem('tfboy') || '';

function isNeedLogin(){

}

const AppStore = assign({}, EventEmitter.prototype, {
  getLoginModal(){
    return _modalLoginIsOpen;
  },
  getRegModal(){
    return _modalRegisterIsOpen;
  },
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
  getKey() {
    return _transition?_transition.params.key:null;
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
      _modalLoginIsOpen = true;
      AppStore.emitChange();
      break;
    case AppConstants.TOGGLE_LOGIN:
      _modalLoginIsOpen = !_modalLoginIsOpen;
      AppStore.emitChange();
      break;
    case AppConstants.TOGGLE_REG:
      _modalRegisterIsOpen = !_modalRegisterIsOpen;
      AppStore.emitChange();
      break;
    default:
      if(action.data&&action.data.body){
        if(action.data.body.Code===1007&&Object.keys(action.data.body).length===2){
          //transition to index
          if(_transition.path&&(_transition.path.indexOf('/my')>=0||_transition.path.indexOf('/sell')>=0)){
            router.transitionTo('/');
          }
          AppStore.requireLogin();
        }
        if(action.data.body.Code===1008){
          setTimeout(()=> {

            NotificationActions.addNotification(
              `>_<需要填写手机号`
            );
          });
          router.transitionTo('/my/info');
        }
      }
      break;
      // Do nothing

  }

});

export default AppStore;
