'use strict';

import React from 'react';

require('./InputNormal.scss');

export default class InputNormal extends React.Component {

  render() {
    var { svg, ...others } = this.props;
    var img;
    if(svg){
      img = <div className="svgWrapper">{svg}</div>;
    }
    return (
      <div className="InputNormal">
          <input {...others} ref="input" key="input" />
        {img}
      </div>
    );
  }
}

InputNormal.propTypes = {
};

InputNormal.defaultProps = {
};
