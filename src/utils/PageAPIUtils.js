'use strict';
import request from 'superagent';
import PageActions from '../actions/PageActions';
const PageAPIUtils = {

  getItems(data){
    request
      .get('mockitemslist.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          PageActions.getItemsFailure({
            err,
            key:data
          });
        }
        else{
          PageActions.getItemsSuccess({
            body:res.body,
            key:data
          });
        }
      });
  }


};

export default PageAPIUtils;
