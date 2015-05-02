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

let _curKey = OrderConstants.ORDER_KEY;

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
            item.t_limit = parseInt(item.t_limit) * 1000;
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
          data.t_limit = parseInt(data.t_limit) * 1000;
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
          data.t_limit = parseInt(data.t_limit) * 1000;
          data.pay = data.is_pay!=='N';
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
        trans(key);
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
