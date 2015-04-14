'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';

import {boxface,additem} from '../SVGs';
import ButtonNormal from '../ButtonNormal';
import ItemRegisterForm from '../ItemRegisterForm';
import RequireLogin from '../../mixins/RequireLogin'
require('./SellPage.scss');

const SellPage = React.createClass({
  _onUserChange(){

  },

  mixins:[PureRenderMixin, RequireLogin],
  getInitialState(){
    return {
      items:[]
    }
  },
  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnMount(){
    UserStore.removeChangeListener(this._onUserChange);
  },

  itemsCount:0,
  handleAddClick(){
    this.setState({items:this.state.items.concat('d'+this.itemsCount++)});
  },
  handleSubmitClick(){

  },
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
              items.map((data) => <ItemRegisterForm key={data}/>)
            }
          </ul>
          <div className="controls">

            <ButtonNormal text="添加物品" svg={additem} onClick={this.handleAddClick}/>

            <p></p>
            {
              items.length?
              <ButtonNormal text="提交列表" svg={additem} onClick={this.handleSubmitClick}/>
                :null
            }
          </div>
        </div>
      </div>
    );

  }



});


export default SellPage;
