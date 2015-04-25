'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

import DetailConstants from '../constants/DetailConstants';

import DetailAPIUtils from '../utils/DetailAPIUtils';

import AppConstants from '../constants/AppConstants';

import Immutable from 'immutable';
const CHANGE_EVENT = 'CHANGE_DetailStore';


//let _id;
let _items = Immutable.Map();

const DetailStore = assign({}, EventEmitter.prototype, {

  getDetail(id) {
    let item = _items.get(id);
    if (!item|| item === DetailConstants.DETAIL_KEY_NULL) {
      //开始异步获取数据
      DetailAPIUtils.getDetail(id);
      //设置无内容标志
      _items = _items.set(id, DetailConstants.DETAIL_KEY_NULL);
      return DetailConstants.DETAIL_KEY_NULL;
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
      case DetailConstants.DETAIL_SUCCESS:
        _items = _items.set(action.data.key,action.data.body);
        DetailStore.emitChange();
        break;
      case DetailConstants.PAGE_FAILURE:
        _items = _items.set(action.data.key,DetailConstants.DETAIL_KEY_FAILURE);
        DetailStore.emitChange();
        break;
      default:
      // Do nothing

    }
  }
  else
  {
    switch (action.actionType){
      /*case AppConstants.TRANSITION:
        if(action.data.path.startsWith('/detail'))
        {
          _id = action.data.params.id;

          //调用API获取数据
          console.log('action.data',action.data);
          //发起API请求！
          DetailAPIUtils.getDetail(_id);

          DetailStore.emitChange();
        }
        break;
        */
      case DetailConstants.DETAIL_NEW:
        //填充来自之前的缓存数据，有则跳过，无则填充
        const tempItem = action.data;
        let previItem = _items.get(tempItem.id);
        if(!previItem||previItem === DetailConstants.DETAIL_KEY_NULL){
          tempItem.isTemp = true;
          _items = _items.set(tempItem.id,tempItem);
          console.log('_items',_items);
          DetailStore.emitChange();
        }
        break;
      default:
        break;
    }
  }

});

export default DetailStore;
