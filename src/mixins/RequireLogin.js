'use strict';
import UserStore from '../stores/UserStore';
import AppStore from '../stores/AppStore';
import router from '../router';
import AppAction from '../actions/AppActions';

const RequireLogin = {

  //if not logged in redirect to home
  componentWillMount: function() {
    console.log(window.location.pathname);
    if(!UserStore.getUserData()){
      //alert("请先登陆～");
      //redirect to previous location
      AppAction.needLogin(window.location.hash.substr(1));
    }
  }
};

export default RequireLogin;
