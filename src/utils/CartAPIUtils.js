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

  addItem(data, callback){
    request
      .get('mockadditem.json')//put
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          //就返回之前的物品backup呗
          CartActions.cartAddFailure(data);
        }
        else{
          CartActions.cartAddSuccess({
            body: res.body,
            data
        });
        }
      });
  },

  deleteItem(data,backup,callback){
    request
      .get('mockadditem.json')//put
      .type('form')
      .send(data)
      .end(function(err,res){
        if(err){
          //就返回之前的物品backup呗
          CartActions.deleteItemFailure({
            id:data,
            backup});
        }
        else{
          CartActions.deleteItemSuccess({
            body: res.body,
            id:data,
            backup
          });
        }
      });
  },


};

export default CartAPIUtils;
