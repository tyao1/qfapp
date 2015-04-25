'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import PageStore from '../../stores/PageStore';
import PageConstants from '../../constants/PageConstants';

require('./ItemDetailPage.scss');


const ItemDetailPage = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    this.setState({

    });
  },

  getInitialState(){
    return {

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
    console.log(items);
    return (
      <div className="itemDetailPage">
        <div className="inner">
          this is detail page!!!
        </div>
      </div>
    );
  }
});

export default ItemDetailPage;
