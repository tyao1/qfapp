'use strict';
import request from 'superagent';
import PageActions from '../actions/PageActions';
import PageConstants from '../constants/PageConstants';
import UserStore from '../stores/UserStore';
const PageAPIUtils = {


  Id(keyWord, type_id, page){
    return (keyWord + '#' + type_id + '#' + page);
  },
  getItems(keyWord, type_id, page){
    request
      .get(API + '/Goods/List.json')//.post('/qfplanhttp://115.29.136.30/index.php/Home/Login.json')  //SHOULD BE POST
      .set({token: UserStore.getToken()})
      .query({
        key: keyWord,
        type_id,
        start: 1 + (page-1) * 24,
        count: 24
      })
      .end(function(err, res){
        if(err){
          PageActions.getItemsFailure({
            err,
            key: PageAPIUtils.Id(keyWord, type_id, page)
          });
        }
        else{
          PageActions.getItemsSuccess({
            body: res.body,
            key: PageAPIUtils.Id(keyWord, type_id, page)
          });
        }
      });
  },


  getHome(){
    request
      .get(API + '/Home/Latest.json')//.post('/qfplanhttp://115.29.136.30/index.php/Home/Login.json')  //SHOULD BE POST
      .set({token: UserStore.getToken()})
      .end(function(err, res){
        if(err){
          PageActions.getItemsFailure({
            err,
            key: PageConstants.PAGE_KEY_HOME
          });
        }
        else{
          //res.body.max = res.body.sum;
          PageActions.getItemsSuccess({
            isHome: true,
            body: res.body,
            key: PageConstants.PAGE_KEY_HOME
          });
        }
      });
  }


};

export default PageAPIUtils;
