'use strict';

import Dispatcher from '../core/Dispatcher';
import NotificationConstants from '../constants/NotificationConstants';


export default {

  deleteNotification(data){
    Dispatcher.handleViewAction({
      actionType: NotificationConstants. DELETE_ONE,
      data
    });
  },
  addNotification(data){
    Dispatcher.handleViewAction({
      actionType: NotificationConstants. ADD_ONE,
      data
    });
  }





};
