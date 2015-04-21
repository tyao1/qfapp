'use strict';

import React from 'react';
import SellStore from '../../stores/SellStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';

import {boxface,additem,paperplane} from '../SVGs';
import ButtonNormal from '../ButtonNormal';
import Modal from '../Modal';


import ItemRegisterForm from '../ItemRegisterForm';
import RequireLogin from '../../mixins/RequireLogin';


import UserAction from '../../actions/UserAction';
require('./SellPage.scss');

const SellPage = React.createClass({
  _onSellChange(){

    let successful = SellStore.getSuccess();
    if(successful){
      this.setState({
        items: [],
        itemsCount: 0
      });
      this.goodsInfo = null;
    }
    this.setState({
      realErrMsg: SellStore.getSubmitMsg(),
      isSubmitting: SellStore.getIsSubmitting(),
      isSuccessful: successful
    });
  },

  mixins:[PureRenderMixin, RequireLogin],
  getInitialState(){
    return {
      items: ['d1'],
      itemsCount: 1,
      errMsg: '',
      realErrMsg:'',
      b_NO: '',
      NO:'',
      modalSubmitIsOpen: false,
      showSuccess: false
    }
  },
  componentWillMount(){
    SellStore.addChangeListener(this._onSellChange);

  },
  componentWillUnMount(){
    SellStore.removeChangeListener(this._onSellChange);
  },

  handleAddClick(){
    let count = this.state.itemsCount+1;
    this.setState({
      itemsCount: count,
      items: this.state.items.concat('d'+count)
    });
  },
  goodsInfo:null,
  handleSubmitClick(){
    let errMsg = '';

    const items = this.state.items;
    console.log(items);
    this.goodsInfo = [];
    let goodToGo = true;
    items.map((data,i) => {
      const state = this.refs[data].state;
      if(!state.name||state.name.length<4){
        errMsg+= `${i+1}号物品，物品名至少需要4个字<br/>`;
        goodToGo = false;
      }
      else if(state.num<1){
        console.log(state);
        errMsg+= `${i+1}号物品，物品数量需要至少为1<br/>`;
        goodToGo = false;
      }
      else{
        if(goodToGo) {
          //提交
          console.log(state);
          let t_limit = Math.round(Date.now() / 1000) + parseInt(state.timeSpan) * 60 * 60 * 24 * 30;
          let {name,price,detail,num} = state;
          let good = {name, price, t_limit, detail, num};
          this.goodsInfo.push(good);
        }
      }

    });

    if(goodToGo){
      UserAction.applySellNew();
      this.setState({
        errMsg: '',
        isSuccessful:false,
        modalSubmitIsOpen: true
      });
      //call submit action

    }
    else{
      this.setState({errMsg});
    }

  },
  handleFormClose(data){
    return ()=> {
      let items = this.state.items;
      let index = items.indexOf(data);
      if (index > -1) {
        items.splice(index, 1);
        this.setState({
          items,
          itemsCount: this.state.itemsCount+1
        });
      }
    }
  },
  handleModalSubmitClose(){
    this.setState({modalSubmitIsOpen:false});
  },
  handleBNOChange(e){
    this.setState({b_NO:e.target.value});

  },
  handleNOChange(e){
    this.setState({NO:e.target.value});
  },
  handleRealSubmitClick(){
    if(this.state.isSuccessful){
      this.setState({
        modalSubmitIsOpen:false
      });
      return;
    }
    //this.setState({realErrMsg)
    //检查宿舍楼
    let realData={
      b_NO: this.state.b_NO,
      NO: this.state.NO,
      info: this.goodsInfo
    };
    UserAction.applySellSubmit(realData);
  }


  ,
  render(){
    const items = this.state.items;
    let titleClass = `title${items.length?' active':''}`;
    return (
      <div className="sellPage">
        <div className="inner">
          <div className={titleClass} >
            {boxface}
            <span>
              只需填写闲置物品信息，<br/>
              即可轻松售卖物品。
            </span>
          </div>
          <ul className="items">
            {
              items.map((data) => <ItemRegisterForm key={data} onClose={this.handleFormClose(data)} ref={data}/>)
            }
          </ul>

          <p className={`err ${this.state.errMsg?'active':''}`} dangerouslySetInnerHTML={{__html:this.state.errMsg}}></p>

          <div className="controls">

            <ButtonNormal text="添加物品" svg={additem} onClick={this.handleAddClick}/>

            {
              items.length?
              <ButtonNormal className="ButtonNormal submit" text="提交详单" svg={paperplane} onClick={this.handleSubmitClick}/>
                :null
            }
          </div>
        </div>


        <Modal isOpen = {this.state.modalSubmitIsOpen} onClose = {this.handleModalSubmitClose}>
          {this.state.isSuccessful?
            <div className="submitForm">
              <p className="main">提交成功～我们将在未来几天内联系您！</p>
              <ButtonNormal className="ButtonNormal submit" text="关闭"
                            svg={paperplane} onClick={this.handleRealSubmitClick}/>
            </div>
            :
            <div className="submitForm">
              <p className="main">马上就好，还差一些信息</p>

              <div className="inputEffectAgain">
                <input type="text" value={this.state.b_NO} onChange={this.handleBNOChange}/>
                <label className={this.state.b_NO.length?'active':null}>宿舍楼号</label>
              </div>

              <div className="inputEffectAgain">
                <input type="text" value={this.state.NO} onChange={this.handleNOChange}/>
                <label className={this.state.NO.length?'active':null}>宿舍号</label>
              </div>
              <p>{this.state.realErrMsg}</p>
              <ButtonNormal className="ButtonNormal submit" text={this.state.isSubmitting?'提交中……':'正式提交'}
                            svg={paperplane} onClick={this.handleRealSubmitClick}/>
            </div>
          }
        </Modal>
      </div>
    );

  }



});


export default SellPage;
