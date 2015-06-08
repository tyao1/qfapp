'use strict';

import Dispatcher from '../core/Dispatcher';
import CommentConstants from '../constants/CommentConstants';

export default {

  getItemsFailure(data){
    Dispatcher.handleServerAction({
      actionType: CommentConstants.COMMENT_FAILURE,
      data
    });
  },
  getItemsSuccess(data){
    Dispatcher.handleServerAction({
      actionType: CommentConstants.COMMENT_SUCCESS,
      data
    });
  },

  setNewKeyword(keyword){
    Dispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_NEW_KEY_WORD,
      keyword
    });
  },

  setNewType(typeId){
    Dispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_CHANGE_TYPE,
      typeId
    });
  },

  changeComment(page){
    Dispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_CHANGE_COMMENT,
      page
    });
  },
  refresh(){
    Dispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_REFRESH
    });
  },
  refreshHome(){
    Dispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_REFRESH_HOME
    });
  }
}
