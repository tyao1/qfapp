import React from 'react';

require('./Counter.scss');

const Counter = React.createClass({
  getInitialState: function() {
    return {
      amount: this.props.initValue,
      max: this.props.max||1,
      min: this.props.min||1
    };
  },

  minusOne: function(e) {
    if (this.state.amount <= this.state.min) { return; }
    let value = this.state.amount - 1;
    this.setState({amount: value});
    this.onValueChange(value);
  },

  plusOne: function(e) {
    if(this.state.amount===this.state.max) {return; }
    let value = this.state.amount + 1;
    this.setState({amount: value});
    this.onValueChange(value);
  },

  handleChange: function(e) {
    let value = e.target.value ? parseInt(e.target.value) : this.state.min;
    if(value>this.state.max) value = this.state.max;
    this.setState({amount: value});
    this.onValueChange(value);
  },
  onValueChange(num){
    this.props.OnValueChange(num);
  },
  render: function(){
    return (
      <div className="counter">
        <button className="minus" type="button" onClick={this.minusOne}>-</button>
        <input className="number" type="text" pattern="[0-9]*" value={this.state.amount}
               onChange={this.handleChange}></input>
        <button className="plus" type="button" onClick={this.plusOne}>+</button>
      </div>
    );
  }
});

export default Counter;
