'use strict';

import React from 'react';
import OrderAPIUtils from '../../utils/OrderAPIUtils';
import Types from '../../utils/Types';
require('./BuyOrderItem.scss');

const BuyOrderItem = React.createClass({

  render() {
    const data = this.props.data;
    let time;
    let remains;
    let date = new Date(data.time);
    time = '下单时间：' + OrderAPIUtils.dateToString(date);
    if(data.f_time) {
      date = new Date(data.t_time);
      remains = '完成时间：' + OrderAPIUtils.dateToString(date);
    }
    else{
      remains = '订单未完成';
    }

    //remains = '剩余天数：' + (((data.time + 60 * 60 * 24 * 30 * data.timeSpan - Date.now() / 1000) / (60 * 60 * 24) ) | 0) + '天'; //BITWISE OR

    return (
      <div className="orderItem">
        <ul className="title">
          <li className="three">
            <p className="minor">
              {time}
            </p>
            <p className="main">
              {remains}
            </p>
          </li>
          <li className="two">
            <p className="minor">
              订单编号
            </p>
            <p className="main">
              {data.b_mid==='000000'?'无':data.b_mid}
            </p>
          </li>
          <li className="one">
            <p className="minor">
              订单状态
            </p>
            <p className="main">
              {OrderAPIUtils.buyStatus[data.status]}
            </p>
          </li>
        </ul>
        {
          data.detail.map( item =>
            <ul className="detail">
              <li className="three">
                <img src={item.path} />
                <p className="minor">
                  {Types[item.type_id]||'未知'}
                </p>
                <p className="main">
                  {item.name}
                </p>
              </li>
              <li className="one">
                <p className="minor">
                  总数
                </p>
                <p className="main">
                  {item.num}
                </p>
              </li>
              <li className="one">
                <p className="minor">
                  总价
                </p>
                <p className="main">
                  ¥{(item.price * item.num).toFixed(2)}
                </p>
              </li>
              <li className="one">
                <p className="minor">
                  卖家
                </p>
                <p className="main">
                  {item.nickname}
                </p>
              </li>
            </ul>

          )
        }


      </div>
    );
  }
});

BuyOrderItem.propTypes = {
};

BuyOrderItem.defaultProps = {
};

export default BuyOrderItem;
