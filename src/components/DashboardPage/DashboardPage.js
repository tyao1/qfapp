'use strict';

import React from 'react';
import OrderItem from '../OrderItem';
import RequireLogin from '../../mixins/RequireLogin';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';
//import OrderStore from '../../stores/OrderStore';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import Orders from '../Orders';
import MyInfo from '../MyInfo';
import OrderConstants from '../../constants/OrderConstants';
import ButtonNormal from '../ButtonNormal';

require('./DashboardPage.scss');

const DashboardPage = React.createClass({
  mixins: [RequireLogin, PureRenderMixin],

  getInitialState(){
    return ({
      section: UserStore.getSection()
    });
  },
  _onUserChange(){
    this.setState({
      section: UserStore.getSection()
    });
  },

  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },

  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);
  },

  render() {
    console.log('section', this.state.section);
    let elem;
    switch(this.state.section){
      case 'info':
        elem = <MyInfo/>;
        break;
      default:
        elem = <Orders/>;
        break;
    }
    return (
      <div className="dashboard">
        <div className="inner">
          <div className="left">
              <ul>
                <li>
                  <p className="subtle">买买买</p>
                  <Link to="my" params={{section: 'buy'}}><span>我的订单</span></Link>
                  <div className="controls">
                    <ButtonNormal text="所有"/>
                  </div>
                </li>
                <li>
                  <p  className="subtle">卖卖卖</p>
                  <Link to="my" params={{section: 'sell'}}><span>我的售卖</span></Link>
                  <div className="controls">
                    <ButtonNormal text="所有"/>
                  </div>
                  <Link to="my" params={{section: 'end'}}><span>历史物品</span></Link>
                  <div className="controls">
                    <ButtonNormal text="所有"/>
                  </div>
                  <Link to="my" params={{section: 'apply'}}><span>我的申请</span></Link>
                  <div className="controls">
                    <ButtonNormal text="所有"/>
                  </div>
                </li>
                <li>
                  <p  className="subtle">我的清风</p>
                  <Link to="my" params={{section: 'info'}}><span>个人信息</span></Link>
                </li>
              </ul>
          </div>
          <div className="right">
            {elem}
          </div>


        </div>
      </div>
    );
  }
});

DashboardPage.propTypes = {
};

DashboardPage.defaultProps = {
};
export default DashboardPage;
