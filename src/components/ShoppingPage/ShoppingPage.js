'use strict';

import React from 'react';
import Banner from '../Banner';

import Counter from '../Counter';
import CartListItem from '../CartListItem';

import Cart from '../Cart';

require('./ShoppingPage.scss');


const ShoppingPage = React.createClass({
  render() {
    return (
      <div className="cart-page-main-container">
        <Cart/>

      </div>
    );
  }
});

export default ShoppingPage;
