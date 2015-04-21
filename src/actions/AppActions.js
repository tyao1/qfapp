'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import http from 'superagent';

import AppConstants from '../constants/AppConstants.js';

export default {

  loadHome(){
    Dispatcher.handleViewAction({
      actionType: AppConstants.LOAD_HOME
    });
  },
  leaveHome(){
    Dispatcher.handleViewAction({
      actionType: AppConstants.LEAVE_HOME
    });
  },
  transition(data){
    Dispatcher.handleViewAction({
      actionType: AppConstants.TRANSITION,
      data
    });
  },
  needLogin(data){
    Dispatcher.handleViewAction({
      actionType: AppConstants.NEED_LOGIN,
      data
    });
  }

};
