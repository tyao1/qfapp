'use strict';

import React from 'react';
require('./OrderItem.scss');

const OrderItem = React.createClass({

  render() {
    return (
      <div className="orderItem">
          hello everyone!
      </div>
    );
  }
});

OrderItem.propTypes = {
};

OrderItem.defaultProps = {
};

export default OrderItem;
