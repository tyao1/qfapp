'use strict';

import React from 'react';

require('./InputLarge.scss');

export default class InputLarge extends React.Component {

  render() {
    var { src, ...others } = this.props;

  return (
    <div className="InputLarge">
      <input {...others} ref="input" key="input" />
      <img src={src}/>
    </div>
  );

}

}

InputLarge.propTypes = {
};

InputLarge.defaultProps = {
};
