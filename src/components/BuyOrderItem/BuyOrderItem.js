'use strict';

import React from 'react';
import OrderAPIUtils from '../../utils/OrderAPIUtils';
import Types from '../../utils/Types';
import ButtonNormal from '../ButtonNormal';
import DetailActions from '../../actions/DetailActions';

require('./BuyOrderItem.scss');

const BuyOrderItem = React.createClass({
  handleCancelClick(id){
    return ()=> {
      this.props.cancelClick(id);
    }
  },

  handleItemClick(data){
    return ()=>{
      DetailActions.getNewDetail(data);
    }
  },

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
    else if(data.status==6){
      remains = '取货时间' + data.delivery;
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
            <p className={`main${data.status==6?' small':''}`}>
              {remains}
            </p>
          </li>
          <li className="one">
            <p className="minor">
              订单编号
            </p>
            <p className="main">
              {data.b_mid==='000000'?'无':data.b_mid}
            </p>
          </li>
          {
            (data.status==1||data.status==6)? <li className="one">
              <p className="minor">
                取消订单
              </p>
              <p className="main">
                <ButtonNormal className="ButtonNormal cancel" text="取消" onClick={this.handleCancelClick(data.book_id)}/>
              </p>
            </li>
              :
              <li className="one"><p className="main"></p></li>
          }
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
            <ul key={item.goods_id} className="detail">
              <li className="three itemInfo" onClick={this.handleItemClick(item)}>
                <img src={item.path} />
                <p className="minor">
                  {Types[item.type_id]||'未知分类'}
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
