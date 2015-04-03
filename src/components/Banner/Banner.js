'use strict';

import React from 'react';
import invariant from 'react/lib/invariant';
import {RouteHandler, Link} from 'react-router';
import InputNormal from '../InputNormal';
import AppStore from '../../stores/AppStore';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import cn from 'classnames';

import {coffecup} from '../SVGs';

require('./Banner.scss');



function getIsHome(){
  return {
    isHome: AppStore.getIsHome()
  };
}
function getScrollState(){
  return {
    isScrolled: window.pageYOffset>574-84
  };
}
const Banner = React.createClass({
  //不用担心不必要的rerender辣
  mixins: [PureRenderMixin],

  _onChange(){
    let tmp = getIsHome();
    this.setState(tmp);
    if(tmp.isHome) {
      window.addEventListener('scroll', this._onScroll);
    }
    else{
      window.removeEventListener('scroll', this._onScroll);
    }
  },
  _onScroll(){
    this.setState(getScrollState());
  },
  getInitialState(){
    return getIsHome();
  },
  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount(){
    AppStore.removeChangeListener(this._onChange);
  },

  render() {
    var isHome = this.state.isHome;
    var classes;
    if(isHome) {
      classes = cn('banner', {isHome}, {notScrolled: !this.state.isScrolled});
    }
    else{
      classes = 'banner';
    }


    return (
      <div className={classes}>
        <div className="inner">
          <div className="left">
            <Link to="home"><img className="logo" src={require('./logo.png')}/></Link>
            <InputNormal placeholder="输入你想要买或者卖的内容" svg={coffecup}/>
          </div>
          <div className="right">
              <ul>
                <li><Link to="shop" data-name="浏览物品"><span>浏览物品</span></Link></li>
                <li><Link to="sell" data-name="出售物品"><span>出售物品</span></Link></li>
                <li><Link to="orders" data-name="我的订单"><span>我的订单</span></Link></li>
              </ul>
          </div>
        </div>
      </div>
    );
  }

});

export default Banner;
