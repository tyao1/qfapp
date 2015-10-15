'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

import OrderAPIUtils from '../utils/OrderAPIUtils';
import OrderConstants from '../constants/OrderConstants';
import Immutable from 'immutable';
import AppConstants from '../constants/AppConstants';
import router from '../router';

import AppStore from '../stores/AppStore';

const CHANGE_EVENT = 'CHANGE_OrderStore';

let _items = Immutable.Map();
let _success= false;
let _isSubmitting = false;
let _submitMsg ='';

let options = {};
options[OrderConstants.ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/buy'
};
options[OrderConstants.APPLY_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/apply'
};
options[OrderConstants.ON_SALE_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/sell'
};
options[OrderConstants.OFF_SALE_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/end'
};
options[OrderConstants.C2C_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/buyc2c'
};
options[OrderConstants.C2C_APPLY_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/applyc2c'
};
options[OrderConstants.C2C2_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/buyc2c2'
};
options[OrderConstants.C2C2_APPLY_ORDER_KEY] = {
  page: 1,
  status: 0,
  failMsg: '',
  path: '/my/applyc2c2'
};

let _curKey = OrderConstants.ORDER_KEY;
let _updatingPrice = false;
let _msgPrice = '';
let _successPrice = false;


function updateFromQuery(key, query){
  _curKey = key;
  options[_curKey].page = (query.p>0?query.p:1) || 1;
  options[_curKey].status = query.t || 0;
  options[_curKey].failMsg ='';
}

function trans(key){
  let status = options[_curKey].status;
  let path = options[_curKey].path;
  let page = options[_curKey].page;
  if(status){
    router.transitionTo(path, null, {
      t: status,
      p: page||1
    });
  }
  else{
    router.transitionTo(path, null, {
      p: page||1
    });
  }
}


function cleanCache(key, second = 30){
  setTimeout(()=>{_items = _items.delete(key); }, 1000 * second);
}
function getItems(keyword) {
  let page = options[keyword].page;
  let status = options[keyword].status;
  let item = _items.get(OrderAPIUtils.Id(keyword, status, page));
  if (!item) {
    _items = _items.set(OrderAPIUtils.Id(keyword, status, page), OrderConstants.ORDER_KEY_NULL);
    OrderAPIUtils.getItems(keyword, status, page);
    return OrderConstants.ORDER_KEY_NULL;
  }
  else{
    return item;
  }
}

function refresh(keyword){
  let status = options[keyword].status;
  let page = options[keyword].page;
  let item = _items.get(OrderAPIUtils.Id(keyword, status, page));
  //if (!item || item === OrderConstants.PAGE_KEY_FAILURE) {
    _items = _items.set(OrderAPIUtils.Id(keyword, status, page), OrderConstants.ORDER_KEY_NULL);
    OrderAPIUtils.getItems(keyword, status, page);
  //}
}

function processSuccessAction(action, key, process){
  if(action.data.body.Code===0){
    let items = action.data.body.Info;
    if(items) {
      items.forEach(data=> {
        process(data);
      });
    }
    else{
      items = [];
    }
    _items = _items.set(action.data.key, items);
    cleanCache(action.data.key);
  }
  else{
    _items = _items.set(action.data.key, OrderConstants.ORDER_KEY_FAILURE);
    options[key].failMsg = action.data.body.Msg;
  }
  //OrderStore.emitChange();
}

function processFailureAction(action, key){
  _items = _items.set(action.data.key, OrderConstants.ORDER_KEY_FAILURE);
  options[key].failMsg = '网络错误';
}




