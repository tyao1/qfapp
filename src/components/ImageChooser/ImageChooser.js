'use strict';

import React from 'react';
import cn from 'classnames';
import ButtonNormal from '../ButtonNormal';
import ImageGallery from '../ImageGallery';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import {close} from '../SVGs';

require('./ImageChooser.scss');

const ImageView = React.createClass({

  mixins: [PureRenderMixin],

  onFileChange(e){

    if ( e.target.files && e.target.files[0] ) {
      let file = e.target.files[0];
      var FR= new FileReader();
      FR.onload = (ev) =>{
        this.props.onSetImage({
          src: ev.target.result,
          path: file
        });
      };
      FR.readAsDataURL(file);
    }
  },

  render() {
    const {index, data: {src}} = this.props;
    return (
      <div className="imageChooser">
        <input id={'imageChooser'+index} type="file" accept="image/jpeg" onChange={this.onFileChange}/>
        <label htmlFor={'imageChooser'+index}>{src?<img src={src}/>:'+'}</label>
      </div>
    );
  }

});

ImageView.propTypes = {
  // image src
  // index
  // func onSetImage
};

ImageView.defaultProps = {
};

export default ImageView;
