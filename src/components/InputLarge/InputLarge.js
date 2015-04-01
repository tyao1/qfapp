'use strict';

import React from 'react';
import cn from 'classnames';

require('./InputLarge.scss');

export default class InputLarge extends React.Component {

  render() {
    var { src, btnText, ...others } = this.props;
    let img,btn
    if(btnText){
      btn = <button>{btnText}</button>
    }
    if(img){
      img = <img src={src}/>
    }
    let classes = cn('InputLarge',{btn});
    return (
      <div className={classes}>
        <input {...others} ref="input" key="input" />
        {img}{btn}
      </div>
    );

  }

}

InputLarge.propTypes = {
};

InputLarge.defaultProps = {
};
