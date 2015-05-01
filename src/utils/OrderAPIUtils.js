'use strict';
import request from 'superagent';
import OrderActions from '../actions/OrderActions';
import OrderConstants from '../constants/OrderConstants';
const OrderAPIUtils = {


  Id(keyWord, type_id, page){
    return (keyWord + '#' + type_id + '#' + page);
  },
  getItems(keyWord, type_id, page){
    request
      .get('http://10.60.136.39/index.php/Home/Search.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .query({keyWord, type_id, page})
      .end(function(err, res){
        if(err){
          OrderActions.getItemsFailure({
            err,
            key: OrderAPIUtils.Id(keyWord, type_id, page)
          });
        }
        else{
          OrderActions.getItemsSuccess({
            body: res.body,
            key: OrderAPIUtils.Id(keyWord, type_id, page)
          });
        }
      });
  },


  getHome(){
    request
      .get('http://10.60.136.39/index.php/Home/Latest.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .end(function(err, res){
        if(err){
          OrderActions.getItemsFailure({
            err,
            key: OrderConstants.ORDER_KEY_HOME
          });
        }
        else{
          //res.body.max = res.body.quality;
          OrderActions.getItemsSuccess({
            isHome: true,
            body: res.body,
            key: OrderConstants.ORDER_KEY_HOME
          });
        }
      });
  }


};

export default OrderAPIUtils;
