'use strict';
import React from 'react';
require('./WordsFlasher.scss');

let curCount = 0;

const WordsFlasher = React.createClass({
  GoNext(){
    curCount=++curCount%this.props.words.length;
    this.render();

  },
  componentWillMount(){

  },
  componentDidMount(){
    setInterval(this.GoNext, 1000);
  },

  render(){
    return (
      <span className="WordsFlasher">
        <span>{this.props.words[(curCount+1)%this.props.words.length]}</span>
        <span className="active">{this.props.words[curCount]}</span>
      </span>
    );
  }
});

WordsFlasher.defaultProps={
  words: ['电子用品', '书籍', '小物件', '优惠券']
};

export default WordsFlasher;
