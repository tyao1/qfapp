'use strict';

import React from 'react';
import cn from 'classnames';

require('./InputLarge.scss');

export default class InputLarge extends React.Component {

  render() {
    var { svg, btnText, ...others } = this.props;
    let img, btn;
    if(btnText){
      btn = <button data-text={btnText} onClick={this.props.buttonOnClick}><span>{btnText}</span></button>;
    }
    if(svg){
      img = <div className="svgWrapper">{svg}</div>;
    }
    let classes = cn('InputLarge', {btn});

    return (
      <div className={classes}>
        <input {...others}/>
        {img}
        {btn}
      </div>
    );

  }

}

InputLarge.propTypes = {
};

InputLarge.defaultProps = {
};
