'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import PageStore from '../../stores/PageStore';
import BookCard from '../BookCard';
import ButtonNormal from '../ButtonNormal';
import PageConstants from '../../constants/PageConstants';
import PageActions from '../../actions/PageActions';
import Types from '../../utils/Types';
import Counter from '../Counter';

const TypeIDs = ['000000', '100000', '110000', '120000', '130000', '140000', '150000'];

require('./ShoppingPage.scss');


const ShoppingPage = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    console.log('shopping change');

    this.setState({
      items: PageStore.getItems(),
      failMsg: PageStore.getFailMsg(),
      currentType: PageStore.getType(),
      currentPage: PageStore.getPage()
    });
  },

  getInitialState(){
    return {
      items: PageStore.getItems(),
      currentType: PageStore.getType(),
      currentPage: PageStore.getPage()
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
  handleTypeClick(key){
    return () => {
      PageActions.setNewType(key);
    };
  },
  handlePageChange(page){
    PageActions.changePage(page);
  },
  render() {
    const items = this.state.items;
    let elem, max;
    if(items===PageConstants.PAGE_KEY_NULL){
      elem = <img src="./facebook.svg" />;
    }
    else if(items===PageConstants.PAGE_KEY_FAILURE){
      elem = <div className="failure">
        <p>啊哦，加载失败了</p>
        <p>this.state.failMsg</p>
        <ButtonNormal text="重试" onClick={this.handleRetry}/>
      </div>;
    }
    else
    {
      if(items.length) {
        elem = items.map(data => <BookCard key={data.goods_id} item={data}/>);
        max = 99999999999;
      }
      else{
        elem = <div className="failure">{'>_<没有找到物品'}</div>;
        max = this.state.currentPage;
      }
    }
    console.log(items);
    return (
      <div className="shoppingPage">
        <div className="inner">
          <div className="nav">
            <h3>类别</h3>
            <div className="types">
              {
                TypeIDs.map((key)=>
                   <ButtonNormal key={key} text={Types[key]} onClick={this.handleTypeClick(key)}  className={key===this.state.currentType?'ButtonNormal active':'ButtonNormal'} />
                )
              }
            </div>
          </div>
          <div className="main">
            <div className="items">
              {elem}
            </div>
            <div className="pagination">
              <Counter initValue={this.state.currentPage} OnValueChange={this.handlePageChange} max={max}/>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

export default ShoppingPage;
