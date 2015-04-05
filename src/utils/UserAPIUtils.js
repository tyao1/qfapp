'use strict';
import request from 'superagent';
import UserAction from '../actions/UserAction';
const UserAPIUtils = {
  register(data,callback){
    request
      .post('Home/User.json')
      .send(data)
      .end(function(err,res){
        if(err){
          UserAction.register_failure(err);
        }
        else{
          UserAction.register_success(res);
        }
      });
  }

};

export default UserAPIUtils;
