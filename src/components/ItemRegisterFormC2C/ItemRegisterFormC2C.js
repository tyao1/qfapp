'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import InputEffect from '../InputEffect';
import ImageChooser from '../ImageChooser';
import Types from '../../utils/Types';
import {close} from '../SVGs';

require('./ItemRegisterFormC2C.scss');

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
    this.props.onValueChange('goods_name', val);
  },
  returnDetailChange(val){
    this.props.onValueChange('detail', val);
  },
  returnTimeChange(val){
    this.props.onValueChange('timeSpan', val);
  },
  returnTypeChange(val){
    this.props.onValueChange('type_id', val);
  },
  returnNumChange(val){
    this.props.onValueChange('sum', val);
  },
  returnPSChange(val){
    this.props.onValueChange('ps', val);
  },

  getInitialState(){
    return {
      sellType: 0
    };
  },
  handlePSChange(e){
    this.returnPSChange(e.target.value);
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
  handleTypeChange(e){
    this.returnTypeChange(e.target.value);
  },
  handleTimeSpanChange(e){
    this.returnTimeChange(e.target.value);
  },

  handleDetailChange(e){
    if(e.target.value.length<=300) {
      //this.setState({detail: e.target.value});
      this.returnDetailChange(e.target.value);
    }
  },


  handleSetImage(index){
    return (dataUrl)=>{
      this.props.onImageChange(index, dataUrl);
    }
  },
  handleSellTypeClick(type){
    if(type===0){
      return ()=>{
        this.props.onValueChange('price', 0);
        this.setState({
          sellType:type
        })
      }
    }
    else{
      return ()=>{
        this.setState({sellType:type})
      }
    }
  },
  addAmount(){
    //this.setState({num: data.num+1});
    this.returnNumChange(this.props.data.get('sum') + 1);
  },
  reduceAmount(){
    if(this.props.data.get('sum')>1){
      //this.setState({sum: data.sum-1});
      this.returnNumChange(this.props.data.get('sum')-1);
    }
  },

  addPrice(){
    let price = (priceToFloat(this.props.data.get('price'))+1).toFixed(2);
    //this.setState({price});
    this.returnPriceChange(price);
  },
  reducePrice(){
    if(this.props.data.get('price')>=1){
      let price = (priceToFloat(this.props.data.get('price'))-1).toFixed(2);
      //this.setState({price});
      this.returnPriceChange(price);
    }
  },

  render: function() {
    const data = this.props.data.toJS();
    const {sellType} = this.state;
    return (
      <div className="itemRegisterFormC2C">
        <h2 className="sellType"><span className={sellType===0?'active':null} onClick={this.handleSellTypeClick(0)}>担保交易</span> | <span className={sellType===1?'active':null} onClick={this.handleSellTypeClick(1)}>自由交易</span></h2>
        <div className="left">
          <div className="inputEffectLong">
            <InputEffect tmpPlaceHolder="╰(*°▽°*)╯ 至少4个字" label="物品名称" type="text" value={data.goods_name} onChange={this.handleNameChange}/>

          </div>
          {
            sellType===0?
              <div className="inputEffect price">
                <span>¥</span>
                <input type="text" value={data.price} onChange={this.handlePriceChange}/>
                <label className='active'>价格</label>
                <div className="controls">
                  <button onClick={this.addPrice}>+</button>
                  <button onClick={this.reducePrice}>-</button>
                </div>
              </div>
              :
              <div className="inputEffect">
                <input type="text" value={data.ps} onChange={this.handlePSChange} placeholder="一杯奶茶"/>
                <label className='active'>交易条件</label>
              </div>
          }

          <div className="inputEffect">
            <input type="text" value={data.sum} onChange={this.handleAmountChange}/>
            <label className='active'>数量</label>
            <div className="controls">
              <button onClick={this.addAmount}>+</button>
              <button onClick={this.reduceAmount}>-</button>
            </div>
          </div>

          <div className="inputEffect">
            <select value={data.timeSpan} onChange={this.handleTimeSpanChange}>
              <option value={10}>10个月</option>
              <option value={8}>8个月</option>
              <option value={6}>6个月</option>
              <option value={4}>4个月</option>
              <option value={2}>2个月</option>
            </select>
            <label className='active'>出售时长</label>
          </div>

          <div className="inputEffect">
            <select value={data.type_id} onChange={this.handleTypeChange}>
              {
                Object.keys(Types).map((key) => {
                  if (key!=='000000') {
                    return <option value={key}>{Types[key]}</option>
                  }
                })
              }
            </select>
            <label className='active'>物品分类</label>
          </div>

        </div>



        <div className="right">
          <div className="textareaEffect">
            <textarea value={data.detail} onChange={this.handleDetailChange}/>
            <label className={data.detail.length?'active':null} >详细描述</label>
            <span className="wordsCount">{data.detail.length}/300</span>
          </div>
          <div className="pics">
            {
              data.imgs.map((data, index) => {
                return <ImageChooser index={index} data={data} onSetImage={this.handleSetImage(index)}/>
              })
            }
          </div>
        </div>

      </div>
    );
  }
});

export default ItemRegisterForm;
/*
 <div className="delete" onClick={this.props.onClose}>
 {close}
 </div>
 */
