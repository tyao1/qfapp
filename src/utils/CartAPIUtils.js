'use strict';
import request from 'superagent';
import CartActions from '../actions/CartActions';
function gaEvent(type) {
  ga('send', 'event', '购物车', type, '清风API调用');
}


//缓存物品数量操作
let cartChangeNumber = {};
function cartChangeFunc(data, num, backup){
  return ()=>{
  //清除记录
    request
      .put(API + '/Home/CarAdd.json')//.get('mockadditem.json')//put
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
            backup: cartChangeNumber[data].backup
          });
          cartChangeNumber[data] = null;
        }
        else{
          CartActions.changeNumSuccess({
            body: res.body,
            goods_id: data,
            backup: cartChangeNumber[data].backup
          });
          cartChangeNumber[data] = null;
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
      .post(API + '/Manager/Book.json')//.get('mockapplysell.json')
      .type('form')
      .send(data)
      .end(function(err, res){
        if(err){
          CartActions.cartOrderFailure(err);
        }
        else{
          CartActions.cartOrderSuccess({
            body: res.body
          });
        }
      });
    gaEvent('提交订单');
  },

  //data 物品id, backup 之前物品数据
  addItem(data, number=1, backup){
    request
      .put(API + '/Home/CarAdd.json')//.get('mockadditem.json')//put
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
    gaEvent('添加物品');
  },

  //data 物品id, backup 之前物品数据
  deleteItem(data, backup){
    request
      .put(API + '/Home/CarRemove.json')//.get('mockadditem.json')//put
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
    gaEvent('删除物品');
  },


  //data:id  num  ,backup:number
  changeNum(data, num, backup){
    if(cartChangeNumber[data]){
      console.log('there is cache!');
      clearTimeout(cartChangeNumber[data].handler);
      cartChangeNumber[data].handler = setTimeout(
        cartChangeFunc(data, num, backup), 2000);
    }
    else{
      console.log('there NO cache!', backup);

      cartChangeNumber[data] = {
        handler: setTimeout(cartChangeFunc(data, num, backup), 2000),
        backup
      };
    }
  },

  //data 物品id, backup 之前物品数据
  fetchCarts(){
    request
      .get(API + '/Home/Car.json')//.get('./mockgetcart.json')////put
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
