'use strict';

import React from 'react';
import Banner from '../Banner';

import {close} from '../SVGs';

require("./ItemRegisterForm.scss");


const ItemRegisterForm = React.createClass({

  getInitialState(){

    return {
      name: '',
      price: '0.00',
      num: 1,
      timeSpan: 5,
      detail: ''


    };
  },

  handleNameChange(e){
    this.setState({name:e.target.value})
  },

  handlePriceChange(e){
    //price因为小数点原因，需要保留字符串状态
    let price = e.target.value||0;
    if(price==='.'){
      //0.
      this.setState({price: '0.'});
    }
    else {
      const priceOnly = /^\d+\.?\d{0,2}$/;
      if (priceOnly.test(price)) {
        if (/^0\d+$/.test(price)) {
          //移除无用0
          price = price.substring(1);
        }
        //if (!isNaN(price)) {
        this.setState({price: price})
        //}
      }
    }
  },

  handleAmountChange(e){
    let num = e.target.value;
    if(!num){
      this.setState({num:0});
      }
    else {
      const numOnly = /^\d+$/;
      if (numOnly.test(num)) {
        //因为是数字，所以parseInt肯定工作，保留int状态
        this.setState({num: parseInt(e.target.value)})
      }
    }
  },
  handleTimeSpanChange(e){
    this.setState({timeSpan: e.target.value});
  },
  handleDetailChange(e){
    this.setState({detail:e.target.value})
  },
  addAmount(){

    this.setState({num: this.state.num+1})

  },
  reduceAmount(){
    if(this.state.num>1){
      this.setState({num: this.state.num-1})
    }
  },

  render: function() {
    return (
      <div className="itemRegisterForm">
        <div className="left">
          <div className="inputEffectLong">
            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
            <label className={this.state.name.length?'active':null} >物品名称</label>
          </div>

          <div className="inputEffect price">
            <span>¥</span>
            <input type="text" value={this.state.price} onChange={this.handlePriceChange}/>
            <label className='active'>价格</label>
          </div>


          <div className="inputEffect">
            <input type="text" value={this.state.num} onChange={this.handleAmountChange}/>
            <label className='active'>数量</label>
            <div className="controls">
              <button onClick={this.addAmount}>+</button>
              <button onClick={this.reduceAmount}>-</button>
            </div>
          </div>

          <div className="inputEffect">
            <select value={this.state.timeSpan} onChange={this.handleTimeSpanChange}>
              <option value="5">5个月</option>
              <option value="4">4个月</option>
              <option value="3">3个月</option>
              <option value="2">2个月</option>
              <option value="1">1个月</option>
            </select>
            <label className='active'>出售时长</label>
          </div>

        </div>

        <div className="delete" onClick={this.props.onClose}>
          {close}
        </div>

        <div className="right">
          <div className="textareaEffect">
            <textarea value={this.state.detail} onChange={this.handleDetailChange}/>
            <label className={this.state.detail.length?'active':null} >详细描述</label>
          </div>
        </div>

      </div>
    );
  }
});

export default ItemRegisterForm;
