'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

require('./WordsFlasher.scss');



const WordsFlasher = React.createClass({
  GoNext(){
    this.setState({curCount: (this.state.curCount + 1) % this.props.words.length});
  },
  getInitialState(){
    return {curCount: 0};
  },
  componentDidMount(){
    setInterval(this.GoNext, 3500);
  },

  render(){
    let word = this.props.words[(this.state.curCount)%this.props.words.length];
    return (
      <span className="WordsFlasher">
        <ReactCSSTransitionGroup transitionName="wf">
          <span key={'k'+this.state.curCount}>{word}</span>
        </ReactCSSTransitionGroup>
      </span>
    );
  }
});

WordsFlasher.defaultProps = {
  words: ['电子用品', '书籍', '小物件', '优惠券']
};

export default WordsFlasher;
