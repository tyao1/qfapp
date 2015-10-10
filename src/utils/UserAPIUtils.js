'use strict';
import request from 'superagent';
import UserActions from '../actions/UserActions';
function gaEvent(type) {
  ga('send', 'event', '用户', type, '清风API调用');
}

const UserAPIUtils = {
  register(data){
    request
      .post(API + '/Home/User.json')  //Site/RegEmail.json
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
    gaEvent('注册');
  },
  login(data){
    request
      .post(API + '/Home/Login.json')  // /Site/Login.json
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
    gaEvent('登陆');
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
      .post(API + '/Manager/Application.json')  //SHOULD BE POST //.get('mockapplysell.json')
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
    gaEvent('提交申请');
  },

  changeInfo(data){
    request
      .put(API + '/Manager/UserData.json')  //SHOULD BE POST //.get('mockapplysell.json')
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
    gaEvent('个人信息修改');
  },

  findPassword(data){
    request
      .post(API + '/Home/Forget.json')  //SHOULD BE POST //.get('mockapplysell.json')
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
    gaEvent('找回密码');
  },
  logout(){
    request
      .put(API + '/Home/Logout.json')
      .end(function(){});
    gaEvent('登出');
  },


  uploadAvatar(data){
    request
      .put(API + '/Manager/ImgModify.json')
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
    gaEvent('上传头像');
  }



};

export default UserAPIUtils;
