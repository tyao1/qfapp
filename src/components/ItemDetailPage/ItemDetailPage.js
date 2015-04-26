'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import DetailStore from '../../stores/DetailStore';
import DetailConstants from '../../constants/DetailConstants';
import Counter from '../Counter';

import ButtonNormal from '../ButtonNormal';
import {shoppingcart} from '../SVGs';

import BookCard from '../BookCard';

import CartActions from '../../actions/CartActions';
require('./ItemDetailPage.scss');


const ItemDetailPage = React.createClass({
  mixins: [PureRenderMixin],
  getCurrentID(){
    return this.context.router.getCurrentParams().id;
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  _onDetailChange(){
    const detail = DetailStore.getDetail(this.getCurrentID());
    if(detail!==this.state.detail){
      this.setState({
        detail,
        num: 1
      });
    }
    else{
      this.setState({
        detail
      });
    }
  },

  getInitialState(){
    return {
      detail: DetailStore.getDetail(this.getCurrentID()),
      num: 1
    };
  },



  componentWillUpdate(){

  },
  componentWillMount(){
    DetailStore.addChangeListener(this._onDetailChange);

  },
  componentWillUnMount(){
    DetailStore.removeChangeListener(this._onDetailChange);
  },
  handleCounterChange(num){
    this.setState({num});
  },
  handleBuyClick(){
    /*
     itemType: '书籍',
     itemName: '论演员的自我修养',
     num: 1,
     max: 3,
     price: 3.0,
     nickname :'没名字能用了啊',
     path: ''
     */
    let {itemType, itemName, max, price, nickname, path} = this.state.detail;

    CartActions.cartAdd({
      itemType, itemName, max, price, nickname, path,
      num: this.state.num
    });
  },
  render() {

    const detail = this.state.detail;
    console.log('hey detail', detail);
    let elem;
    if(detail === DetailConstants.DETAIL_KEY_NULL)
    {
      elem = <div className="itemDetailPage">
          <div className="brief">
          </div>
        </div>;
    }
    else{
      elem = <div className="itemDetailPage">
        <div className="brief">
          <div className="inner">
            <div className="words">
              <p className="itemName">{detail.itemName}</p>
              <p className="price">¥ {detail.price.toFixed(2)}</p>
            </div>
            <div className="controls">
              <div className="amount">
                <span className="title">数量（总量：{detail.max}）</span>
                <Counter initValue={this.state.num} OnValueChange={this.handleCounterChange} max={detail.max}/>
              </div>
              <div className="totalPrice">
                <span className="title">总价</span>
                <p>¥{(detail.price * this.state.num).toFixed(2)}</p>
              </div>
              <ButtonNormal text="购买" svg={shoppingcart} onClick={this.handleBuyClick}/>
            </div>
          </div>

        </div>
        <div className="inner">
          <main>
            <div className="gallery">
              <img src={require('./testimg.png')}/>
              <img src={require('./testimg.png')}/>
              <img src={require('./testimg.png')}/>
            </div>
            <div className="detail">
              <h2>详细描述</h2>
              <p>{detail.detail}</p>
            </div>
            <div className="seller">
              <h2>卖家信息</h2>
              <div className="info">
                <p>{detail.nickname}</p>
              </div>
            </div>
          </main>
          <div className="side">
            这里应该有标签
          </div>
        </div>
      </div>;
    }
    return (
      <div>
        {elem}
      </div>
    );
  }
});

export default ItemDetailPage;
