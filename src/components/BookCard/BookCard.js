'use strict';

import React from 'react';
import ButtonNormal from '../ButtonNormal';
import {shoppingcart} from '../SVGs';
import CartActions from '../../actions/CartActions';
import DetailActions from '../../actions/DetailActions';
import router from '../../router';
import Types from '../../utils/Types';

require('./BookCard.scss');


const BookCard = React.createClass({

  handleBuyClick(){
    let item = this.props.item;
    item.num = 1;
    CartActions.cartAdd(item);
  },
  handleDetailClick(){
    DetailActions.getNewDetail(this.props.item);
    console.log('temp detail',this.props.item);
  },
  render() {
    const item = this.props.item;
    console.log('Book Card', item);
    return (
      <div className="bookCard">
        <div className="top" onClick={this.handleDetailClick}>
          <div className="detail">
            <span>查看详情</span>
          </div>
          <img src={item.path}/>
        </div>
        <div className="content">
          <div className="seller">
            <img src={item.upath}/>
            <div className="controls">
              {item.nickname}
            </div>
          </div>
          <span>{Types[item.type_id]||'未知'}</span>
          <p>{item.name}</p>
          <div className="shop">
            <span className="price">¥{item.price.toFixed(2)}</span>
            <ButtonNormal text="购买" svg={shoppingcart} onClick={this.handleBuyClick}/>
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
