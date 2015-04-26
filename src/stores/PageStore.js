'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

import PageAPIUtils from '../utils/PageAPIUtils';
import PageConstants from '../constants/PageConstants';
import Immutable from 'immutable';

const CHANGE_EVENT = 'CHANGE_PageStore';


let _items = Immutable.Map();

const PageStore = assign({}, EventEmitter.prototype, {
  getItems(section) {
    let item = _items.get(section);
    if (!item|| item === PageConstants.PAGE_KEY_NULL) {
      //开始异步获取数据
      PageAPIUtils.getItems(section);
      //设置无内容标志
      _items = _items.set(section, PageConstants.PAGE_KEY_NULL);
      return PageConstants.PAGE_KEY_NULL;
      //清除内容
      //setTimeout(()=>{this.cache[UserConstants.SELL_ORDERS_KEY] = null; }, 5000);//cache for 5 sec
    }
    else{
      return item;
    }
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

PageStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case PageConstants.PAGE_SUCCESS:
        _items = _items.set(action.data.key, action.data.body);
        PageStore.emitChange();
        break;
      case PageConstants.PAGE_FAILURE:
        _items = _items.set(action.data.key, PageConstants.PAGE_KEY_FAILURE);
        PageStore.emitChange();
        break;

      default:
      // Do nothing

    }
  }
});

export default PageStore;
