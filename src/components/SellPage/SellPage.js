'use strict';

import React from 'react';
import UserStore from '../../stores/UserStore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import UserConstants from '../../constants/UserConstants';

import {boxface,additem} from '../SVGs';
import ButtonNormal from '../ButtonNormal';

require('./SellPage.scss');

const SellPage = React.createClass({
  _onUserChange(){

  },

  mixins:[PureRenderMixin],
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
  render(){
    const items = this.state.items;
    let titleClass = `title${items.length?'active':''}`;
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

          <div className="controls">
            <ButtonNormal text="添加物品" svg={additem}/>

            </div>
        </div>
      </div>
    );

  }



});


export default SellPage;
