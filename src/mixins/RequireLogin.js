import UserStore from '../stores/UserStore';
import router from '../router';


const RequireLogin = {

  //if not logged in redirect to home
  componentWillMount: function() {
    console.log('heheh');
    if(!UserStore.getUserData()){
      //alert("请先登陆～");
      router.transitionTo('home');
    }
  }
};

export default RequireLogin;
