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
import Immutable from 'immutable';

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
let _loginMsg;
let _regMsg;
let _isRegistering;
let _isLogining;
let _section;
let _regVerify = 0;
let _loginVerify = 0;
let _needActivation = 0;

let _isForgetting;
let _forgetMsg;

let _infoMsg;
let _isInfoing;
let _submitData = Immutable.Map();

function saveUserData(){
  setTimeout(()=> {
    localStorage.setItem('userData', JSON.stringify(_userData));
  }, 0);
}


const UserStore = assign({}, EventEmitter.prototype, {


  getPhone(){
    return _userData.telephone;
  },
  getAli(){
    return _userData.alipay;
  },
  getForgetMsg(){
    return _forgetMsg;
  },

  getIsForgetting(){
    return _isForgetting;
  },

  getIsInfoing(){
    return _isInfoing;
  },
  getInfoMsg(){
    return _infoMsg;
  },
  getSubmitData(){
    return _submitData;
  },


  getUserName(){
    return _userData?_userData.nickname:'';
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
          if(_userData.telephone==='00000000000'){
            _userData.telephone = '';
          }
          saveUserData();
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
      case UserConstants.CHANGE_INFO_SUBMIT:
        _isInfoing = true;
        _infoMsg = '';
        UserStore.emitChange();
        break;

      case UserConstants.CHANGE_INFO_FAILURE:
        _infoMsg = '啊哦，网络出错辣！';
        _isInfoing = false;
        UserStore.emitChange();
        break;
      case UserConstants.CHANGE_INFO_SUCCESS:
        if(action.data.Code ===0){
          _submitData.map((v,k)=>{
            _userData[k] = v;
          });
          _submitData = _submitData.clear();
          _infoMsg = '';
          saveUserData();
        }
        else{
          _infoMsg = action.data.Msg;
        }
        _isInfoing = false;
        UserStore.emitChange();
        break;

      case UserConstants.FIND_PASSWORD_SUBMIT:
        _isForgetting = true;
        _forgetMsg = '';
        UserStore.emitChange();
        break;

      case UserConstants.FIND_PASSWORD_FAILURE:
        _forgetMsg = '啊哦，网络出错辣！';
        _isForgetting = false;
        UserStore.emitChange();
        break;
      case UserConstants.FIND_PASSWORD_SUCCESS:
        _forgetMsg = action.data.Msg;
        _isForgetting = false;
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
      case AppConstants.NEED_LOGIN:
        _userData = null;
        UserStore.emitChange();
        localStorage.setItem('userData', '');
        break;

      case UserConstants.ADD_TO_SUBMIT:
        _submitData = _submitData.set(action.key, action.value);
        UserStore.emitChange();
        break;
      default:
        break;
    }
  }

});

export default UserStore;
