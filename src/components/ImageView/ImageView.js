'use strict';

import React from 'react';
import cn from 'classnames';
import ButtonNormal from '../ButtonNormal';
import ImageGallery from '../ImageGallery';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import {close} from '../SVGs';

require('./ImageView.scss');

const ImageView = React.createClass({

  mixins: [PureRenderMixin],
  getInitialState(){

    let imgArray = [];
     for(let i=0;i<this.props.images.length;i++){
       let img = this.props.images[i].path;

       /*
       imgArray.push({
         original: 'https://a1.muscache.com/ic/pictures/73134841/c90b9ef5_original.jpg',
         thumbnail: 'https://a1.muscache.com/ic/pictures/73134841/c90b9ef5_original.jpg'
       });
    imgArray.push({
      original: 'https://a1.muscache.com/ic/pictures/73134841/c90b9ef5_original.jpg',
      thumbnail: 'https://a1.muscache.com/ic/pictures/73134841/c90b9ef5_original.jpg'
    });
    imgArray.push({
      original: 'https://a1.muscache.com/ic/pictures/73134841/c90b9ef5_original.jpg',
      thumbnail: 'https://a1.muscache.com/ic/pictures/73134841/c90b9ef5_original.jpg'
    });
    */
       imgArray.push({
          original: img,
          thumbnail: img.replace('Uploads/','Uploads/Thumb/')
        });
     }
    return{
      viewOpen: false,
      imgArray
    }
  },

  handleImgClick(i){
    return ()=>{
      this.refs.gallery.slideToIndex(i);
      this.setState({
        viewOpen: true
      });
    }
  },
  handleCloseClick(){
    this.setState({
      viewOpen: false
    });
  },
  componentDidUpdate(){
    if(this.state.viewOpen){
      window.addEventListener('keydown', this.handleKeyPress);
    }
    else{
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  },
  handleKeyPress(event){
    if(event.keyCode===27){
      this.handleCloseClick();
    }
  },
  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  render() {
    const images = this.props.images;
    let img;

    return (
      <div className="imageView">
        <div className="images">
          {
            images.map((img,i) => {
                if(i===0) return <img key={i} src={img.path} onClick={this.handleImgClick(i)}/>;
                if(i<3) return <img key={i} src={img.path.replace('Uploads/','Uploads/Thumb/')} onClick={this.handleImgClick(i)}/>;
              }
            )
          }
        </div>
        <div className="count">
          {images.length?<ButtonNormal text={'查看' + images.length + '张照片'} onClick={this.handleImgClick(0)}/>:null}
        </div>
        <div className={`galleryWrapper${this.state.viewOpen?' active':''}`}>
          <a className="close" onClick={this.handleCloseClick}>{close}</a>
          <div className="inner">
            <ImageGallery key={this.props.images.path} ref="gallery" items={this.state.imgArray} showThumbnails={true} showBullets={true}/>
          </div>
        </div>
      </div>
    );
  }

});

ImageView.propTypes = {
};

ImageView.defaultProps = {
};

export default ImageView;
