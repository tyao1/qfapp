'use strict';

import React from 'react';

require('./InputNormal.scss');

export default class InputNormal extends React.Component {

  render() {
    var { src, ...others } = this.props;

    return (
      <div className="InputNormal">
          <input {...others} ref="input" key="input" />
          <img src={src}/>
      </div>
    );
  }

}

InputNormal.propTypes = {
};

InputNormal.defaultProps = {
};
