//initValue: int

'use strict';

import React from 'react';

import {edit} from '../SVGs';
import Modal from '../Modal';
import DetailActions from '../../actions/DetailActions';
import DetailStore from '../../stores/DetailStore';
import ButtonNormal from '../ButtonNormal';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

require('./ItemPriceChange.scss');

function priceToFloat(price){
  if(price[price.length-1]==='.'){
    price.substring(0,price.length-1)
  }
  return parseFloat(price);
}

const ItemPriceChange = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState(){
    return {
      price: this.props.initValue || 0.0,
      modalOpen: false,
      updatingPrice: DetailStore.getUpdatingPrice(),
      msgPrice: DetailStore.getMsgPrice(),
      successPrice: DetailStore.getSuccessPrice()
    }
  },
  _onDetailChange(){
    this.setState({
      updatingPrice: DetailStore.getUpdatingPrice(),
      msgPrice: DetailStore.getMsgPrice(),
      successPrice: DetailStore.getSuccessPrice()
    })
  },
  componentWillMount(){
    DetailStore.addChangeListener(this._onDetailChange);

  },
  componentWillUnmount(){
    DetailStore.removeChangeListener(this._onDetailChange);
  },
  handleModalToggle(){
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  },
  returnPriceChange(price){
    this.setState({
      price
    });
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
  addPrice(){
    let price = (priceToFloat(this.state.price)+1).toFixed(2);
    //this.setState({price});
    this.returnPriceChange(price);
  },
  reducePrice(){
    if(this.state.price>=1){
      let price = (priceToFloat(this.state.price)-1).toFixed(2);
      //this.setState({price});
      this.returnPriceChange(price);
    }
  },
  handleSend(){
    if(!this.state.updatingPrice) {
      let price = this.state.price;
      if(price[price.length-1]==='.'){
        price.substring(0,price.length-1)
      }
      price = parseFloat(price).toFixed(2);
      DetailActions.updatePrice({
        id: this.props.id,
        price
      });
    }
  },
  render() {
    return (
      <div className="itemPriceChange">
        <div className="svgWrapper" onClick={this.handleModalToggle}>
          {edit}
        </div>
        <Modal isOpen={this.state.modalOpen} onClose={this.handleModalToggle}>

          <h2>价格修改</h2>
          <p>{this.state.msgPrice}</p>
          {this.state.successPrice?
            <div className="inner">
              <h3>价格修改成功！</h3>
              <ButtonNormal text="关闭" onClick={this.handleModalToggle}/>
            </div>
          :
            <div className="inner">
              <div className="inputEffect price">
                <span>¥</span>
                <input type="text" value={this.state.price} onChange={this.handlePriceChange}/>
                <label className='active'>价格</label>
                <div className="controls">
                  <button onClick={this.addPrice}>+</button>
                  <button onClick={this.reducePrice}>-</button>
                </div>
              </div>
              <ButtonNormal text={this.state.isRegistering?'修改中……':'修改价格'} onClick={this.handleSend}/>

            </div>
          }

        </Modal>
      </div>

    );
  }
});

ItemPriceChange.propTypes = {
};

ItemPriceChange.defaultProps = {
};
export default ItemPriceChange;
