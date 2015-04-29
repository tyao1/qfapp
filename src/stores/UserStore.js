'use strict';

import Dispatcher from '../core/Dispatcher';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import UserConstants from '../constants/UserConstants';

import UserAPIUtils from '../utils/UserAPIUtils';
import AppConstants from '../constants/AppConstants';
import CartConstants from '../constants/CartConstants';
import AppStore from './AppStore';
import router from '../router';


const CHANGE_EVENT = 'CHANGE_UserStore';


//安全获取data
const localdata = localStorage.getItem('userData');

let _userData;
if(localdata)
{
  if(localdata!==''&&localdata!=='undefined'){
    _userData = JSON.parse(localdata);
  }
}
console.log(_userData);
let _loginMsg;
let _regMsg;
let _isRegistering;
let _isLogining;
let _section;
let _regVerify = 0;
let _loginVerify = 0;
let _needActivation = 0;

const UserStore = assign({}, EventEmitter.prototype, {
  cache: {},

  getUserName(){
    return _userData.nickname;
  },
  getUserData(){
    return _userData;
  },

  getRegMsg(){
    return _regMsg;
  },

  getLoginMsg(){
    return _loginMsg;
  },

  getIsRegistering(){
    return _isRegistering;
  },

  getIsLogining(){
    return _isLogining;
  },

  getRegVerify(){
    return _regVerify;
  },

  getLoginVerify(){
    return _loginVerify;
  },

  getNeedActivation(){
    return _needActivation;
  },

  getSellOrders() {
    if (!this.cache[UserConstants.SELL_ORDERS_KEY]) {
      //开始异步获取数据
      UserAPIUtils.getSellOrders();
      //设置无内容标志
      this.cache[UserConstants.SELL_ORDERS_KEY] = UserConstants.SELL_ORDERS_NULL;
      setTimeout(()=>{this.cache[UserConstants.SELL_ORDERS_KEY] = null; }, 5000);//cache for 5 sec
    }
    return this.cache[UserConstants.SELL_ORDERS_KEY];


  },
  getSection(){
    return _section;
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

UserStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;
  if(payload.source==='SERVER_ACTION')
  {
    switch (action.actionType) {
      case UserConstants.SELL_ORDERS_SUCCESS:
        UserStore.cache[UserConstants.SELL_ORDERS_KEY] = action.data;
        UserStore.emitChange();
        break;
      case UserConstants.SELL_ORDERS_FAILURE:
        UserStore.emitChange();
        break;


      case UserConstants.REG_SUBMIT:
        _isRegistering = true;
        UserStore.emitChange();
        break;

      case UserConstants.REG_FAILURE:
        _regMsg = '啊哦，网络出错辣！';
        _isRegistering = false;
        _regVerify++;
        UserStore.emitChange();
        break;

      case UserConstants.REG_SUCCESS:
        if (action.data.Code === 0) {
          //成功
          _needActivation = true;
        }
        else{
          _regMsg = action.data.Msg;
          _regVerify++;
        }
        _isRegistering = false;
        UserStore.emitChange();
        break;

      case UserConstants.LOGIN_SUBMIT:
        _isLogining = true;
        UserStore.emitChange();
        break;

      case UserConstants.LOGIN_FAILURE:
        _loginMsg = '啊哦，网络出错辣！';
        _isLogining = false;
        UserStore.emitChange();
        break;
      case UserConstants.LOGIN_SUCCESS:
        if (action.data.Code === 0) {
          //需要重定向??
          _loginMsg = ''; //登录成功！
          let trans = AppStore.getToTrans();
          if(trans)
          {
            router.transitionTo(trans);
          }
          _userData = action.data.Info;
          setTimeout(()=> {
            localStorage.setItem('userData', JSON.stringify(_userData));
          }, 0);
        }
        else{
          _loginMsg = action.data.Msg;
          if(action.data.Code === 1004 || action.data.Code === 1005 && action.data.Info){
            _loginVerify++;
          }
        }
        _isLogining = false;
        UserStore.emitChange();
        break;

      default:
      // Do nothing

    }
  }
  else
  {
    switch (action.actionType){
      case AppConstants.TRANSITION:
        console.log(action.data);
        if(action.data.path&&action.data.path.indexOf('/my')>=0)
        {
          _section = action.data.params.section;
          UserStore.emitChange();
        }
        break;
      case UserConstants.REFRESH_REGV:
          _regVerify++;
          UserStore.emitChange();
        break;
      case UserConstants.REFRESH_LOGINV:
          _loginVerify++;
          UserStore.emitChange();
        break;
      //TODO 这里和APP重复了
      case AppConstants.NEED_LOGIN:
          _userData = null;
          UserStore.emitChange();
          localStorage.setItem('userData', '');
        break;
      default:
        break;
    }
  }

});

export default UserStore;
