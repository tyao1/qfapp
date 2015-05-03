'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import {close} from '../SVGs';

require('./ItemRegisterForm.scss');

function priceToFloat(price){
  if(price[price.length-1]==='.'){
    price.substring(0,price.length-1)
  }
  return parseFloat(price);
}
const ItemRegisterForm = React.createClass({


  /*
    props: onValueChange func(key, value)
   */

  mixins: [PureRenderMixin],
  returnPriceChange(val){
    this.props.onValueChange('price', val);
  },
  returnNameChange(val){
    this.props.onValueChange('name', val);
  },
  returnDetailChange(val){
    this.props.onValueChange('detail', val);
  },
  returnTimeChange(val){
    this.props.onValueChange('time', val);
  },
  returnNumChange(val){
    this.props.onValueChange('num', val);
  },

  getInitialState(){
    return {

    };
  },

  handleNameChange(e){
    //this.setState({name: e.target.value});
    this.returnNameChange(e.target.value);
  },

  handlePriceChange(e){
    //price因为小数点原因，需要保留字符串状态
    let price = e.target.value||0;
    if(price==='.'){
      //0.
      //this.setState({price: '0.'});
      this.returnPriceChange(price);
    }
    else {
      const priceOnly = /^\d+\.?\d{0,2}$/;
      if (priceOnly.test(price)) {
        if (/^0\d+$/.test(price)) {
          //移除无用0
          price = price.substring(1);
        }
        //if (!isNaN(price)) {
        //this.setState({price: price});
        this.returnPriceChange(price);
        //}
      }
    }
  },

  handleAmountChange(e){
    let num = e.target.value;
    if(!num){
      //this.setState({num: 0});
      this.returnNumChange(0);
    }
    else {
      const numOnly = /^\d+$/;
      if (numOnly.test(num)) {
        //因为是数字，所以parseInt肯定工作，保留int状态
        //this.setState({num: parseInt(e.target.value)});
        this.returnNumChange(parseInt(e.target.value));

      }
    }
  },
  handleTimeSpanChange(e){
    //this.setState({timeSpan: e.target.value});
    this.returnTimeChange(e.target.value);
  },
  handleDetailChange(e){
    if(e.target.value.length<=300) {
      //this.setState({detail: e.target.value});
      this.returnDetailChange(e.target.value);
    }
  },
  addAmount(){
    //this.setState({num: data.num+1});
    this.returnNumChange(this.props.data.num + 1);
  },
  reduceAmount(){
    if(this.props.data.num>1){
      //this.setState({num: data.num-1});
      this.returnNumChange(this.props.data.num-1);
    }
  },

  addPrice(){
    let price = (priceToFloat(this.props.data.price)+1).toFixed(2);
    //this.setState({price});
    this.returnPriceChange(price);
  },
  reducePrice(){
    if(this.props.data.price>=1){
      let price = (priceToFloat(this.props.data.price)+1).toFixed(2);
      //this.setState({price});
      this.returnPriceChange(price);
    }
  },

  render: function() {
    const data = this.props.data;
    return (
      <div className="itemRegisterForm">
        <div className="left">
          <div className="inputEffectLong">
            <input type="text" value={data.name} onChange={this.handleNameChange}/>
            <label className={data.name.length?'active':null} >物品名称</label>
          </div>

          <div className="inputEffect price">
            <span>¥</span>
            <input type="text" value={data.price} onChange={this.handlePriceChange}/>
            <label className='active'>价格</label>
              <div className="controls">
                <button onClick={this.addPrice}>+</button>
                <button onClick={this.reducePrice}>-</button>
              </div>
          </div>


          <div className="inputEffect">
            <input type="text" value={data.num} onChange={this.handleAmountChange}/>
            <label className='active'>数量</label>
            <div className="controls">
              <button onClick={this.addAmount}>+</button>
              <button onClick={this.reduceAmount}>-</button>
            </div>
          </div>

          <div className="inputEffect">
            <select value={data.timeSpan} onChange={this.handleTimeSpanChange}>
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
            <textarea value={data.detail} onChange={this.handleDetailChange}/>
            <label className={data.detail.length?'active':null} >详细描述</label>
            <span className="wordsCount">{data.detail.length}/300</span>
          </div>
        </div>

      </div>
    );
  }
});

export default ItemRegisterForm;
