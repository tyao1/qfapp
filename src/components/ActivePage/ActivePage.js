'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import UserConstants from '../../constants/UserConstants';
import ButtonNormal from '../../components/ButtonNormal';
import request from 'superagent';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';


require('./ActivePage.scss');
//PureRenderMixin,
const MyInfo = React.createClass({
  mixins: [PureRenderMixin],
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState(){
    return {
      successful: false,
      isChanging: false
    };
  },

  componentDidMount(){
    document.title='激活 - 清风';
    this.activeMe();
  },

  activeMe(){
   const {key} = this.context.router.getCurrentParams();
    if(this.state.successful){

    }
    else if(!this.state.isChanging){
      this.setState({isChanging: true});
      request
        .get(API + '/Site/Active.json?key=' + key)
        .set({token: UserStore.getToken()})
        .end((err, res) => {
          this.setState({isChanging: false});
          if(err){
            this.setState({realErrMsg: '网络错误'});
          }
          else{
            if(res.body.Code===0){
              this.setState({successful: true});
            }
            else{
              this.setState({realErrMsg: res.body.Msg});
            }
          }
        });

    }

  },

  render(){
    return (
      <div className="activePage">
        {this.state.isChanging?'正在激活':this.state.successful?'激活成功，请登录':this.state.realErrMsg}
      </div>
    );

  }
});


export default MyInfo;
