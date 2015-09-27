'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';
import Immutable from 'immutable';


const CHANGE_EVENT = 'CHANGE_SellStore';


let _isSubmitting = false;
let _submitMsg = '';
let _success = false;





let _items = Immutable.OrderedMap();
let _itemC2C = Immutable.fromJS({
  type_id: '110000',
  goods_name: '',
  price: '0',
  ps: '',
  sum: 1,
  timeSpan: 10,
  detail: '',
  area_id: '0101010101',
  imgs: [{src:'',path:''},{src:'',path:''},{src:'',path:''},{src:'',path:''},{src:'',path:''}]
});

let _lastId = 0;
function genNextId(){
  _lastId+= 1;
  return _lastId;
}

let fromCache = JSON.parse(localStorage.getItem('sellItems'));
for(let cache in fromCache){
  let data = fromCache[cache];
  if(_lastId<data.id){
    _lastId = data.id;
  }
  _items = _items.set(data.id, Immutable.fromJS(data));

}

let _storeTimeout;

function saveItems(remove = false){
  if(_storeTimeout){
    clearTimeout(_storeTimeout);
  }
  if(remove){
    setTimeout(()=>{
      localStorage.removeItem('sellItems');
      _storeTimeout = null;
    });
  }
  else{
    if(_items.size) {
      _storeTimeout = setTimeout(()=> {
        console.log('save item');
        localStorage.setItem('sellItems', JSON.stringify(_items.toJS()));
        _storeTimeout = null;
      }, 10000);
    }
    else{
      console.log('about to remove');
      _storeTimeout = setTimeout(()=>{
        console.log('removed');
        localStorage.removeItem('sellItems');
        _storeTimeout = null;
      });

    }
  }
}


const SellStore = assign({}, EventEmitter.prototype, {

  getItems(){
    return _items;
  },
  getItemC2C(){
    return _itemC2C;
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

SellStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case UserConstants.APPLY_SELL_SUBMIT:
        _isSubmitting = true;
        _success = false;
        _submitMsg = '';
        SellStore.emitChange();
        break;

      case UserConstants.APPLY_SELL_FAILURE:
        _submitMsg = '啊哦，网络出错辣！';
        _isSubmitting = false;
        SellStore.emitChange();
        break;
      case UserConstants.APPLY_SELL_SUCCESS:
        if (action.data.Code === 0) {
          _success = true;
          _items = _items.clear();
          saveItems(true);//删除
        }
        else if (action.data.Code === 1001) {
          _submitMsg = action.data.Msg + ',请返回检查~';
        }
        else {
          _submitMsg = action.data.Msg;
        }
        _isSubmitting = false;
        SellStore.emitChange();
        break;
      default:
      // Do nothing

    }
  }
  else{
    switch (action.actionType) {
      case UserConstants.APPLY_SELL_NEW:
        _success = false;
        _submitMsg = '';
        SellStore.emitChange();
        break;
      case UserConstants.SELL_NEW_ITEM:
        let nextId = genNextId();
        _items = _items.set(nextId,Immutable.fromJS({
          id: nextId,
          name: '',
          price: '0',
          num: 1,
          time: 5,
          detail: ''
        }));
        SellStore.emitChange();
        break;
      case UserConstants.SELL_CHANGE_DATA:
        _items = _items.updateIn([action.id, action.key], () => action.value);
        SellStore.emitChange();
        saveItems();
        break;
      case UserConstants.SELL_CHANGE_DATA_C2C:
        console.log(action);
        _itemC2C = _itemC2C.update(action.key, () => action.value);
        SellStore.emitChange();
        break;
      case UserConstants.SELL_CHANGE_IMAGE_C2C:
        console.log(action);
        _itemC2C = _itemC2C.updateIn(['imgs', action.key], () => action.value);
        SellStore.emitChange();
        break;
      case UserConstants.SELL_REMOVE_ITEM:
        _items = _items.delete(action.id);
        SellStore.emitChange();
        saveItems();
        break;

      default:
    }
  }

});

export default SellStore;
