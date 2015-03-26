'use strict';

import './InputNormal.scss';

import React from 'react';

export default class InputNormal extends React.Component {

  render() {
    return (
      <div className="InputNormal">
          <input {...this.props} className="InputNormal-input" ref="input" key="input" />}
      </div>
    );
  }

}

InputNormal.propTypes = {
  maxLines: React.PropTypes.number
};

InputNormal.defaultProps = {
  maxLines: 1
};
