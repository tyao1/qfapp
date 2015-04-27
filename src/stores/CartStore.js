'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import CartConstants from '../constants/CartConstants';

import UserActions from '../actions/UserActions';
import CartActions from '../actions/CartActions';
import AppActions from '../actions/AppActions';
import NotificationActions from '../actions/NotificationActions';
import AppStore from '../stores/AppStore';

import UserStore from '../stores/UserStore';
import CartAPIUtils from '../utils/CartAPIUtils';
import Immutable from 'immutable';

import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'CHANGE_CartStore';



let _isSubmitting = false;
let _success = false;
let _submitMsg = '';

/*
= Immutable.fromJS({
 a123: {
     type_id: '书籍',
     name: '论演员的自我修养',
     num: 1,
     max: 3,
     price: 7.0,
     nickname: '没名字能用了啊',
     path: ''
   },
 b123: {
     type_id: '书籍',
     name: '论演员的自我修养',
     num: 1,
     max: 3,
     price: 3.0,
     nickname: '没名字能用了啊',
     path: ''
   }
 }
 );
 */
let _items = Immutable.Map();
const localdata = localStorage.getItem('items');
if(localdata)
{
  if(localdata!==''&&localdata!=='undefined'){
    _items = Immutable.fromJS(JSON.stringify(localdata));
  }
}

/*
 *
 * 回撤物品操作
 *
 */
function reverseAdd(id){
  if(_items.get(id)){
    _items = _items.delete(id);
  }
}
function reverseDelete(id, data){
  if(!_items.get(id)){
    _items = _items.set(id, data);
  }
}



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
          _items = _items.clear();
        }
        else if(action.data.Code === 1007){
          AppActions.needLogin(AppStore.getTransition().path);
        }
        else{
          _submitMsg = action.data.Msg;
        }
        _isSubmitting = false;
        CartStore.emitChange();
        break;
      case CartConstants.CART_ADD_FAILURE:
        //物品添加失败，回撤操作
        //发出提醒
        reverseAdd(action.data.goods_id);
        CartStore.emitChange();
        setTimeout(()=>{
          NotificationActions.addNotification(
            `添加失败，${action.data.backup.name}：网络错误`
          );
        });
        break;
      case CartConstants.CART_ADD_SUCCESS:
        if(action.data.body.Code!==0){
          //失败
          reverseAdd(action.data.goods_id);
          setTimeout(()=>{
            NotificationActions.addNotification(
              `添加失败，${action.data.backup.name}：${action.data.body.Msg}`
            );
          });
          CartStore.emitChange();
        }
        break;
      case CartConstants.DELETE_ITEM_FAILURE:
        //物品删除失败，回撤操作
        //发出提醒
        reverseDelete(action.data.goods_id, action.data.backup);
        CartStore.emitChange();
        setTimeout(()=>{
          NotificationActions.addNotification(
            `删除失败，${action.data.backup.name}：网络错误`
          );
        });
        break;
      case CartConstants.DELETE_ITEM_SUCCESS:
        if(action.data.body.Code!==0){
          //失败
          reverseDelete(action.data.goods_id, action.data.backup);
          setTimeout(()=>{
            NotificationActions.addNotification(
              `删除失败，${action.data.backup.get('name')}：${action.data.body.Msg}`
            );
          });
          CartStore.emitChange();
        }
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
        _items = _items.updateIn([action.data.goods_id, 'num'], val => action.data.num);
        CartStore.emitChange();
        break;
      case CartConstants.DELETE_ITEM:
        const deleteId = action.data.goods_id;
        const deleteItem = _items.get(deleteId);
        _items = _items.delete(deleteId);
        CartStore.emitChange();
        CartAPIUtils.deleteItem(deleteId, deleteItem);
        break;
      case CartConstants.CART_ADD:
        const item = action.data;
        console.log('item', item);
        //检查用户名是否为卖家
        const username = UserStore.getUserName();
        if(username===item.nickname)
        {
          setTimeout(()=>{
            NotificationActions.addNotification(
              `不能购买自己的物品额=。=`
            );
          });
          return;
        }
        const checkItem = _items.get(item.goods_id);
        if(checkItem){
          //该物品已经在购物车，增加数量
          const max = checkItem.get('max');
          let num = checkItem.get('num');
          num = num===max?max:num+1;
          action.data.num = num;
          _items = _items.set(item.goods_id, action.data);
          //_items = _items.updateIn([action.data.id, 'num'], val => (val===max?max:val+1));
        }
        else{
          const {goods_id, type_id, name, quality, price, nickname, path, num} = item;
          const newItem = {
            goods_id,
            type_id,
            name,
            num,
            quality,
            price,
            nickname,
            path
          };
          _items = _items.set(item.goods_id, Immutable.fromJS(newItem));
          //直接调用api请求吧！
          CartAPIUtils.addItem(item.goods_id, item);
        }
        CartStore.emitChange();
        break;
      case AppConstants.NEED_LOGIN:
          _items = _items.clear();
          CartStore.emitChange();
          localStorage.setItem('items', '');
          break;
      default:
        break;
    }
  }

});

export default CartStore;
