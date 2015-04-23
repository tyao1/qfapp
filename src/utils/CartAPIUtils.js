'use strict';
import request from 'superagent';
import CartActions from '../actions/CartActions';
const CartAPIUtils = {

  submitOrder(data,callback){
    request
      .get('mockapplysell.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          CartActions.cartOrderFailure(err);
        }
        else{
          CartActions.cartOrderSuccess(res.body);
        }
      });
  },




};

export default CartAPIUtils;
