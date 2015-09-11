'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import UserConstants from '../../constants/UserConstants';
import ButtonNormal from '../../components/ButtonNormal';
import ModText from '../ModText';
import UserActions from '../../actions/UserActions';
import Modal from '../Modal';
import {paperplane} from '../SVGs';
import request from 'superagent';
import RequireLogin from '../../mixins/RequireLogin';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import AvatarEditor from '../../components/AvatarEditor';
import {edit} from '../SVGs';

require('./MyInfo.scss');
//PureRenderMixin,
const MyInfo = React.createClass({
  _onUserChange(){
    this.setState({
      userData: UserStore.getUserData(),
      submitData: UserStore.getSubmitData(),
      errMsg: UserStore.getInfoMsg(),
      isSubmitting: UserStore.getIsInfoing(),
      isChangingAvatar: UserStore.getIsChangingAvatar(),
      isUploadingAvatar: UserStore.getIsUploadingAvatar(),
      avatarErrMsg: UserStore.getAvatarErrMsg()

    });
  },

  mixins: [PureRenderMixin, RequireLogin],

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
      isChanging: false,
      avatarUri: '',
      avatarScale: 1.0,
      isChangingAvatar: UserStore.getIsChangingAvatar(),
      isUploadingAvatar: UserStore.getIsUploadingAvatar(),
      avatarErrMsg: UserStore.getAvatarErrMsg()
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
  componentDidUnmount(){
    UserActions.uploadAvatarEnd();

  },
  handleGetPhone(val){
    UserActions.addToSubmit('telephone', val);
  },
  handleCancelPhone(){
    UserActions.removeFromSubmit('telephone');
  },
  handleCheckPhone(val){
    return /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(val);
  },
  handleGetAlipay(val){
    UserActions.addToSubmit('alipay', val);
  },
  handleCancelAlipay(){
    UserActions.removeFromSubmit('alipay');
  },
  handleCheckAlipay(val){
    return /(^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$)|(^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$)/.test(val);
  },
  handleGetRealName(val){
    UserActions.addToSubmit('name', val);
  },
  handleCancelRealName(){
    UserActions.removeFromSubmit('name');
  },
  handleCheckRealName(val){
    return val.length<9;
  },
  handleGetSignature(val){
    UserActions.addToSubmit('signature', val);
  },
  handleCancelSignature(){
    UserActions.removeFromSubmit('signature');
  },
  handleCheckSignature(val){
    return val.length<23;
  },
  handleSubmitClick(){
    if(!this.state.isSubmitting&&this.state.submitData.size){
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
      isChangePasswordOpen: false
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
          .post(API + '/Manager/PSModify.json')
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
  handleAvatarClick(){
    React.findDOMNode(this.refs.avatarUpload).click();
  },
  handleAvatarFile(e){
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = upload => {
      UserActions.uploadAvatarStart();
      this.setState({
        avatarUri: upload.target.result
      });
    };
    reader.readAsDataURL(file);
  },
  handleChangeScale(e){
    this.setState({avatarScale: e.target.value});
  },
  handleSaveAvatar(){
    if(!this.state.isUploadingAvatar){
      let dataUri = this.refs.avatarEditor.getImage();
      let index = dataUri.indexOf(',');
      if(index>0)  dataUri = dataUri.substring(index+1);
      UserActions.uploadAvatarSubmit(dataUri);
    }
  },
  handleCancelAvatar(){
    UserActions.uploadAvatarEnd();
    /*
    this.setState({
      avatarUri: ''
    });
    */
  },

  render(){
    return (
      <div className="myInfo">
        <header>
          <div className="personal">
            <h3>{this.state.userData.nickname}</h3>
            <ModText key={this.state.userData.signature} myPlaceholder="暂无签名" type="text" text={this.state.userData.signature} getEdited={this.handleGetSignature} cancelEdit={this.handleCancelSignature} valide={this.handleCheckSignature} onConfirm={this.handleSubmitClick}/>

          </div>
          <div className={`submit${this.state.submitData.size?' active':''}`}>
            <span className="err">{this.state.errMsg}</span>
            <ButtonNormal className="ButtonNormal" text={this.state.isSubmitting?'正在保存...':'保存信息'} onClick={this.handleSubmitClick}/>
          </div>
        </header>


        <div className="content">
          {this.state.isChangingAvatar?
            <div className="avartarEditor">
              <AvatarEditor ref="avatarEditor"
                image={this.state.avatarUri}
                width={200}
                height={200}
                border={15}
                scale={this.state.avatarScale} />
              <input type="range" min={1} max={2.5} step={0.01} value={this.state.avatarScale} onChange={this.handleChangeScale}/>
              <div className="controls">
                <p>{this.state.avatarErrMsg}</p>
                <ButtonNormal text={this.state.isUploadingAvatar?'上传中……':'保存'} onClick={this.handleSaveAvatar}/>
                {this.state.isUploadingAvatar?
                  null:
                  <ButtonNormal className="ButtonNormal cancel" text="取消" onClick={this.handleCancelAvatar}/>
                }
              </div>
            </div>
              :
            <div className="avartar" onClick={this.handleAvatarClick}>
              <input ref="avatarUpload" type="file" onChange={this.handleAvatarFile} />
              <span>{edit}</span>
              <img key={this.state.userData.path} src={this.state.userData.path} />
            </div>
          }

          <div className="info">
            <ul>
              <li>
                <span className="subtle">
                  手机号
                </span>
                <ModText key={this.state.userData.telephone} type="text" text={this.state.userData.telephone} getEdited={this.handleGetPhone} cancelEdit={this.handleCancelPhone} valide={this.handleCheckPhone} onConfirm={this.handleSubmitClick}/>
              </li>
              <li>
                <span className="subtle">
                  支付宝账号（用来接收收入，不要填错哦～）
                </span>
                <ModText key={this.state.userData.alipay} type="text" text={this.state.userData.alipay} getEdited={this.handleGetAlipay} cancelEdit={this.handleCancelAlipay} valide={this.handleCheckAlipay} onConfirm={this.handleSubmitClick}/>
              </li>
              <li>
                <span className="subtle">
                  真实姓名（选填，仅用来验证支付宝账号）
                </span>
                <ModText key={this.state.userData.name} type="text" text={this.state.userData.name} getEdited={this.handleGetRealName} cancelEdit={this.handleCancelRealName} valide={this.handleCheckRealName} onConfirm={this.handleSubmitClick}/>
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
                  <div className="svgWrapper" onClick={this.handleChangePassword}>
                    {edit}
                  </div>
                </span>
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
