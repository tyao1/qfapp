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
  },

  changeInfo(data){
    request
      .put('http://10.60.136.39/index.php/Manager/UserData.json')  //SHOULD BE POST //.get('mockapplysell.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          UserActions.changeInfoFailure(err);
        }
        else{
          UserActions.changeInfoSuccess(res.body);
        }
      });
  },

  findPassword(data){
    request
      .post('http://10.60.136.39/index.php/Home/Forget.json')  //SHOULD BE POST //.get('mockapplysell.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          UserActions.findPasswordFailure(err);
        }
        else{
          UserActions.findPasswordSuccess(res.body);
        }
      });
  },
  logout(){
    request
      .put('http://10.60.136.39/index.php/Home/Logout.json')
      .end(function(){});
  },


  uploadAvatar(data){
    request
      .put('http://10.60.136.39/index.php/Manager/ImgModify.json')
      .type('form')
      .send({imgData:data})
      .end(function(err, res){
        if(err){
          UserActions.uploadAvatarFailure(err);
        }
        else{
          UserActions.uploadAvatarSuccess(res.body);
        }
      });
  }



};

export default UserAPIUtils;
