'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';
import ButtonNormal from '../../components/ButtonNormal';
import ModText from '../ModText';
import UserActions from '../../actions/UserActions';
import Modal from '../Modal';
import {paperplane} from '../SVGs';
import request from 'superagent';
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
      isSubmitting: UserStore.getIsInfoing(),
      isChangePasswordOpen: false,
      old:'',
      new:'',
      successful: false,
      isChanging: false
    };
  },

  componentDidMount(){
    document.title='个人信息 - 清风';
  },
  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);

  },
  handleGetPhone(val){
    UserActions.addToSubmit('telephone', val);
  },
  handleGetAlipay(val){
    UserActions.addToSubmit('alipay', val);
  },
  handleGetRealName(val){
    UserActions.addToSubmit('name', val);
  },
  handleSubmitClick(){
    if(!this.state.isSubmitting){
      UserActions.changeInfoSubmit(this.state.submitData.toJS());
    }
  },
  handleChangePassword(){
    this.setState({
      isChangePasswordOpen: true,
      successful: false
    });
  },
  handleChangeClose(){
    this.setState({
      isChangePasswordOpen: false,
      successful: false
    });
  },
  handleOldChange(e){
    this.setState({old: e.target.value});
  },
  handleNewChange(e){
    this.setState({new: e.target.value});
  },
  handleRealSubmitClick(){
    if(this.state.successful){
      this.handleChangeClose();
    }
    else if(!this.state.isChanging){
      if(this.state.new.length<6){
        this.setState({realErrMsg: '密码不能小于6位'});
      }
      else{
        this.setState({isChanging: true});
        request
          .post('http://10.60.136.39/index.php/Manager/PSModify.json')
          .type('form')
          .send({
            old: this.state.old,
            new: this.state.new
          })
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
    }

  },
  render(){
    return (
      <div className="myInfo">
        <header>
          <h3>{this.state.userData.nickname}</h3>
          <div className={`submit${this.state.submitData.size?' active':''}`}>
            <span className="err">{this.state.errMsg}</span>
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
                <ModText type="text" text={this.state.userData.telephone} getEdited={this.handleGetPhone}/>
              </li>
              <li>
                <span className="subtle">
                  支付宝账号
                </span>
                <ModText type="text" text={this.state.userData.alipay} getEdited={this.handleGetAlipay}/>
              </li>
              <li>
                <span className="subtle">
                  真实姓名
                </span>
                <ModText type="text" text={this.state.userData.name} getEdited={this.handleGetRealName}/>
              </li>
              <li>
                <span className="subtle">
                  邮箱
                </span>
                <p>{this.state.userData.email}</p>
              </li>
              <li>
                <span className="subtle">
                  修改密码
                </span>
                <div><ButtonNormal text="修改" onClick={this.handleChangePassword}/></div>
              </li>

            </ul>
          </div>
        </div>

        <Modal isOpen={this.state.isChangePasswordOpen} onClose={this.handleChangeClose}>
          {
            this.state.successful?
              <div className="submitForm">
                <p className="main">╰(*°▽°*)╯<br/>修改密码成功~</p>
                <ButtonNormal className="ButtonNormal submit" text="关闭" svg={paperplane} onClick={this.handleRealSubmitClick}/>
              </div>
            :
            <div className="submitForm">
              <p className="main">修改密码</p>
                <div className="inputEffectAgain">
                  <input type="password" value={this.state.old} onChange={this.handleOldChange}/>
                  <label className={this.state.old.length?'active':null}>旧密码</label>
                </div>
                <div className="inputEffectAgain">
                  <input type="password" value={this.state.new} onChange={this.handleNewChange}/>
                  <label className={this.state.new.length?'active':null}>新密码</label>
                </div>
              <p>{this.state.realErrMsg}</p>
              <ButtonNormal className="ButtonNormal submit" text={this.state.isChanging?'提交中……':'提交修改'} svg={paperplane} onClick={this.handleRealSubmitClick}/>
            </div>
          }
        </Modal>
      </div>
    );

  }
});


export default MyInfo;
