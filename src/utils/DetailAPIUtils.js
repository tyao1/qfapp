'use strict';
import request from 'superagent';
import DetailActions from '../actions/DetailActions';
const DetailAPIUtils = {

  getDetail(data){
    request
      .get('http://115.29.136.30/index.php/Home/Goods.json') //'http://115.29.136.30/index.php/Home/Goods.json' //./mockitemdetail.json
      .query({goods_id:data})
      .end(function(err, res){
        if(err){
          DetailActions.getDetailFailure({
            err,
            key: data
          });
        }
        else{
          DetailActions.getDetailSuccess({
            body: res.body,
            key: data
          });
        }
      });
  },

  updatePrice({id,price}){
    request
      .put('http://115.29.136.30/index.php/Manager/Price.json') //'http://115.29.136.30/index.php/Home/Goods.json' //./mockitemdetail.json
      .type('form')
      .send({goods_id:id, price})
      .end(function(err, res){
        if(err){
          DetailActions.updatePriceFailure({
            err,
            body: res.body
          });
        }
        else{
          DetailActions.updatePriceSuccess({
            body: res.body,
            id,
            price
          });
        }
      });
  }


};

export default DetailAPIUtils;
