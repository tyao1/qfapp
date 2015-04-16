'use strict';

import React from 'react';
import Banner from '../Banner';


require("./ItemRegisterForm.scss");


const ItemRegisterForm = React.createClass({
  render: function() {
    return (
      <div className="itemRegisterForm">
        <div className="border-clip-left"></div>

        <div className="left">
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

        <div className="delete">
          <button><img src={require('./iconfont-close.svg')} /></button>
        </div>

        <div className="right">
          <textarea placeholder="详细描述"/>
        </div>

      </div>
    );
  }
});

export default ItemRegisterForm;
