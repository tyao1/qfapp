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
import Pagination from '../Pagination';

const TypeIDs = ['000000', '100000', '110000', '120000', '130000', '140000', '150000', '160000', '170000'];

require('./ShoppingPage.scss');


const ShoppingPage = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    console.log('shopping change');

    this.setState({
      items: PageStore.getItems(),
      failMsg: PageStore.getFailMsg(),
      currentType: PageStore.getType(),
      currentPage: PageStore.getPage(),
      currentKeyword: PageStore.getKeyWord(),
      hideSold: PageStore.getHideSold()
    });
  },

  getInitialState(){
    return {
      items: PageStore.getItems(),
      currentType: PageStore.getType(),
      currentPage: PageStore.getPage(),
      currentKeyword: PageStore.getKeyWord(),
      hideSold: PageStore.getHideSold()
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
  handleHideSoldChange(){
    PageActions.toggleHideSold();
  },
  render() {
    document.title = (this.state.currentKeyword?this.state.currentKeyword+' - ':'' ) + Types[this.state.currentType] + ' - 清风';
    const items = this.state.items;
    let elem, max;
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
    else
    {
      if(items.length) {
        elem = items.map(data => {
          if(this.state.hideSold&&!data.sum) {
            return null;
          }
          else{
            return <BookCard key={data.goods_id} item={data}/>;
          }
        });
        if(items.length>=24){
          max = 999999999;
        }
        else {
          max = this.state.currentPage;
        }
      }
      else{
        elem = <div className="failure"><p>{'>_<没有找到物品'}</p></div>;
        max = this.state.currentPage;
      }
    }

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
            <p className="info">{`${this.state.currentKeyword?'找找看'+this.state.currentKeyword:'浏览宝贝'}，第${this.state.currentPage}页`}<span className="refresh" onClick={this.handleRetry}>刷新</span>
              <label><input type="checkbox" checked={this.state.hideSold} onChange={this.handleHideSoldChange}/>隐藏已售出物品</label></p>
            <div className="items">
              {elem}
            </div>
            <div className="pagination">
              <Pagination initValue={this.state.currentPage} OnValueChange={this.handlePageChange} max={14} min={1} span={12}/>
            </div>

          </div>
        </div>

      </div>
    );
  }
});

export default ShoppingPage;
