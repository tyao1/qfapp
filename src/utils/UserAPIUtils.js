'use strict';
import request from 'superagent';
import UserAction from '../actions/UserAction';
const UserAPIUtils = {
  register(data,callback){
    request
      .get('/mockregister.json')  //SHOULD BE POST
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.registerFailure(err);
        }
        else{
          UserAction.registerSuccess(JSON.parse(res.text));
        }
      });
  },
  login(data,callback){
    request
      .get('/mocklogin.json')  //SHOULD BE POST
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.loginFailure(err);
        }
        else{
          UserAction.loginSuccess(JSON.parse(res.text));
        }
      });
  },
  getSellOrders(data,callback){
    request
      .get('/mocksellorders.json')
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.getSellOrdersFailure(err);
        }
        else{
          UserAction.getSellOrdersSuccess(JSON.parse(res.text));
        }
      });
  }

};

export default UserAPIUtils;
