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
  }
}
