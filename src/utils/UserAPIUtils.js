'use strict';
import request from 'superagent';
import UserActions from '../actions/UserActions';
const UserAPIUtils = {
  register(data){
    request
      .post('http://10.60.136.39/index.php/Home/User.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          UserActions.registerFailure(err);
        }
        else{
          UserActions.registerSuccess(res.body);
        }
      });
  },
  login(data){
    request
      .post('http://10.60.136.39/index.php/Home/Login.json')  //SHOULD BE POST //.get('mocklogin.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          UserActions.loginFailure(err);
        }
        else{
          UserActions.loginSuccess(res.body);
        }
      });
  },
  logout(data){

    //request
    //  .get('http://10.60.136.39/index.php/Home/LogOut.json')  //SHOULD BE POST //.get('mocklogin.json')
    //  .end(function(err, res){
        /*if(err){
          UserActions.loginFailure(err);
        }
        else{
          UserActions.loginSuccess(res.body);
        }*/
    //  });
  },
  getSellOrders(data){
    request
      .get('/mocksellorders.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          UserActions.getSellOrdersFailure(err);
        }
        else{
          UserActions.getSellOrdersSuccess(res.body);
        }
      });
  },

  applySell(data){
    request
      .post('http://10.60.136.39/index.php/Manager/Application.json')  //SHOULD BE POST //.get('mockapplysell.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          UserActions.applySellFailure(err);
        }
        else{
          UserActions.applySellSuccess(res.body);
        }
      });
  }


};

export default UserAPIUtils;
