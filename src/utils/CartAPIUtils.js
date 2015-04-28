'use strict';
import request from 'superagent';
import CartActions from '../actions/CartActions';



//缓存物品数量操作
let cartChangeNumber = {};

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
  addItem(data, number=1, backup){
    request
      .put('http://10.60.136.39/index.php/Home/CarAdd.json')//.get('mockadditem.json')//put
      .type('form')
      .send({
        goods_id: data,
        nubmer
      })
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup呗
          CartActions.cartAddFailure({
            goods_id: data,
            backup
          });
        }
        else{
          CartActions.cartAddSuccess({
            body: res.body,
            goods_id: data,
            backup
          });
        }
      });
  },

  //data 物品id, backup 之前物品数据
  deleteItem(data, backup){
    request
      .put('http://10.60.136.39/index.php/Home/CarRemove.json')//.get('mockadditem.json')//put
      .type('form')
      .send({goods_id: data})
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup呗
          CartActions.deleteItemFailure({
            goods_id: data,
            backup});
        }
        else{
          CartActions.deleteItemSuccess({
            body: res.body,
            goods_id: data,
            backup
          });
        }
      });
  },


  //id  num
  changeNum(id, num, backup){
    if(cartChangeNumber[id]){
      clearTimeout(cartChangeNumber[id]);
      cartChangeNumber[id] = null;
    }
    setTimeout(()=>{
      request
        .put('http://10.60.136.39/index.php/Home/CarAdd.json')//.get('mockadditem.json')//put
        .type('form')
        .send({
          goods_id: data,
          number: num
        })
        .end(function(err, res){
          if(err){
            //就返回之前的物品backup呗
            CartActions.changeNumFailure({
              goods_id: data,
              backup
            });
          }
          else{
            CartActions.changeNumSuccess({
              body: res.body,
              goods_id: data,
              backup
            });
          }
        });
    }, 5000);
  },

  //data 物品id, backup 之前物品数据
  fetchCarts(){
    request
      .get('./mockgetcart.json')//.get('http://10.60.136.39/index.php/Home/Car.json')//put
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup
          CartActions.cartFetchFailure({
            err
          });
        }
        else{
          CartActions.cartFetchSuccess({
            body: res.body,
          });
        }
      });
  }
};

export default CartAPIUtils;
