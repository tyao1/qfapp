'use strict';
import request from 'superagent';
import DetailActions from '../actions/DetailActions';
import UserStore from '../stores/UserStore';


const DetailAPIUtils = {

  getDetail(data){
    request
      .get(API + '/Goods/Detail.json') //API + '/Home/Goods.json' //./mockitemdetail.json.query({goods_id:data})
      .set({token: UserStore.getToken()})
      .query({goods_id: data})
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
