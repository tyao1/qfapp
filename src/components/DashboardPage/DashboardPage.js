'use strict';

import React from 'react';
import OrderItem from '../OrderItem';
import RequireLogin from '../../mixins/RequireLogin';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';
import OrderStore from '../../stores/OrderStore';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import Orders from '../Orders';
//import MyInfo from '../MyInfo';
import OrderConstants from '../../constants/OrderConstants';
import ButtonNormal from '../ButtonNormal';
import OrderActions from '../../actions/OrderActions';

require('./DashboardPage.scss');


const MyInfoMixin = require("react-proxy!../MyInfo").Mixin;
const MyInfo = React.createClass({
  mixins: [MyInfoMixin],
  renderUnavailable: function() {
    return <div className="proxyLoading">
      <div className="inner">
        <img src="facebook.svg"/>
      </div>
    </div>;
  }
});


const buySections = [
  {name: '所有订单', code: 0},
  {name: '等待收货', code: 6},
  {name: '交易完成', code: 4},
  {name: '打包中', code: 1},
  {name: '已取消', code: 2}
];
const applySections = [
  {name: '所有申请', code: 0},
  {name: '审核中', code: 1},
  {name: '待收取', code: 2},
  {name: '已完成', code: 5},
  {name: '用户取消', code: 3},
  {name: '官方取消', code: 4}
];
const c2cSections = [
  {name: '所有订单', code: 0},
  {name: '处理中', code: 1},
  {name: '卖家确认', code: 3},
  {name: '买家确认', code: 4},
  {name: '已完成', code: 5},
  {name: '已取消', code: 6}
];
const c2c2Sections = [
  {name: '所有订单', code: 0},
  {name: '处理中', code: 1},
  {name: '买家付款', code: 2},
  {name: '卖家确认', code: 3},
  {name: '买家确认', code: 4},
  {name: '已完成', code: 5},
  {name: '已取消', code: 6}
];


const DashboardPage = React.createClass({
  mixins: [RequireLogin, PureRenderMixin],

  getInitialState(){
    return ({
      section: UserStore.getSection(),
      status1: OrderStore.getStatus(OrderConstants.ORDER_KEY),
      status2: OrderStore.getStatus(OrderConstants.APPLY_ORDER_KEY),
      status3: OrderStore.getStatus(OrderConstants.ON_SALE_ORDER_KEY),
      status4: OrderStore.getStatus(OrderConstants.OFF_SALE_ORDER_KEY),
      status5: OrderStore.getStatus(OrderConstants.C2C_ORDER_KEY),
      status6: OrderStore.getStatus(OrderConstants.C2C_APPLY_ORDER_KEY),
      status7: OrderStore.getStatus(OrderConstants.C2C2_ORDER_KEY),
      status8: OrderStore.getStatus(OrderConstants.C2C2_APPLY_ORDER_KEY)
    });
  },
  _onUserChange(){
    this.setState({
      section: UserStore.getSection(),
      status1: OrderStore.getStatus(OrderConstants.ORDER_KEY),
      status2: OrderStore.getStatus(OrderConstants.APPLY_ORDER_KEY),
      status3: OrderStore.getStatus(OrderConstants.ON_SALE_ORDER_KEY),
      status4: OrderStore.getStatus(OrderConstants.OFF_SALE_ORDER_KEY),
      status5: OrderStore.getStatus(OrderConstants.C2C_ORDER_KEY),
      status6: OrderStore.getStatus(OrderConstants.C2C_APPLY_ORDER_KEY),
      status7: OrderStore.getStatus(OrderConstants.C2C2_ORDER_KEY),
      status8: OrderStore.getStatus(OrderConstants.C2C2_APPLY_ORDER_KEY)
    });
  },

  _onOrderChange(){
    this.setState({
      options: OrderStore.getOptions()
    });
  },

  componentWillMount(){
    UserStore.addChangeListener(this._onUserChange);
    OrderStore.addChangeListener(this._onOrderChange);
  },

  componentWillUnmount(){
    UserStore.removeChangeListener(this._onUserChange);
    OrderStore.removeChangeListener(this._onOrderChange);
  },
  handleSectionSelection(key, code) {
    return () =>{
      OrderActions.setNewStatus(key, code);
    }
  },
  handleBuySection(code){
    return () =>{
      OrderActions.setNewStatus(OrderConstants.ORDER_KEY, code);
    }
  },

  handleOnSaleSection(code){
    return () =>{
      OrderActions.setNewStatus(OrderConstants.ON_SALE_ORDER_KEY, code);
    }
  },
  handleOffSaleSection(code){
    return () =>{
      OrderActions.setNewStatus(OrderConstants.OFF_SALE_ORDER_KEY,code);
    }
  },
  handleApplySection(code){
    return () =>{
      OrderActions.setNewStatus(OrderConstants.APPLY_ORDER_KEY,code);
    }
  },
  render() {
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
                  <p className="subtle">我的友易</p>
                  <Link to="my" params={{section: 'buyc2c'}}><span>自由购买</span></Link>
                  <Link to="my" params={{section: 'sellc2c'}}><span>自由出售</span></Link>
                  <Link to="my" params={{section: 'buyc2c2'}}><span>担保购买</span></Link>
                  <Link to="my" params={{section: 'sellc2c2'}}><span>担保出售</span></Link>
                </li>
                <li>
                  <p  className="subtle">我的寄卖</p>
                  <Link to="my" params={{section: 'buy'}}><span>我的订单</span></Link>
                  <div className="controls">
                    {
                      buySections.map( (data) =>
                          <ButtonNormal key={data.code} className={`ButtonNormal ${this.state.status1===data.code?' active':''}`} text={data.name} onClick = {this.handleBuySection(data.code)}/>
                      )
                    }
                  </div>
                  <Link to="my" params={{section: 'sell'}}><span>上线物品</span></Link>
                  <div className="controls">
                    <ButtonNormal className={`ButtonNormal ${this.state.status3===0?' active':''}`} text="上线物品" onClick = {this.handleOnSaleSection(0)}/>
                  </div>
                  <Link to="my" params={{section: 'end'}}><span>历史物品</span></Link>
                  <div className="controls">
                    <ButtonNormal className={`ButtonNormal ${this.state.status4===0?' active':''}`} text="历史物品" onClick = {this.handleOffSaleSection(0)}/>
                  </div>
                  <Link to="my" params={{section: 'apply'}}><span>我的申请</span></Link>
                  <div className="controls">
                    {
                      applySections.map( (data) =>
                        <ButtonNormal className={`ButtonNormal ${this.state.status2===data.code?' active':''}`} text={data.name} onClick = {this.handleApplySection(data.code)}/>
                      )
                    }
                  </div>
                </li>
                <li>
                  <p  className="subtle">我的信息</p>
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
