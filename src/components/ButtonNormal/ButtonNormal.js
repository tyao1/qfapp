'use strict';

import React from 'react';

require('./ButtonNormal.scss');

export default class ButtonNormal extends React.Component {

  render() {
    var { text, ...others } = this.props;

  return (
      <button className="ButtonNormal">
        {text}
      </button>
    );
  }

}

ButtonNormal.propTypes = {
};

ButtonNormal.defaultProps = {
};
