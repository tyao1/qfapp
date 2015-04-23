'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';
import CartConstants from '../constants/CartConstants';

import UserAPIUtils from '../utils/UserAPIUtils';
import AppConstants from '../constants/AppConstants';
import AppStore from './AppStore';
import router from '../router';
import AppAction from '../actions/AppActions';
import UserAction from '../actions/UserActions';
import CartActions from '../actions/CartActions';

import Immutable from 'immutable';

const CHANGE_EVENT = 'CHANGE_CartStore';



let _isSubmitting = false;
let _success = false;
let _submitMsg = '';


let _items = Immutable.fromJS({
  a123:{
      itemType: '书籍',
      itemName: '论演员的自我修养',
      num: 1,
      max: 3,
      price: 7.0,
      nickname :'没名字能用了啊',
      path: ''
    },
  b123:{
      itemType: '书籍',
      itemName: '论演员的自我修养',
      num: 1,
      max: 3,
      price: 3.0,
      nickname :'没名字能用了啊',
      path: ''
    }
  }
  );

const CartStore = assign({}, EventEmitter.prototype, {

  getItemsCount(){
    return _items.size;
  },

  getItems(){
    return _items;
  },
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

CartStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case CartConstants.CART_ORDER_SUBMIT:
        _isSubmitting = true;
        _success = false;
        _submitMsg = '';
        CartStore.emitChange();
        break;
      case CartConstants.CART_ORDER_FAILURE:
        _submitMsg = '啊哦，网络出错辣！';
        _isSubmitting = false;
        CartStore.emitChange();
        break;
      case CartConstants.CART_ORDER_SUCCESS:
        if (action.data.Code === 0) {
          //handle storeitems change
          _success = true;
          console.log(_items);
          _items = _items.clear();
          console.log(_items);
        }
        else if(action.data.Code === 1007){
          UserAction.needLogin();
        }
        else{
          _submitMsg = action.data.Msg;
        }
        _isSubmitting = false;
        CartStore.emitChange();
        break;
      default:
      // Do nothing

    }
  }
  else{
    switch (action.actionType) {
      case CartConstants.CART_ORDER_NEW:
        _success = false;
        CartStore.emitChange();
        break;

      case CartConstants.CHANGE_NUM:
        _items = _items.updateIn([action.data.id,'num'],val => action.data.num);
        CartStore.emitChange();
        break;
      case CartConstants.DELETE_ITEM:
        _items = _items.delete(action.data.id);
        CartStore.emitChange();
        break;
    }
  }

});

export default CartStore;
