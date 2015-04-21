'use strict';
import request from 'superagent';
import UserAction from '../actions/UserAction';
const UserAPIUtils = {
  register(data,callback){
    request
      .post('http://10.60.136.39/qfplan/index.php/Home/User.json')
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.registerFailure(err);
        }
        else{
          UserAction.registerSuccess(res.body);
        }
      });
  },
  login(data,callback){
    request
      .get('mocklogin.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.loginFailure(err);
        }
        else{
          UserAction.loginSuccess(res.body);
        }
      });
  },
  getSellOrders(data,callback){
    request
      .get('/mocksellorders.json')
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.getSellOrdersFailure(err);
        }
        else{
          UserAction.getSellOrdersSuccess(res.body);
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
          UserAction.applySellFailure(err);
        }
        else{
          UserAction.applySellSuccess(res.body);
        }
      });
  },




};

export default UserAPIUtils;
