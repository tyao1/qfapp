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
    return parseInt(this.context.router.getCurrentParams().id);
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  _onDetailChange(){
    const detail = DetailStore.getDetail(this.getCurrentID());
    console.log('detail in comp', detail);
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
    let {type_id, name, price, nickname,quality ,sold_num, book_num, img} = this.state.detail;
    let max = quality - sold_num - book_num;
    let path = img[0].path;
    CartActions.cartAdd({
      type_id, name, max, price, nickname, path,
      num: this.state.num
    });
  },
  render() {

    const detail = this.state.detail;
    const max = detail.quality - detail.sold_num - detail.book_num;
    let elem;
    if(detail === DetailConstants.DETAIL_KEY_NULL)
    {
      elem = <div className="itemDetailPage">
          <div className="brief">
            <div className="inner">
              <img src="./facebook.svg" />
            </div>
          </div>
        </div>;
    }
    else if(detail === DetailConstants.DETAIL_KEY_FAILURE)
    {
      elem = <div className="itemDetailPage">
          <div className="brief">
            <div className="inner">
              <div className="words">
                <p className="itemName">加载出错了~<br/>请返回重试~</p>
              </div>
            </div>
          </div>
        </div>;
    }
    else if(detail.isTemp){
      elem = <div className="itemDetailPage">
        <div className="brief">
          <div className="inner">
            <div className="words">
              <p className="itemName">{detail.name}</p>
              <p className="price">¥ {detail.price.toFixed(2)}</p>
            </div>
          </div>

        </div>
        <div className="inner">
          <img className="loading" src="./facebook.svg" />
          <main>
            <div className="detail">
              <h2>详细描述</h2>
              <p>{detail.detail}</p>
            </div>
            <div className="seller">
              <h2>卖家信息</h2>
              <div className="info">
                <img src={detail.upath}/>
                <p>{detail.nickname}</p>
              </div>
            </div>
          </main>
        </div>
      </div>;
    }
    else{
      elem = <div className="itemDetailPage">
        <div className="brief">
          <div className="inner">
            <div className="words">
              <p className="itemName">{detail.name}</p>
              <p className="price">¥ {detail.price.toFixed(2)}</p>
            </div>
            <div className="amounts">
              <span className="title">总量：{detail.quality}件</span>
              <span className="title">已售出：{detail.sold_num}件</span>
              <span className="title">已预定：{detail.book_num}件</span>
            </div>

              {
                detail.tokenoff?
                  <div className="controls"><p className="off">{'抱歉>_<，该物品已经下架'}</p></div>
                  :
                  <div className="controls">
                    <div className="amount">
                      <span className="title">剩余数量：{max}</span>
                      {
                        max?
                          <Counter initValue={this.state.num} OnValueChange={this.handleCounterChange} max={max}/>
                          :
                          <Counter initValue={0} max={0}/>
                      }

                    </div>
                    <div className="totalPrice">
                      <span className="title">总价</span>
                        {
                          max?
                          <p>¥{(detail.price * this.state.num).toFixed(2)}</p>
                          :
                          <p>0.00</p>

                      }
                    </div>
                    {
                      max?
                        <ButtonNormal text="购买" svg={shoppingcart} onClick={this.handleBuyClick}/>
                        :
                        <ButtonNormal text="没有存货" svg={shoppingcart} />
                    }
                  </div>
              }

          </div>

        </div>
        <div className="inner">
          <main>
            <div className="gallery">
              {
                detail.img.map(img =>
                  <img src={img.path}/>
                )
              }
            </div>
            <div className="detail">
              <h2>详细描述</h2>
              <p>{detail.detail}</p>
            </div>
            <div className="seller">
              <h2>卖家信息</h2>
              <div className="info">
                <img src={detail.upath}/>
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
