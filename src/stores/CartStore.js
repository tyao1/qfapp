'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import CartConstants from '../constants/CartConstants';
import NotificationActions from '../actions/NotificationActions';
import CartActions from '../actions/CartActions';
import UserStore from '../stores/UserStore';
import CartAPIUtils from '../utils/CartAPIUtils';

import Immutable from 'immutable';
import UserConstants from '../constants/UserConstants';
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
*/
let _items = Immutable.OrderedMap();

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

function reverseNum(id, num){
  if(_items.get(id)){
    _items = _items.updateIn([id, 'num'], () => num);
  }
}

function updateItemAndEmit(Info){
  console.log('updateitemandemit',Info);
  if(Info)
  {
    let {goods_id, quality, nickname, price} = Info;
    goods_id = parseInt(goods_id);
    quality = parseInt(quality);
    price = parseFloat(price);

    _items = _items.updateIn([goods_id, 'quality'], () => quality);
    _items = _items.updateIn([goods_id, 'price'], () => price);
    _items = _items.updateIn([goods_id, 'nickname'], () => nickname);
    CartStore.emitChange();
  }
}


const CartStore = assign({}, EventEmitter.prototype, {
  init(){
    CartAPIUtils.fetchCarts();
  },
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
        if (action.data.body.Code === 0) {
          //handle storeitems change
          _success = true;
          _items = _items.clear();
        }
        else{
          _submitMsg = action.data.Msg;
        }
        _isSubmitting = false;
        CartStore.emitChange();
        break;

      case CartConstants.CART_ADD_FAILURE:
        reverseAdd(action.data.goods_id);
        CartStore.emitChange();
        setTimeout(()=>{
          NotificationActions.addNotification(
            `添加失败，${action.data.backup.name}：网络错误`
          );
        });
        break;

      case CartConstants.CART_ADD_SUCCESS:
        if(action.data.body.Code!==0&&action.data.body.Code!==1007){

          reverseAdd(action.data.goods_id);
          setTimeout(()=>{
            NotificationActions.addNotification(
              `添加失败，${action.data.backup.name}：${action.data.body.Msg}`
            );
          });
          CartStore.emitChange();

        }
        else{
          updateItemAndEmit(action.data.body.Info);
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
        //不需要操作
        break;

      case CartConstants.CHANGE_NUM_FAILURE:
        reverseNum(action.data.goods_id, action.data.backup);
        CartStore.emitChange();
        setTimeout(()=>{
          NotificationActions.addNotification(
            `更改数量失败：网络错误`
          );
        });
        break;

      case CartConstants.CHANGE_NUM_SUCCESS:
        const cartCode = action.data.body.Code;
        if(cartCode!==0&&cartCode!==1007){
          if(cartCode===1048){
            setTimeout(()=>{
              NotificationActions.addNotification(
                `更改数量失败：${action.data.body.Msg}`
              );
            });
            reverseNum(action.data.goods_id, action.data.backup);
            updateItemAndEmit(action.data.body.Info);
          }
          else
          {
            if(cartCode===1016||cartCode===1017){
              _items = _items.delete(action.data.goods_id);
            }
            else{
              reverseNum(action.data.goods_id, action.data.backup);
            }
            setTimeout(()=>{
              NotificationActions.addNotification(
                `更改数量失败${action.data.backup.name}：${action.data.body.Msg}`
              );
            });
            CartStore.emitChange();
          }
        }
        else{
          updateItemAndEmit(action.data.body.Info);
        }
        break;

      case CartConstants.CART_FETCH_SUCCESS:
        if(action.data.body.Code===0||action.data.body.Code===1007){
          if(action.data.body.Info) {
            let car = action.data.body.Info.car;
            if (car) {
              car.forEach(data=> {
                data.goods_id = parseInt(data.goods_id);
                data.quality = parseInt(data.quality);
                data.price = parseFloat(data.price);
                data.status = parseInt(data.status);
                data.t_limit = parseInt(data.t_limit);
                data.user_id = parseInt(data.user_id);
                _items = _items.set(data.goods_id, Immutable.fromJS(data));
              });

            }
            if (action.data.body.Info.tokenOff) {
              setTimeout(()=> {
                NotificationActions.addNotification(
                  `您的购物车中有${action.data.body.Info.tokenOff}件物品因下架或售完已被移除`
                );
              });
            }
          }
        }
        else{
          NotificationActions.addNotification(
            action.data.body.Info.Msg
          );
        }
        CartStore.emitChange();
        break;

      case CartConstants.CART_FETCH_FAILURE:
        setTimeout(()=>{
          NotificationActions.addNotification(
            '获取购物车失败，网络错误'
          );
        });
        CartStore.emitChange();
        break;

      case UserConstants.LOGIN_SUCCESS:
        _items = _items.clear();
        CartStore.init();
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
        const changeId = action.data.goods_id;
        let number;
        _items = _items.updateIn([changeId, 'num'], val =>{
          number = val;
          return action.data.num
        });
        CartAPIUtils.changeNum(changeId, action.data.num, number);
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

        if(UserStore.getUserName()===item.nickname)
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
          const quality = checkItem.get('quality');
          let num = checkItem.get('num');
          num = num===quality?quality:num+1;
          action.data.num = num;
          //更改数量Action
          //TODO setTimeout(()=>{
          CartActions.changeNum(action.data);
          //});

          //_items = _items.set(item.goods_id, action.data);
          //_items = _items.updateIn([action.data.id, 'num'], val => (val===max?max:val+1));
        }
        else{
          const {goods_id, type_id, name, price, nickname, path, num, quality} = item;
          const newItem = {
            goods_id,
            type_id,
            name,
            num,
            quality: quality||1,
            price,
            nickname,
            path
          };
          _items = _items.set(goods_id, Immutable.fromJS(newItem));
          //直接调用api请求吧！
          CartAPIUtils.addItem(goods_id, 1,item);
        }
        CartStore.emitChange();
        break;
      case AppConstants.NEED_LOGIN:
        console.log('need login and clear');
        _items = _items.clear();
        CartStore.init();
        CartStore.emitChange();
        break;
      default:
        break;
    }
  }

});

CartStore.init();



export default CartStore;
