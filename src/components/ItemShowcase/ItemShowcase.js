'use strict';
import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import PageStore from '../../stores/PageStore';
import BookCard from '../BookCard';

import PageConstants from '../../constants/PageConstants';
require('./ItemShowcase.scss');


const ItemShowcase = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    this.setState({
      items: PageStore.getHome()
    });
  },

  getInitialState(){
    return {
      items: PageStore.getHome()
    };
  },


  componentWillMount(){
    PageStore.addChangeListener(this._onPageChange);

  },
  componentWillUnMount(){
    PageStore.removeChangeListener(this._onPageChange);
  },

  render() {
    const items = this.state.items;
    let elem;
    if(items===PageConstants.PAGE_KEY_NULL){
      elem = <img src="./facebook.svg" />;
    }
    else if(items===PageConstants.PAGE_KEY_FAILURE){
      elem = <p>啊哦，加载失败了</p>
    }
    else
    {
      elem = items.map(data => <BookCard item={data}/>);
    }
    return (
      <div className="itemShowcase">
        {elem}
      </div>
    );
  }
});

export default ItemShowcase;
