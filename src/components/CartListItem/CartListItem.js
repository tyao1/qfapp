'use strict';
import React from 'react';

import Counter from '../Counter';
import ButtonNormal from '../ButtonNormal';

require('./CartListItem.scss');


const CartListItem = React.createClass({

  getInitialState(){
    return {isDelete: false};
  },
  handleCounterChange(num){
    this.props.handleNumChange(num);
  },
  handleDelete(){
    this.setState({isDelete: true});
  },
  handleCancelDelete(){
    this.setState({isDelete: false});
  },
  handleRealDelete(){
    this.props.handleDelete();
  },
  render: function(){
    const item = this.props.data;
    return (
      <div className="cartListItem">
        <img src={item.path} />
        <section className="big">
          <span>{item.type_id}</span>
          <p>{item.name}</p>
        </section>
        <section className="small">
          <span>总量：{item.quality}</span>
          <Counter initValue={item.num} OnValueChange={this.handleCounterChange} max={item.quality}/>
        </section>
        <section>
          <span>卖家</span>
          <p>{item.nickname}</p>
        </section>
        <section>
          <span>价格</span>
          <p>
            {'￥ ' + item.price.toFixed(2)}
          </p>
        </section>
        {
          this.state.isDelete?
            <div className="controls">
              <ButtonNormal className="ButtonNormal caution" text="确认" onClick={this.handleRealDelete}/>
              <ButtonNormal text="取消" onClick={this.handleCancelDelete}/>
            </div>:
            <div className="controls">
              <ButtonNormal text="删除" onClick={this.handleDelete}/>
            </div>
        }
      </div>
    );
  }
});

export default CartListItem;