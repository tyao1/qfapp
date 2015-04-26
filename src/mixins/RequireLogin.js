'use strict';
import UserStore from '../stores/UserStore';

import AppAction from '../actions/AppActions';
import NotificationActions from '../actions/NotificationActions';

const RequireLogin = {
  statics: {willTransitionTo(transition, params){
    console.log(window.location.pathname, transition, params);
    if(!UserStore.getUserData()){
      AppAction.needLogin(transition.path);
      NotificationActions.addNotification('啊哦，需要登陆了～');
    }
  }},

};

export default RequireLogin;
