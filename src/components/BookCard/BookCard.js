'use strict';

import React from 'react';
import ButtonNormal from '../ButtonNormal';
import {shoppingcart} from '../SVGs';


require('./BookCard.scss');


const BookCard = React.createClass({


  render() {
    return(
      <div className="bookCard">
        <div className="top">

        </div>
        <div className="content">
          <span>书籍</span>
          <p>论演员的自我修养啊养啊养</p>

          <ButtonNormal text="¥23" svg={shoppingcart} />
        </div>
      </div>
    );
  }

});


BookCard.propTypes = {
};

BookCard.defaultProps = {
};

export default BookCard;
