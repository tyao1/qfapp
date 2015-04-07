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
          UserAction.register_failure(err);
        }
        else{
          UserAction.register_success(JSON.parse(res.text));
        }
      });
  },
  login(data,callback){
    request
      .get('/mocklogin.json')  //SHOULD BE POST
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.register_failure(err);
        }
        else{
          UserAction.register_success(JSON.parse(res.text));
        }
      });
  }

};

export default UserAPIUtils;