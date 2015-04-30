'use strict';

import Dispatcher from '../core/Dispatcher';
import PageConstants from '../constants/PageConstants';

export default {

  getItemsFailure(data){
    Dispatcher.handleServerAction({
      actionType: PageConstants.PAGE_FAILURE,
      data
    });
  },
  getItemsSuccess(data){
    Dispatcher.handleServerAction({
      actionType: PageConstants.PAGE_SUCCESS,
      data
    });
  },

  setNewKeyword(keyword){
    Dispatcher.handleViewAction({
      actionType: PageConstants.PAGE_NEW_KEY_WORD,
      keyword
    });
  },

  setNewType(typeId){
    Dispatcher.handleViewAction({
      actionType: PageConstants.PAGE_CHANGE_TYPE,
      typeId
    });
  },

  changePage(page){
    Dispatcher.handleViewAction({
      actionType: PageConstants.PAGE_CHANGE_PAGE,
      page
    });
  },

  refresh(){
    Dispatcher.handleViewAction({
      actionType: PageConstants.PAGE_REFRESH
    });
  }
}
