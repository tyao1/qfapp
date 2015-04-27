'use strict';
import request from 'superagent';
import PageActions from '../actions/PageActions';
import PageConstants from '../constants/PageConstants';
const PageAPIUtils = {

  getItems(data){
    request
      .get('mockitemslist.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .end(function(err, res){
        if(err){
          PageActions.getItemsFailure({
            err,
            key: data
          });
        }
        else{
          PageActions.getItemsSuccess({
            body: res.body,
            key: data
          });
        }
      });
  },


  getHome(){
    request
      .get('http://10.60.136.39/index.php/Home/Latest.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
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
            body: res.body,
            key: PageConstants.PAGE_KEY_HOME
          });
        }
      });
  }


};

export default PageAPIUtils;
