'use strict';
import request from 'superagent';
import UserActions from '../actions/UserActions';
const UserAPIUtils = {
  register(data){
    request
      .post('http://10.60.136.39/qfplan/index.php/Home/User.json')
      .type('form')
      .send(data)
      .end(function(err,res){
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
      .get('mocklogin.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          UserActions.loginFailure(err);
        }
        else{
          UserActions.loginSuccess(res.body);
        }
      });
  },
  getSellOrders(data){
    request
      .get('/mocksellorders.json')
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          UserActions.getSellOrdersFailure(err);
        }
        else{
          UserActions.getSellOrdersSuccess(res.body);
        }
      });
  },

  applySell(data,callback){
    request
      .get('mockapplysell.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          UserActions.applySellFailure(err);
        }
        else{
          UserActions.applySellSuccess(res.body);
        }
      });
  },




};

export default UserAPIUtils;
