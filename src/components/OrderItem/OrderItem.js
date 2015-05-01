'use strict';
//申请
import React from 'react';
import OrderAPIUtils from '../../utils/OrderAPIUtils';
import Types from '../../utils/Types';
import ButtonNormal from '../ButtonNormal';
require('./OrderItem.scss');


const OrderItem = React.createClass({
  handleCancelClick(id){
    return ()=>{
      this.props.cancelClick(id);
    }

  },
  render() {
    const data = this.props.data;
    let time;
    let remains;
    let date = new Date(data.time);
    time = '提交时间：' + OrderAPIUtils.dateToString(date);

    remains = '宿舍楼号：' + data.b_no;


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
            data.reason? <li className="two">
              <p className="minor">
                取消原因
              </p>
              <p className="main">
                {data.reason}
              </p>
            </li>:data.status==1?
              <div><li className="one"><p className="main"></p></li>
              <li className="one">
                <p className="minor">取消订单</p>
                <p className="main">
                  <ButtonNormal className="ButtonNormal cancel" text="申请取消" onClick={this.handleCancelClick(data.app_id)}/>
                </p>
              </li></div> :
              <li className="two">
                <p className="minor">
                </p>
                <p className="main">
                </p>
              </li>
          }

          <li className="one">
            <p className="minor">
              订单状态
            </p>
            <p className="main">
              {OrderAPIUtils.applyStatus[data.status]}
            </p>
          </li>

          {

          }
        </ul>
        {
          data.detail.map( item =>
              <ul key={item.process_id} className="detail">
                <li className="three">
                  <p className="minor">
                    {'过期时间：' + OrderAPIUtils.dateToString(new Date(item.t_limit))}
                  </p>
                  <p className="main">
                    {item.name}
                  </p>
                </li>
                {
                  data.status==='5'?
                    <li className="one">
                      <p className="minor">
                        物品状态
                      </p>
                      <p className="main">
                        {OrderAPIUtils.applyItemStatus[item.status]}
                      </p>
                    </li>:
                    <li className="one">
                      <p className="minor">
                      </p>
                      <p className="main">
                      </p>
                    </li>
                }

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
                    单价
                  </p>
                  <p className="main">
                    ¥{item.price.toFixed(2)}
                  </p>
                </li>

              </ul>

          )
        }


      </div>
    );
  }
});


OrderItem.propTypes = {
};

OrderItem.defaultProps = {
};

export default OrderItem;
