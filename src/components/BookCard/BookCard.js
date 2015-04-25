'use strict';

import React from 'react';
import ButtonNormal from '../ButtonNormal';
import {shoppingcart} from '../SVGs';
import CartActions from '../../actions/CartActions';
import DetailActions from '../../actions/DetailActions';
import router from '../../router';

require('./BookCard.scss');


const BookCard = React.createClass({

  handleBuyClick(){
    CartActions.cartAdd(this.props.item);
  },
  handleDetailClick(){
    DetailActions.getNewDetail(this.props.item);
  },
  render() {
    const item = this.props.item;
    return(
      <div className="bookCard">
        <div className="top" onClick={this.handleDetailClick}>
          <div className="detail">
            <span>查看详情</span>
          </div>
          <img src={item.thumbnail}/>
        </div>
        <div className="content">
          <div className="seller">
            <img src={item.path}/>
          </div>
          <span>{item.itemType}</span>
          <p>{item.itemName}</p>
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
