'use strict';
import request from 'superagent';
import OrderActions from '../actions/OrderActions';
import OrderConstants from '../constants/OrderConstants';

const NUMBER = 8;
const OrderAPIUtils = {

  dateToString(date){
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getDay() + 1) + ' '+ date.getHours() + ':' + date.getMinutes();
  },
  buyStatus:{
    1:'订单处理中',
    2:'用户取消',
    3:'官方取消',
    4:'交易成功',
    5:'取消审核中',
    6:'等待收货'
  },
  sellStatus:{
    1:'官方下架',
    2:'售卖中',
    3:'刚卖完'
  },
  offStatus:{
    1:'管理员下架',
    2:'已到期',
    3:'销售完毕'
  },
  applyStatus:{
    1:'申请处理中',
    2:'等待收取',
    3:'用户取消',
    4:'官方取消',
    5:'申请完成'
  },

  applyItemStatus:{
    1:'申请取消',
    4:'录入完毕'
  },

  Id(keyWord, status, page){
    return (keyWord + '#' + status + '#' + page);
  },

  //最炫store风
  getItems(keyWord, status, page){
    switch(keyWord){
      case OrderConstants.ORDER_KEY:
        request
          .get('http://10.60.136.39/index.php/Manager/BookDetail.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
          .query({
            status,
            start: page,
            count: NUMBER
          })
          .end(function(err, res){
            if(err){
              OrderActions.getItemsFailure1({
                err,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
            else{
              OrderActions.getItemsSuccess1({
                body: res.body,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
          });

        break;
      case OrderConstants.APPLY_ORDER_KEY:
        request
          .get('http://10.60.136.39/index.php/Manager/Application.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
          .query({
            status,
            start: page,
            count: NUMBER
          })
          .end(function(err, res){
            if(err){
              OrderActions.getItemsFailure2({
                err,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
            else{
              OrderActions.getItemsSuccess2({
                body: res.body,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
          });
        break;
      case OrderConstants.ON_SALE_ORDER_KEY:
        request
          .get('http://10.60.136.39/index.php/Manager/Goods.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
          .query({
            type: 0,
            status,
            start: page,
            count: NUMBER
          })
          .end(function(err, res){
            if(err){
              OrderActions.getItemsFailure3({
                err,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
            else{
              OrderActions.getItemsSuccess3({
                body: res.body,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
          });
        break;
      case OrderConstants.OFF_SALE_ORDER_KEY:
        request
          .get('http://10.60.136.39/index.php/Manager/Goods.json')//.post('http://10.60.136.39/qfplan/index.php/Home/Login.json')  //SHOULD BE POST
          .query({
            type: 1,
            status,
            start: page,
            count: NUMBER
          })
          .end(function(err, res){
            if(err){
              OrderActions.getItemsFailure4({
                err,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
            else{
              OrderActions.getItemsSuccess4({
                body: res.body,
                key: OrderAPIUtils.Id(keyWord, status, page)
              });
            }
          });
        break;
    }

  },
  /*
    id,
    reason
   */
  cancelOrder(id, reason){
    request
      .put('http://10.60.136.39/index.php/Manager/Application.json')
      .type('form')
      .send({
        app_id: id,
        content: reason
      })
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup呗
          OrderActions.cancelOrderFailure({
            err
          });
        }
        else{
          OrderActions.cancelOrderSuccess({
            body: res.body
          });
        }
      });

  },
  cancelNormalOrder(id){
    request
      .put('http://10.60.136.39/index.php/Manager/BookCancel.json')
      .type('form')
      .send({
        book_id: id
      })
      .end(function(err, res){
        if(err){
          //就返回之前的物品backup呗
          OrderActions.cancelOrderFailure({
            err
          });
        }
        else{
          OrderActions.cancelOrderSuccess({
            body: res.body
          });
        }
      });

  }


};

export default OrderAPIUtils;
