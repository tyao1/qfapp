'use strict';

import React from 'react';

require('./ButtonNormal.scss');

export default class ButtonNormal extends React.Component {

  render() {
    var { text, svg, ...others } = this.props;
    var img;
    if(svg){
      img = <div className="svgWrapper">{svg}</div>;
    }
    return (
      <button className="ButtonNormal" data-text={text} {...others}>
        <span>{img}{text}</span>
      </button>
    );
  }

}

ButtonNormal.propTypes = {
};

ButtonNormal.defaultProps = {
};
