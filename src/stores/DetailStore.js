'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

import DetailConstants from '../constants/PageConstants';

import DetailAPIUtils from '../utils/DetailAPIUtils';

import AppConstants from '../constants/AppConstants';
import AppAction from '../actions/AppActions';

const CHANGE_EVENT = 'CHANGE_DetailStore';



let _items = Immutable.Map();

const DetailStore = assign({}, EventEmitter.prototype, {

  getItems(id) {
    let item = _items.get(id);
    if (!item|| item === DetailConstants.DETAIL_KEY_NULL) {
      //开始异步获取数据
      DetailAPIUtils.getDetail(id);
      //设置无内容标志
      _items = _items.set(id, DetailConstants.DETAIL_KEY_NULL);
      return DetailConstants.Detail_KEY_NULL;
      //清除内容
      //setTimeout(()=>{this.cache[UserConstants.SELL_ORDERS_KEY] = null; }, 5000);//cache for 5 sec
    }
    else
      return item;
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

DetailStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {

      default:
      // Do nothing

    }
  }
  else
  {
    switch (action.actionType){

      case AppConstants.TRANSITION:
        if(action.data.path.startsWith('/detail'))
        {
          _Id = action.data.params.id;
          DetailStore.emitChange();
        }
        break;

      default:
        break;
    }
  }

});

export default DetailStore;
