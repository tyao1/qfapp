'use strict';
import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import PageStore from '../../stores/PageStore';
import BookCard from '../BookCard';
import ButtonNormal from '../ButtonNormal';

import PageConstants from '../../constants/PageConstants';
import PageActions from '../../actions/PageActions';

require('./ItemShowcase.scss');


const ItemShowcase = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    console.log('page change');
    this.setState({
      items: PageStore.getHome(),
      failMsg: PageStore.getFailMsg()
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
  componentWillUnmount(){
    PageStore.removeChangeListener(this._onPageChange);
  },
  handleRetry(){
    PageActions.refresh();
  },
  render() {
    const items = this.state.items;
    let elem;
    if(items===PageConstants.PAGE_KEY_NULL){
      elem = <img src="./facebook.svg" />;
    }
    else if(items===PageConstants.PAGE_KEY_FAILURE){
      elem = <div className="failure">
          <p>啊哦，加载失败了</p>
          <p>{this.state.failMsg}</p>
          <ButtonNormal text="重试" onClick={this.handleRetry}/>
        </div>;
    }
    else if(!items.length){
      elem = <div className="failure"><p>ლ(＾ω＾ლ)新东西都被卖完啦</p></div>
    }
    else{
      elem = items.map(data => <BookCard key={data.goods_id} item={data}/>);
    }
    return (
      <div className="itemShowcase">
        {elem}
      </div>
    );
  }
});

export default ItemShowcase;
