'use strict';
import React from 'react';
require('./Pagination.scss');

const Pagination = React.createClass({
  minusOne() {
    if (this.props.initValue <= (this.props.min||1)) { return; }
    let value = this.props.initValue - 1;
    this.onValueChange(value);
  },

  plusOne() {
    if(this.props.initValue === (this.props.max||1)) {return; }
    let value = this.props.initValue + 1;
    this.onValueChange(value);
  },

  handleSelectPage(page) {
    return () => {
      this.onValueChange(page);
    }
  },

  handleChange(e) {
    let value = e.target.value ? parseInt(e.target.value) : (this.props.min||1);
    if(value>(this.props.max || 1)) {
      value = (this.props.max || 1);
    }
    this.onValueChange(value);
  },
  onValueChange(num){
    this.props.OnValueChange(num);
  },
  render: function(){
    // 显示当前页数附近页数
    let {initValue, span, max, min} = this.props;
    let startIndex = (initValue - 1) * span;
    let maxIndex = Math.round((max - startIndex - 1) / span);
    let rightMost = Math.min(maxIndex, 10) + initValue;
    let leftMost = Math.max(startIndex - 10, 1);
    console.log(leftMost,startIndex,rightMost);
    let left = [];
    let right = [];
    for (let i = initValue+1; i<= rightMost; i++){
      right.push(<li onClick={this.handleSelectPage(i)}>{i}</li>);
    }
    for (let i = leftMost; i< initValue;i++){
      left.push(<li onClick={this.handleSelectPage(i)}>{i}</li>);
    }
    return (
      <div className="pagination counter">
        <button className={`minus${initValue<=min?' notAllowed':''}`} type="button" onClick={this.minusOne}> {'<'} </button>
        <ul className="anchor">
          {left}
          <li className="current">{initValue}</li>
          {right}
        </ul>
        <button className={`plus${initValue > maxIndex?' notAllowed':''}`} type="button" onClick={this.plusOne}> {'>'} </button>
      </div>
    );
  }
});

export default Pagination;
