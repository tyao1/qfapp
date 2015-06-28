'use strict';

import Dispatcher from '../core/Dispatcher';
import DetailConstants from '../constants/DetailConstants';
import DetailAPIUtils from '../utils/DetailAPIUtils.js';
import router from '../router';
export default {

  getDetailFailure(data){
    Dispatcher.handleServerAction({
      actionType: DetailConstants.DETAIL_FAILURE,
      data
    });
  },
  getDetailSuccess(data){
    Dispatcher.handleServerAction({
      actionType: DetailConstants.DETAIL_SUCCESS,
      data
    });
  },

  getNewDetail(data){
    //正常flux action
    Dispatcher.handleViewAction({
      actionType: DetailConstants.DETAIL_NEW,
      data
    });
    //react-router action
    router.transitionTo('detail', {id: data.goods_id});
  },


  //使用deconstruct使代码更可读
  updatePrice({id, price}){
    Dispatcher.handleServerAction({
      actionType: DetailConstants.UPDATE_PRICE,
      data: {
        id,
        price
      }
    });
    DetailAPIUtils.updatePrice({id, price});
  },
  updatePriceSuccess({body, id, price}){
    Dispatcher.handleServerAction({
      actionType: DetailConstants.UPDATE_PRICE_SUCCESS,
      data:{
        body,
        id,
        price
      }
    });
  },
  updatePriceFailure({body, id, price}){
    Dispatcher.handleServerAction({
      actionType: DetailConstants.UPDATE_PRICE_FAILURE,
      data:{
        err,
        body,
        id,
        price
      }
    });
  },
  refresh(){
    Dispatcher.handleViewAction({
      actionType: DetailConstants.DETAIL_REFRESH
    });
  }
}
