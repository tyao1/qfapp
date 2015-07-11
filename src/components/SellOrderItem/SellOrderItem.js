'use strict';

import React from 'react';
import OrderAPIUtils from '../../utils/OrderAPIUtils';
import Types from '../../utils/Types';
import ItemPriceChange from '../ItemPriceChange';

require('./SellOrderItem.scss');

const SellOrderItem = React.createClass({

  render() {
    const data = this.props.data;
    let time;
    let remains;
    let date = new Date(data.start_time);
    time = '上架时间：' + OrderAPIUtils.dateToString(date);
    if(data.t_time) {
      date = new Date(data.t_time);
      remains = '下架时间：' + OrderAPIUtils.dateToString(date);
    }
    else{
      date = new Date(data.t_limit);
      remains = '到期时间：' + OrderAPIUtils.dateToString(date);
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
          {
            data.t_time?
              <li className="one">
                <p className="minor">
                  售出数量
                </p>
                <p className="main">
                  {data.sold_num}
                </p>
              </li>
              :
              <li className="two">
                <p className="minor">
                  售出数量
                </p>
                <p className="main">
                  {data.sold_num}
                </p>
              </li>
          }
          {data.t_time?<li className="one">
            <p className="minor">
              付款状态
            </p>
            <p className="main">
              {data.pay?'已经付款':'尚未付款'}
            </p>
          </li>:null
          }
          <li className="one">
            <p className="minor">
              销售状态
            </p>
            <p className="main">
              {data.t_time?OrderAPIUtils.offStatus[data.status]:OrderAPIUtils.sellStatus[data.status]}
            </p>
          </li>
        </ul>
        <ul className="detail">
          <li className="three">
            <img src={data.path.replace('Uploads/','Uploads/Thumb/')} />
            <p className="minor">
              {Types[data.type_id]||'未知'}
            </p>
            <p className="main">
              {data.name}
            </p>
          </li>
          <li className="one">
            <p className="minor">
              总数
            </p>
            <p className="main">
              {data.quality}
            </p>
          </li>
          <li className="one">
            <p className="minor">
              单价
            </p>
            <p className="main withButton">
              <span>¥{data.price.toFixed(2)}</span>
              <ItemPriceChange key={data.goods_id} initValue={data.price} id={data.goods_id}/>
            </p>
          </li>
          <li className="one">
            <p className="minor">
              总价
            </p>
            <p className="main">
              ¥{(data.price * data.quality).toFixed(2)}
            </p>
          </li>
        </ul>

      </div>
    );
  }
});

SellOrderItem.propTypes = {
};

SellOrderItem.defaultProps = {
};

export default SellOrderItem;
