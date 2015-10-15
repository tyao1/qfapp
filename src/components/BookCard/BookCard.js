'use strict';

import React from 'react';
import ButtonNormal from '../ButtonNormal';
import {addtocart} from '../SVGs';
import CartActions from '../../actions/CartActions';
import DetailActions from '../../actions/DetailActions';
import router from '../../router';
import Types, {OfficialTypes} from '../../utils/Types';

require('./BookCard.scss');


const BookCard = React.createClass({

  handleBuyClick(){
    let item = this.props.item;
    item.num = 1;
    CartActions.cartAdd(item);
  },
  handleDetailClick(e){
    e.preventDefault();
    DetailActions.getNewDetail(this.props.item);
    console.log('temp detail',this.props.item);
  },
  render() {
    const item = this.props.item;
    console.log('Book Card', item);
    return (
      <div className="bookCard">
        <a className="top" onClick={this.handleDetailClick} href={`/#/detail/${this.props.item.goods_id}`}>
          {
            OfficialTypes[item.is_qf]?
              <div className="official">
                <span>{OfficialTypes[item.is_qf]||''}</span>
              </div>:null
          }
          <div className="detail">
            <span>查看详情</span>
          </div>
          <img src={`/Thumb${item.path}`}/>
        </a>
        <div className="content">
          <div className="seller">
            <img src={item.path}/>
            <div className="controls">
              {item.nickname}
            </div>
          </div>
          <span>{Types[item.type_id]||'未知'}</span>
          <p>{item.goods_name}</p>
          <div className="shop">
            <span className="price">
              {
                item.is_qf==='S'?
                  item.ps
                  : item.price?'¥' + item.price.toFixed(2):'免费'
              }
            </span>
            {
              item.sum?<ButtonNormal text="购买" svg={addtocart} onClick={this.handleBuyClick}/>:
                <span className="soldOut">已售空</span>
            }
          </div>
        </div>
      </div>
    );
  }

});


BookCard.propTypes = {
};

BookCard.defaultProps = {
};

export default BookCard;
