'use strict';
import request from 'superagent';
import CartActions from '../actions/CartActions';



//缓存物品数量操作
let cartChangeNumber = {};
function cartChangeFunc(data, num, backup){
  return ()=>{
  //清除记录
    request
      .put('http://10.60.136.39/index.php/Home/CarAdd.json')//.get('mockadditem.json')//put
      .type('form')
      .send({
        goods_id: data,
        number: num
      })
      .end(function(err, res){
        if(err){
          cartChangeNumber[data] = null;
          //就返回之前的物品backup呗
          CartActions.changeNumFailure({
            goods_id: data,
            backup
          });
        }
        else{
          cartChangeNumber[data] = null;
          CartActions.changeNumSuccess({
            body: res.body,
            goods_id: data,
            backup
          });
        }
      });
  }
}

const CartAPIUtils = {

  /*
   bookInfo: [
      {
         gid,
         num
      }
    ]
   */
  submitOrder(data){
    request
      .post('index.php/Manager/Book.json')//.get('mockapplysell.json')
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
        number
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


  //data:id  num  ,backup:number
  changeNum(data, num, backup){
    if(cartChangeNumber[data]){
      clearTimeout(cartChangeNumber[data].handler);
      cartChangeNumber[data].handler = setTimeout(
        cartChangeFunc(data, num, backup), 2000);
    }
    else{
      cartChangeNumber[data] = {
        handler: setTimeout(cartChangeFunc(data, num, backup), 2000),
        backup
      };
    }
  },

  //data 物品id, backup 之前物品数据
  fetchCarts(){
    request
      .get('http://10.60.136.39/index.php/Home/Car.json')//.get('./mockgetcart.json')////put
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup
          CartActions.cartFetchFailure({
            err
          });
        }
        else{
          CartActions.cartFetchSuccess({
            body: res.body
          });
        }
      });
  }
};

export default CartAPIUtils;
