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


let _items = Immutable.Map();
let _curId = -1;

const DetailStore = assign({}, EventEmitter.prototype, {

  getCurId(){
    return _curId;
  },
  getDetail() {
    if(_curId<0){return DetailConstants.DETAIL_KEY_NULL; }
    let item = _items.get(_curId);
    if (!item || item === DetailConstants.DETAIL_KEY_NULL || item.isTemp) {
      //开始异步获取数据
      DetailAPIUtils.getDetail(_curId);
      //设置无内容标志
      _items = _items.set(_curId, DetailConstants.DETAIL_KEY_NULL);
      return DetailConstants.DETAIL_KEY_NULL;
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

DetailStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case DetailConstants.DETAIL_SUCCESS:
        if(action.data.body.Code===0)
        {
          //转义内容
          let {goods_id, type_id, name, quality, price, status, img, path, sold_num, book_num, token_off, upath, detail, nickname} = action.data.body.Info;
          goods_id = parseInt(goods_id);
          type_id = parseInt(type_id);
          quality = parseInt(quality);
          price = parseFloat(price);
          status = parseInt(status);
          sold_num = parseInt(sold_num);
          book_num = parseInt(book_num);

          _items = _items.set(action.data.key, {
            goods_id,
            type_id,
            name,
            quality,
            price,
            status,
            path,
            sold_num,
            book_num,
            token_off,
            img,
            upath,
            detail,
            nickname
          });
        }
        else{
          _items = _items.set(action.data.key, DetailConstants.DETAIL_KEY_FAILURE);
        }
        DetailStore.emitChange();
        break;
      case DetailConstants.PAGE_FAILURE:
        _items = _items.set(action.data.key, DetailConstants.DETAIL_KEY_FAILURE);
        DetailStore.emitChange();
        break;
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
          _curId = action.data.params.id;
          DetailStore.emitChange();
        }
        break;
      case DetailConstants.DETAIL_NEW:
        //填充来自之前的缓存数据，有则跳过，无则填充
        const tempItem = action.data;
        //_curId = tempItem.goods_id;
        let previItem = _items.get(tempItem.goods_id);
        if(!previItem||previItem === DetailConstants.DETAIL_KEY_NULL){
          tempItem.isTemp = true;
          _items = _items.set(tempItem.goods_id, tempItem);
          DetailStore.emitChange();
        }
        break;
      /*case DetailConstants.DETAIL_REFRESH:
        //填充来自之前的缓存数据，有则跳过，无则填充
        _curId = action.data
        DetailStore.emitChange();

        break;*/
      default:
        break;
    }
  }

});

export default DetailStore;
