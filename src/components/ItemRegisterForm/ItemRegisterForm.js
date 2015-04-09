'use strict';

import React from 'react';
import Banner from '../Banner';


require("./ItemRegisterForm.scss");


var ItemInfoInputs = React.createClass({
  render: function() {
    return (
      <div className="item-info-inputs-container">
        <div className="left-part-container">
        <div className="name-input-container">
          <div className="group">
            <input id="name-input" type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>物品名称</label>
          </div>
        </div>

        <div className="other-inputs-container">
          <div className="group">
            <input type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>价格</label>
          </div>

          <div className="group">
            <input type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>分类</label>
          </div>
        </div>

        <div className="other-inputs-container">
          <div className="group">
            <input type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>数量</label>
          </div>

          <div className="group">
            <input type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>出售时长</label>
          </div>
        </div>
        </div>

        <div className="delete-button-container">
          <button><img src={require('./iconfont-close.svg')} /></button>
        </div>

        <div className="right-part-container">
            <textarea placeholder="详细描述"/>
        </div>

      </div>
    );
  }
});

const ItemRegisterForm = React.createClass({
  render: function() {
    return (
    <div className="item-register-form-main-container">
      <form method="post" action="">
        <ItemInfoInputs />
      </form>
    </div>);
  }
});

export default ItemRegisterForm;
