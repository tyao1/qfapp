'use strict';

import Dispatcher from '../core/Dispatcher';
import DetailConstants from '../constants/DetailConstants';
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
    router.transitionTo('detail',{id:data.id});
  }
}
