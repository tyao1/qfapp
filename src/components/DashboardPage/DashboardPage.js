'use strict';

import React from 'react';
import OrderItem from '../OrderItem';
import RequireLogin from '../../mixins/RequireLogin';
require('./DashboardPage.scss');

const DashboardPage = React.createClass({
  mixins:[RequireLogin],
  render() {

    return (
      <div className="dashboard">
        <div className="inner">
          orderitem
          <OrderItem/>
        </div>
      </div>
    );
  }
});

DashboardPage.propTypes = {
};

DashboardPage.defaultProps = {
};
export default DashboardPage;
