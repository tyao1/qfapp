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
    if (!item || item.isTemp) {
      //开始异步获取数据
      _items = _items.set(_curId, DetailConstants.DETAIL_KEY_NULL);
      DetailAPIUtils.getDetail(_curId);
      //设置无内容标志
      return DetailConstants.DETAIL_KEY_NULL;
      //清除内容
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
          let {goods_id, type_id, name, quality, price, status, img, path, sold_num, book_num, token_off, upath, detail, nickname, t_limit, signature} = action.data.body.Info;
          goods_id = parseInt(goods_id);
          quality = parseInt(quality);
          price = parseFloat(price);
          status = parseInt(status);
          sold_num = parseInt(sold_num);
          book_num = parseInt(book_num);
          t_limit = parseInt(t_limit);
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
            nickname,
            t_limit,
            signature
          });
          //删除缓存内容
          //setTimeout(()=>{_items = _items.delete(goods_id)}, 1000 * 30);
        }
        else if(action.data.body.Code===1041) {
          _items = _items.set(action.data.key, DetailConstants.DETAIL_KEY_NOT_FOUND);
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
        if(action.data.path&&action.data.path.indexOf('/detail')>=0)
        {
          let id = parseInt(action.data.params.id);
          if(_curId!==id){
            _curId = id;
            DetailStore.emitChange();
          }
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

      case DetailConstants.DETAIL_REFRESH:
        _items = _items.set(_curId, DetailConstants.DETAIL_KEY_NULL);
        DetailAPIUtils.getDetail(_curId);
        DetailStore.emitChange();
        break;
      default:
        break;
    }
  }

});

export default DetailStore;
