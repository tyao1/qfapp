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
    return (
      <div className="cartListItem">
        <img src={this.props.image} />
        <section className="big">
          <span>{this.props.itemType}</span>
          <p>{this.props.itemName}</p>
        </section>
        <section className="small">
          <span>总量：{this.props.max}</span>
          <Counter initValue={this.props.num} OnValueChange={this.handleCounterChange} max={this.props.max}/>
        </section>
        <section>
          <span>卖家</span>
          <p>{this.props.name}</p>
        </section>
        <section>
          <span>价格</span>
          <p>
            {'￥ ' + this.props.price}
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
