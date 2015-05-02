'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';
import ButtonNormal from '../../components/ButtonNormal';
import ModText from '../ModText';
import UserActions from '../../actions/UserActions';

require('./MyInfo.scss');

const MyInfo = React.createClass({
  _onUserChange(){
    this.setState({
      userData: UserStore.getUserData(),
      submitData: UserStore.getSubmitData(),
      errMsg: UserStore.getInfoMsg(),
      isSubmitting: UserStore.getIsInfoing()
    });
  },

  mixins: [PureRenderMixin],

  getInitialState(){
    return {
      userData: UserStore.getUserData(),
      submitData: UserStore.getSubmitData(),
      errMsg: UserStore.getInfoMsg(),
      isSubmitting: UserStore.getIsInfoing()
    };
  },
  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);

  },
  handleGetPhone(val){
    UserActions.addToSubmit('phone', val);
  },
  handleGetTaobao(val){
    UserActions.addToSubmit('taobao', val);
  },

  handleSubmitClick(){
    if(!this.state.isSubmitting){
      UserActions.submitData(this.state.submitData.toJS());
    }
  },
  render(){
    return (
      <div className="myInfo">
        <header>
          <h3>{this.state.userData.nickname}</h3>
          <div className={`submit${this.state.submitData.size?' active':''}`}>
            {this.state.errMsg}
            <ButtonNormal className="ButtonNormal" text={this.state.isSubmitting?'正在保存...':'保存信息'} onClick={this.handleSubmitClick}/>
          </div>
        </header>


        <div className="content">
          <div className="avartar">
            <span>暂不支持更换头像</span>
            <img src={this.state.userData.avartar}/>
          </div>
          <div className="info">
            <ul>
              <li>
                <span className="subtle">
                  手机号
                </span>
                <ModText type="text" text="1383838434" getEdited={this.handleGetPhone}/>
              </li>
              <li>
                <span className="subtle">
                  淘宝账号
                </span>
                <ModText type="text" text="1383838434" getEdited={this.handleGetTaobao}/>
              </li>
              <li>
                <span className="subtle">
                  邮箱号
                </span>
                <p>1383838438</p>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );

  }
});


export default MyInfo;
