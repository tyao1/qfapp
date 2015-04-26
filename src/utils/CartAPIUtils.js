'use strict';
import request from 'superagent';
import CartActions from '../actions/CartActions';
const CartAPIUtils = {

  submitOrder(data){
    request
      .get('mockapplysell.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          CartActions.cartOrderFailure(err);
        }
        else{
          CartActions.cartOrderSuccess(res.body);
        }
      });
  },

  //data 物品id, backup 之前物品数据
  addItem(data, backup){
    request
      .get('mockadditem.json')//put
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup呗
          CartActions.cartAddFailure({
            id: data,
            backup
          });
        }
        else{
          CartActions.cartAddSuccess({
            body: res.body,
            id: data,
            backup
        });
        }
      });
  },

  //data 物品id, backup 之前物品数据
  deleteItem(data, backup){
    request
      .get('mockadditem.json')//put
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup呗
          CartActions.deleteItemFailure({
            id: data,
            backup});
        }
        else{
          CartActions.deleteItemSuccess({
            body: res.body,
            id: data,
            backup
          });
        }
      });
  }
};

export default CartAPIUtils;
