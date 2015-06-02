'use strict';
import React from 'react';

require('./Counter.scss');

const Counter = React.createClass({
  getInitialState: function() {
    return {
      //amount: this.props.initValue,
      //max: this.props.max||1,
      //min: this.props.min||1
    };
  },

  minusOne: function() {
    if (this.props.initValue <= (this.props.min||1)) { return; }
    //let value = this.state.amount - 1;
    let value = this.props.initValue - 1;
    //this.setState({amount: value});
    this.onValueChange(value);
  },

  plusOne: function() {
    if(this.props.initValue === (this.props.max||1)) {return; }
    //let value = this.state.amount + 1;
    let value = this.props.initValue + 1;
    //this.setState({amount: value});
    this.onValueChange(value);
  },

  handleChange: function(e) {
    let value = e.target.value ? parseInt(e.target.value) : (this.props.min||1);
    if(value>(this.props.max || 1)) {
      value = (this.props.max || 1);
    }
    //this.setState({amount: value});
    this.onValueChange(value);
  },
  onValueChange(num){
    this.props.OnValueChange(num);
  },
  render: function(){
    return (
      <div className="counter">
        <button className={`minus${this.props.initValue<=this.props.min?' notAllowed':''}`} type="button" onClick={this.minusOne}>{this.props.isPage?'<':'-'}</button>
        <input className="number" type="text" pattern="[0-9]*" value={this.props.initValue}
               onChange={this.handleChange}></input>
        <button className={`plus${this.props.initValue>=this.props.max?' notAllowed':''}`} type="button" onClick={this.plusOne}>{this.props.isPage?'>':'+'}</button>
      </div>
    );
  }
});

export default Counter;
