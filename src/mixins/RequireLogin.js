'use strict';
import UserStore from '../stores/UserStore';

import AppAction from '../actions/AppActions';
import NotificationActions from '../actions/NotificationActions';

const RequireLogin = {
  statics: {willTransitionTo(transition, params){
    if(!UserStore.getUserData()){
      //alert(transition.path);
      AppAction.needLogin(transition.path);
      transition.redirect('/');
      NotificationActions.addNotification('啊哦，需要登陆了～');
    }
  }}

};

export default RequireLogin;
