/*
 * svg - svg文件
 * bindValue - 绑定value属性
 * bindChange - 绑定onChange事件
 *
 */

'use strict';

import React from 'react';

require('./InputEffect.scss');

const InputEffect = React.createClass({

  render() {
    var {  tmpPlaceHolder, label, svg, ...others } = this.props;
    var img;
    console.log(tmpPlaceHolder);
    if(svg){
      img = <div className="svgWrapper">{svg}</div>;
    }
    return (
      <div className="inputEffect">
        <input {...others}/>
        <label className={this.props.value.length?'active':null} >
          {img}{label}
        </label>
        <span className="placeholder">{tmpPlaceHolder}</span>
      </div>
    );
  }
});

InputEffect.propTypes = {
};

InputEffect.defaultProps = {
};

export default InputEffect;
