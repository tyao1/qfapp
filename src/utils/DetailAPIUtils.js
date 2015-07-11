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
  }


};

export default DetailAPIUtils;
