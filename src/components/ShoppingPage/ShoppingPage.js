'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import PageStore from '../../stores/PageStore';
import BookCard from '../BookCard';
import ButtonNormal from '../ButtonNormal';
import PageConstants from '../../constants/PageConstants';
import PageActions from '../../actions/PageActions';

require('./ShoppingPage.scss');


const ShoppingPage = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    console.log('shopping change');

    this.setState({
      items: PageStore.getItems()
    });
  },

  getInitialState(){
    return {
      items: PageStore.getItems()
    };
  },


  componentWillMount(){
    console.log('shopping mount');
    PageStore.addChangeListener(this._onPageChange);

  },
  componentWillUnmount(){
    console.log('shopping unmount');
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
        <ButtonNormal text="重试" onClick={this.handleRetry}/>
      </div>;
    }
    else
    {
      elem = items.map(data => <BookCard item={data}/>);
    }
    console.log(items);
    return (
      <div className="shoppingPage">
        <div className="inner">
          <div className="nav">
            <h3>类别</h3>
            <p>所有</p>

          </div>
          <div className="main">
            <div className="items">
              {elem}
            </div>
          </div>
        </div>

      </div>
    );
  }
});

export default ShoppingPage;