const OrderStore = assign({}, EventEmitter.prototype, {
  getUpdatingPrice(){
    return _updatingPrice;
  },
  getMsgPrice(){
    return _msgPrice;
  },
  getSuccessPrice(){
    return _successPrice;
  },

  getSubmitMsg(){
    return _submitMsg;
  },
  getSuccess(){
    return _success;
  },
  getIsSubmitting(){
    return _isSubmitting;
  },
  getOptions(){
    return options;
  },
  getKey(){
    return _curKey;
  },
  getStatus(key = _curKey){
    return options[key].status;
  },
  getPage(key = _curKey){
    return parseInt(options[key].page);
  },

  getFailMsg(key = _curKey){
    return options[key].failMsg;
  },

  getItems(key = _curKey){
    return getItems(key);
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

OrderStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case OrderConstants.ORDER_SUCCESS:
        //买家
        processSuccessAction(action, OrderConstants.ORDER_KEY, (data)=> {
          data.time = parseInt(data.time) * 1000;
          data.f_time = parseInt(data.f_time) * 1000;
          data.detail.forEach(item =>{
            item.price = parseFloat(item.price);
          });
        });
        OrderStore.emitChange();
        break;
      case OrderConstants.APPLY_ORDER_SUCCESS:
        //卖家申请
        processSuccessAction(action, OrderConstants.APPLY_ORDER_KEY, (data)=> {
          data.time = parseInt(data.time) * 1000;
          data.detail.forEach(item =>{
            item.price = parseFloat(item.price);
            item.limit_time = parseInt(item.limit_time) * 1000;
          });
        });
        OrderStore.emitChange();
        break;

      case OrderConstants.ON_SALE_ORDER_SUCCESS:
        //卖家在线订单
        processSuccessAction(action, OrderConstants.ON_SALE_ORDER_KEY, (data)=>{
          data.goods_id = parseInt(data.goods_id);
          if(data.img&&data.img.length) {
            data.path = data.img[0].path;
          }
          data.price = parseFloat(data.price);
          data.start_time = parseInt(data.start_time)  * 1000;
          data.limit_time = parseInt(data.limit_time) * 1000;
        });

        OrderStore.emitChange();
        break;

      case OrderConstants.OFF_SALE_ORDER_SUCCESS:
        //卖家下线订单
        processSuccessAction(action, OrderConstants.OFF_SALE_ORDER_KEY, (data)=>{
          data.goods_id = parseInt(data.goods_id);
          if(data.img&&data.img.length) {
            data.path = data.img[0].path;
          }
          data.price = parseFloat(data.price);
          data.start_time = parseInt(data.start_time)  * 1000;
          data.t_time = parseInt(data.t_time) * 1000;
          data.limit_time = parseInt(data.limit_time) * 1000;
          data.pay = data.is_pay!=='N';
        });

        OrderStore.emitChange();
        break;

      case OrderConstants.C2C_ORDER_SUCCESS:
        //买家
        processSuccessAction(action, OrderConstants.C2C_ORDER_KEY, (data)=> {
          data.time = parseInt(data.time) * 1000;
          data.f_time = parseInt(data.f_time) * 1000;
          data.detail.forEach(item =>{
            item.price = parseFloat(item.price);
          });
        });
        OrderStore.emitChange();
        break;

      case OrderConstants.C2C_APPLY_ORDER_SUCCESS:
        //买家
        processSuccessAction(action, OrderConstants.C2C_APPLY_ORDER_KEY, (data)=> {
          data.time = parseInt(data.time) * 1000;
          data.f_time = parseInt(data.f_time) * 1000;
          data.detail.forEach(item =>{
            item.price = parseFloat(item.price);
          });
        });
        OrderStore.emitChange();
        break;

      case OrderConstants.ORDER_FAILURE:
        processFailureAction(action, OrderConstants.ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.APPLY_ORDER_FAILURE:
        processFailureAction(OrderConstants.APPLY_ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.ON_SALE_ORDER_FAILURE:
        processFailureAction(OrderConstants.ON_SALE_ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.OFF_SALE_ORDER_FAILURE:
        processFailureAction(OrderConstants.OFF_SALE_ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.C2C_ORDER_FAILURE:
        processFailureAction(OrderConstants.C2C_ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.C2C_APPLY_ORDER_FAILURE:
        processFailureAction(OrderConstants.C2C_APPLY_ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.C2C2_ORDER_FAILURE:
        processFailureAction(OrderConstants.C2C2_ORDER_KEY);
        OrderStore.emitChange();
        break;
      case OrderConstants.C2C2_APPLY_ORDER_FAILURE:
        processFailureAction(OrderConstants.C2C2_APPLY_ORDER_KEY);
        OrderStore.emitChange();
        break;

      case OrderConstants.CANCEL_ORDER_SUBMIT:
        _isSubmitting = true;
        _success = false;
        _submitMsg = '';
        OrderStore.emitChange();
        break;

      case OrderConstants.CANCEL_ORDER_FAILURE:
        _submitMsg = '啊哦，网络出错辣！';
        _isSubmitting = false;
        OrderStore.emitChange();
        break;

      case OrderConstants.CANCEL_ORDER_SUCCESS:
        if (action.data.body.Code === 0) {
          _success = true;
        }
        else{
          _submitMsg = action.data.body.Msg;
        }
        _isSubmitting = false;
        refresh(_curKey);
        OrderStore.emitChange();
        break;

      case OrderConstants.UPDATE_PRICE:
        _msgPrice = '';
        _successPrice = false;
        _updatingPrice = true;
        OrderStore.emitChange();
        break;
      case OrderConstants.UPDATE_PRICE_FAILURE:
        _updatingPrice = false;
        _successPrice = false;
        _msgPrice = '网络错误 >.<';
        OrderStore.emitChange();
        break;
      case OrderConstants.UPDATE_PRICE_SUCCESS:
        _updatingPrice = false;
        if(action.data.body.Code ===0){
          _successPrice = true;

          //先触发一次成功,再刷新当前页面
          OrderStore.emitChange();
          _items = Immutable.Map();

          //let {id, price} = action.data;
          //_items = _items.updateIn([id, 'price'], () => price);
        }
        else{
          _successPrice = false;
          _msgPrice = action.data.body.Msg;
          console.log(action.data.body);
        }
        OrderStore.emitChange();
        break;

      default:
      // Do nothing

    }
  }
  else{
    switch (action.actionType) {
      case AppConstants.TRANSITION:
        console.log('order store', action.data);
        if(action.data.path){
          switch(action.data.pathname){
            case '/my/buy':
              updateFromQuery(OrderConstants.ORDER_KEY, action.data.query, '/my/buy');
              OrderStore.emitChange();
              break;
            case '/my/apply':
              updateFromQuery(OrderConstants.APPLY_ORDER_KEY, action.data.query, '/my/apply');
              OrderStore.emitChange();
              break;
            case '/my/sell':
              updateFromQuery(OrderConstants.ON_SALE_ORDER_KEY, action.data.query, '/my/sell');
              OrderStore.emitChange();
              break;
            case '/my/end':
              updateFromQuery(OrderConstants.OFF_SALE_ORDER_KEY, action.data.query, '/my/end');
              OrderStore.emitChange();
              break;
            case '/my/buyc2c':
              updateFromQuery(OrderConstants.C2C_ORDER_KEY, action.data.query, '/my/buyc2c');
              OrderStore.emitChange();
              break;
            case '/my/sellc2c':
              updateFromQuery(OrderConstants.C2C_APPLY_ORDER_KEY, action.data.query, '/my/sellc2c');
              OrderStore.emitChange();
              break;
            case '/my/buyc2c2':
              updateFromQuery(OrderConstants.C2C2_ORDER_KEY, action.data.query, '/my/buyc2c2');
              OrderStore.emitChange();
              break;
            case '/my/sellc2c2':
              updateFromQuery(OrderConstants.C2C2_APPLY_ORDER_KEY, action.data.query, '/my/sellc2c2');
              OrderStore.emitChange();
              break;
          }
        }

        break;

      case OrderConstants.ORDER_CHANGE_ORDER:
        let key1 = action.key || _curKey;
        options[key1].page = action.page>0?action.page:1;
        trans(key1);
        break;

      case OrderConstants.ORDER_CHANGE_TYPE:
        let key2 = action.key || _curKey;
        options[key2].status = action.status;
        options[key2].page = 1;
        trans(key2);
        break;

      case OrderConstants.ORDER_REFRESH:
        let key3 = action.key || _curKey;
        refresh(key3);
        OrderStore.emitChange();
        break;

      case OrderConstants.CANCEL_ORDER_NEW:
        _submitMsg = '';
        _success = false;
        _isSubmitting = false;
        OrderStore.emitChange();
        break;
      default:
        break;
      //
    }

  }
});

export default OrderStore;
