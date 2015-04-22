import React from 'react';

import Counter from '../Counter';
import ButtonNormal from '../ButtonNormal';

require('./CartListItem.scss');


const CartListItem = React.createClass({


  handleCounterChange(num){
    this.props.handleNumChange(num);
  },
  handleDelete(){
    this.props.handleDelete();
  },
  render: function(){
    console.log('render!');
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
            {"￥ " + this.props.price}
          </p>
        </section>
        <ButtonNormal text="删除" onClick={this.handleDelete}/>

      </div>
    );
  }
});

export default CartListItem;
