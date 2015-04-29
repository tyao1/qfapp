'use strict';

import React from 'react';
import OrderItem from '../OrderItem';
import RequireLogin from '../../mixins/RequireLogin';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import SellOrders from '../SellOrders';
import MyInfo from '../MyInfo';

require('./DashboardPage.scss');

const DashboardPage = React.createClass({
  mixins: [RequireLogin, PureRenderMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
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
    let elem;
    switch(this.state.section){
      case 'info':
        elem = <MyInfo/>;
        break;
      default:
        elem = <SellOrders/>;
        break;
    }
    return (
      <div className="dashboard">
        <div className="inner">
          <div className="left">
              <ul>
                <li>
                  <p>卖卖卖</p>
                  <Link to="my" data-text="我的售卖" params={{section: 'sell'}}><span>我的售卖</span></Link>
                  <div className="controls">
                    <div>所有</div>

                  </div>
                </li>
                <li>
                  <p>我的清风</p>
                  <Link to="my" data-text="个人信息" params={{section: 'info'}}><span>个人信息</span></Link>
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
