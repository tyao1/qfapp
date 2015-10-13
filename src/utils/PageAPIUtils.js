'use strict';
import request from 'superagent';
import PageActions from '../actions/PageActions';
import PageConstants from '../constants/PageConstants';
console.log(API);
const PageAPIUtils = {


  Id(keyWord, type_id, page){
    return (keyWord + '#' + type_id + '#' + page);
  },
  getItems(keyWord, type_id, page){
    request
      .get(API + '/Info/List.json')//.post('/qfplanhttp://115.29.136.30/index.php/Home/Login.json')  //SHOULD BE POST
      .query({key: keyWord, type_id, start: page, count: 8})
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
      .set({token: 'tttttst', form: 'ttttst'})
      .end(function(err, res){
        if(err){
          PageActions.getItemsFailure({
            err,
            key: PageConstants.PAGE_KEY_HOME
          });
        }
        else{
          //res.body.max = res.body.quality;
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
