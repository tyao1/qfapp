'use strict';

import Dispatcher from '../core/Dispatcher';
import UserConstants from '../constants/UserConstants';

import UserAPIUtils from '../utils/UserAPIUtils';

export default {

  /*
   * 注册
   */
  register(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.REG_SUBMIT,
      data
    });
    UserAPIUtils.register(data);
  },
  register_failure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.REG_FAILURE,
      data
    });
  },
  register_success(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.REG_SUCCESS,
      data
    });
  },

  login(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.LOGIN_SUBMIT,
      data
    });
    UserAPIUtils.register(data);
  },
  login_failure(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.LOGIN_FAILURE,
      data
    });
  },
  login_success(data){
    Dispatcher.handleServerAction({
      actionType: UserConstants.LOGIN_SUCCESS,
      data
    });
  }

};
