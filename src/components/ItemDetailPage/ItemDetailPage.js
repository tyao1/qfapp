'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import DetailStore from '../../stores/DetailStore';
import DetailConstants from '../../constants/DetailConstants';


import BookCard from '../BookCard';
require('./ItemDetailPage.scss');


const ItemDetailPage = React.createClass({
  mixins: [PureRenderMixin],
  getCurrentID(){
    return this.context.router.getCurrentParams().id;
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  _onDetailChange(){
    this.setState({
      detail: DetailStore.getDetail(this.getCurrentID())
    });
  },

  getInitialState(){
    return {
      detail: DetailStore.getDetail(this.getCurrentID())
    };
  },



  componentWillUpdate(){

  },
  componentWillMount(){
    DetailStore.addChangeListener(this._onDetailChange);

  },
  componentWillUnMount(){
    DetailStore.removeChangeListener(this._onDetailChange);
  },

  render() {

    const detail = this.state.detail;
    console.log('hey detail',detail);
    let elem;
    if(detail === DetailConstants.DETAIL_KEY_NULL)
    {
      elem = <div className="itemDetailPage">
          <div className="brief">
          </div>
        </div>;
    }
    else{
      elem = <div className="itemDetailPage">
        <div className="brief">
          <div className="inner">
            <div className="words">
              <p className="itemName">{detail.itemName}</p>
              <p className="price">¥ {detail.price.toFixed(2)}</p>
            </div>
            <div className="controls">
              <div className="">

              </div>

            </div>
          </div>

        </div>
        <div className="inner">
          <BookCard item={{
              id: 'a1234',
              itemType:'书籍',
              itemName:'论演员的自我修养啊养',
              price:23,
              max: 3,
              nickname :'没名字能用了啊',
              path: ''
            }}/>
        </div>
      </div>
    }
    return (
      <div>
        {elem}
      </div>
    );
  }
});

export default ItemDetailPage;
