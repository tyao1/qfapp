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
  navigateTo(path, options) {
    if (ExecutionEnvironment.canUseDOM) {
      if (options && options.replace) {
        window.history.replaceState({}, document.title, path);
      } else {
        window.history.pushState({}, document.title, path);
      }
    }

    Dispatcher.handleViewAction({
      actionType: ActionTypes.CHANGE_LOCATION,
      path
    });
  },

  loadPage(path, cb) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.LOAD_PAGE,
      path
    });

    http.get('/api/page' + path)
      .accept('application/json')
      .end((err, res) => {
        Dispatcher.handleServerAction({
          actionType: ActionTypes.LOAD_PAGE,
          path,
          err,
          page: res.body
        });
        if (cb) {
          cb();
        }
      });
  }

};
