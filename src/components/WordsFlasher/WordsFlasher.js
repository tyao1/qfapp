'use strict';
import React from 'react';
//import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

require('./WordsFlasher.scss');



const WordsFlasher = React.createClass({
  GoNext(){
    this.setState({curCount: (this.state.curCount + 1) % this.props.words.length});
  },
  getInitialState(){
    return {curCount: 0};
  },
  componentDidMount(){
    setInterval(this.GoNext, 2700);
  },
/*
 * ReactCSSTransitionGroup有bug，暂时废弃
 * <ReactCSSTransitionGroup transitionName="wf">
 *   <span key={'k'+this.state.curCount}>{word}</span>
 * </ReactCSSTransitionGroup>
 */
  render(){
    //let word = this.props.words[(this.state.curCount)%this.props.words.length];
    //let words = this.props.words;
    return (
      <span className="wordsFlasher">
        {this.props.words.map((ele,i)=>
          <span className={this.state.curCount===i||(this.state.curCount-1)%this.props.words.length===i?'active':null} key={i}>{ele}</span>
        )}
      </span>
    );
  }
});

WordsFlasher.defaultProps = {
  words: ['交通工具',
    '书籍课本',
    '生活电器',
    '手机数码',
    '体育用具']
};

export default WordsFlasher;
