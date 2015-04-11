'use strict';

import React from 'react';
import OrderItem from '../OrderItem';
import RequireLogin from '../../mixins/RequireLogin';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import SellOrders from '../SellOrders';

require('./DashboardPage.scss');

const DashboardPage = React.createClass({
  mixins:[RequireLogin],

  getInitialState(){
    return ({
      section:UserStore.getSection()
    });
  },
  _onUserChange(){
    this.setState({
      section:UserStore.getSection()
    })
  },

  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);

  },
  componentWillUnMount(){
    UserStore.removeChangeListener(this._onUserChange);
  },
  componentWillReceiveProps(nextProps) {

  },

  render() {
    let elem;
    switch(this.state.section){
      case 'info':
        elem = <div key="info">asdsa</div>;
        break;
      default:
        elem = null;
        break;
    }
    return (
      <div className="dashboard">
        <div className="inner">
          <div className="left">
              <ul>
                <li>
                  <p>卖卖卖</p>
                  <Link to="my" data-text="我的售卖" params={{section: 'sell'}}><h3>我的售卖</h3></Link>
                  <div className="controls">
                    <div>所有</div>

                  </div>
                </li>
                <li>
                  <p>我的清风</p>
                  <Link to="my" data-text="个人信息" params={{section: 'info'}}><h3>个人信息</h3></Link>
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
