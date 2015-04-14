import UserStore from '../stores/UserStore';
import AppStore from '../stores/AppStore';
import router from '../router';


const RequireLogin = {

  //if not logged in redirect to home
  componentWillMount: function() {
    console.log('heheh');
    console.log(AppStore.getTransition());

    if(!UserStore.getUserData()){
      //alert("请先登陆～");

      router.transitionTo('home');
    }
  }
};

export default RequireLogin;
