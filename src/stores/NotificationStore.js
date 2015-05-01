'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import CartConstants from '../constants/CartConstants';
import NotificationConstants from '../constants/NotificationConstants';

import Immutable from 'immutable';

const CHANGE_EVENT = 'CHANGE_NotificationStore';
const TIMEOUT = 8000;

let _notifications = Immutable.OrderedMap();

let _key = 0;

function pushNotification(data){
  let key = _key++;
  _notifications = _notifications.set(key, data);
  console.log(_notifications);
  setTimeout(()=>{
    console.log('delete notic', key, _notifications.get('key'));
    _notifications = _notifications.delete(key);
    NotificationStore.emitChange();
  }, TIMEOUT);
}

const NotificationStore = assign({}, EventEmitter.prototype, {

  getNotifications(){
    return _notifications;
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

NotificationStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      default:
      // Do nothing

    }
  }
  else{
    switch (action.actionType) {
      case NotificationConstants.DELETE_ONE:
        _notifications = _notifications.delete(action.data);
        NotificationStore.emitChange();
        break;
      case NotificationConstants.ADD_ONE:
        pushNotification(action.data);
        NotificationStore.emitChange();
        break;
      default:
        break;
    }
  }

});

export default NotificationStore;
