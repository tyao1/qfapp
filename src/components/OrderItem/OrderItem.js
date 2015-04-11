'use strict';

import React from 'react';
require('./OrderItem.scss');

const OrderItem = React.createClass({

  render() {
    const data = this.props.data;
    let time;
    let remains;
    if(data.status === 4){
      let date = new Date(data.time*1000);

      time = '上架时间：'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDay()+' '+ date.getHours()+':'+date.getMinutes();
      remains = '剩余天数：' + (((data.time+60*60*24*30*data.timeSpan - Date.now()/1000) / (60*60*24) ) | 0) + '天'; //BITWISE OR
    }
    else{
      time = '请耐心等待';
      remains = "尚未上架"
    }



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
                查看数
              </p>
              <p className="main">
                {data.views}
              </p>
            </li>
            <li className="one">
              <p className="minor">
                销售状态
              </p>
              <p className="main">
                售卖中
              </p>
            </li>
          </ul>
          <ul className="detail">
            <li className="three">
              {data.img?
                <img src="http://www.qfplan.com/Public/images/logo1.jpg" />:
                null
              }
              <p className="minor">
                书籍
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
                {data.num}
              </p>
            </li>
            <li className="one">
              <p className="minor">
                单价
              </p>
              <p className="main">
                ¥{data.price.toFixed(2)}
              </p>
            </li>
            <li className="one">
              <p className="minor">
                总价
              </p>
              <p className="main">
                ¥{(data.price * data.num).toFixed(2)}
              </p>
            </li>
          </ul>

      </div>
    );
  }
});

OrderItem.propTypes = {
};

OrderItem.defaultProps = {
};

export default OrderItem;
