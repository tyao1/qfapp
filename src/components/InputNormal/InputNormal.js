/*
 * svg - svg文件
 * bindValue - 绑定value属性
 * bindChange - 绑定onChange事件
 *
 */

'use strict';

import React from 'react';

require('./InputNormal.scss');

const InputNormal = React.createClass({

  render() {
    var { svg, ...others } = this.props;
    var img;
    if(svg){
      img = <div className="svgWrapper">{svg}</div>;
    }
    return (
      <div className="InputNormal">
          <input {...others} />
        {img}
      </div>
    );
  }
});

InputNormal.propTypes = {
};

InputNormal.defaultProps = {
};
export default InputNormal;
