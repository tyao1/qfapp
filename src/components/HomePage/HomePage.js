'use strict';

import React from 'react';
import Banner from '../Banner';
import InputLarge from '../InputLarge';
import ButtonNormal from '../ButtonNormal';
import WordsFlasher from '../WordsFlasher';
import RegForm from '../RegForm';
import Modal from '../Modal';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import router from '../../router';

import BookCard from '../BookCard';
import ItemShowcase from '../ItemShowcase';

import {coffecup, shoppingbag, truck} from '../SVGs';
import PageStore from '../../stores/PageStore';
import PageActions from '../../actions/PageActions';

require('./HomePage.scss');



const HomePage = React.createClass({
  mixins: [PureRenderMixin],

  _onPageChange(){
    this.setState({
      searchText: PageStore.getKeyWord()
    })
  },

  componentDidMount(){
    document.title='清风 | 轻松交易闲置物品';
  },
  componentWillMount(){
    PageStore.addChangeListener(this._onPageChange);
  },
  componentWillUnmount(){
    PageStore.removeChangeListener(this._onPageChange);
  },

  getInitialState(){
    return {
      openedHow: false,
      textHow: '我们如何运作'
    };
  },
  handleHowClick(){
    console.log('how click');
    if(this.state.openedHow) {
      this.setState({
        openedHow: false,
        textHow: '我们如何运作'
      });
    }
    else{
      this.setState({
        openedHow: true,
        textHow: '回到搜索'
      });
    }
  },
  handleGoShoppingClick(){
    //this.setState({isGoShopping:true});
    router.transitionTo('shop');
  },
  handleSearchKey(e){
    if(e.keyCode===13){
      let text = this.state.searchText.substr(0,20);
      PageActions.setNewKeyword(text);
    }
  },
  handleSearchChange(e){
    this.setState({searchText: e.target.value});
  },
  handleSearchButton(){
    let text = this.state.searchText.substr(0,20);
    PageActions.setNewKeyword(text);
  },


  render() {
    return (
      <div className="homePage">
        <section className="FirstSection">
          <div className="inner">
            <h3 className="subtle">最便捷二手物品交易平台</h3>
            <h1 className="main">轻松购买闲置的<WordsFlasher/></h1>
            <InputLarge placeholder="键入你想买或想卖的物品" btnText="搜索" svg={coffecup} value={this.state.searchText} onChange={this.handleSearchChange} onKeyUp={this.handleSearchKey} buttonOnClick={this.handleSearchButton}/>
            <div className={`how${this.state.openedHow?' active':''}`}>
              <ul className="inner">
                <li>
                  <h2>收</h2>
                  <p>您在清风发布闲置物品，我们派专人上门收取物件</p>
                </li>
                <li>
                  <h2>存</h2>
                  <p>我们将您的物件拍照，小心存放在我们的仓库中</p>
                </li>
                <li>
                  <h2>售</h2>
                  <p>在我们的网站上购买您喜欢的闲置物品；而卖家在物品售出后，将会获得自己的收入</p>
                </li>
              </ul>
            </div>
            <ButtonNormal className={`ButtonNormal${this.state.openedHow?' opened':''}`} text={this.state.textHow} onClick={this.handleHowClick}/>

          </div>
        </section>
        <section className="SecondSection">
          <header>
            {shoppingbag}
            <h2>每日新品</h2>
            <p>想淘最新最好的便宜货，就在这里</p>
          </header>
          <main>
            <ItemShowcase/>
          </main>
          <ButtonNormal text="前去淘货" onClick={this.handleGoShoppingClick}/>
        </section>
        <section className="ThirdSection">
          <svg height="100" viewBox="0 40 100 100" preserveAspectRatio="none"><path d="M-5 100q5-80 10 0zm5 0q5-100 10 0m-5 0q5-70 10 0m-5 0q5-90 10 0m-5 0q5-70 10 0m-5 0q5-110 10 0m-5 0q5-90 10 0m-5 0q5-70 10 0m-5 0q5-90 10 0m-5 0q5-50 10 0m-5 0q5-80 10 0m-5 0q5-60 10 0m-5 0q5-40 10 0m-5 0q5-50 10 0m-5 0q5-80 10 0m-5 0q5-55 10 0m-5 0q5-70 10 0m-5 0q5-80 10 0m-5 0q5-50 10 0m-5 0q5-75 10 0m-5 0q5-85 10 0z"/></svg>
          <div className="inner">
            {truck}
            <div className="left">
              <h3 className="minor">拥有闲置物品？</h3>
              <h2 className="huge">在清风上出售<br/>享受前所未有的便利</h2>
              <p className="more">只需轻敲键盘，我们的工作人员就会上门收件，替您完成闲置物品的保管和运送，一旦交易成功，我们就会将收入支付给您。</p>
            </div>
            <div className="right">
              <RegForm/>
            </div>
          </div>
        </section>
        <footer>
          <div className="inner">
            <div className="left">
              <h3>关于清风</h3>
              <p>欢迎关注我们的公众号</p>
              <img className="qr" src={require('./code.png')}/>
            </div>

            <div className="left">
              <h3>清风福利</h3>
              <p>我们目前正在为毕业季学生提供寄存服务！ <br/>关注我们的公众号了解详情<br/>欢迎尝试！</p>
            </div>

            <div className="right">
              <h3>联系我们</h3>
              <p>直接用公众号吧，或者可以联系文科：<br/>wenke@qfplan.com</p>
            </div>

            <div className="copyright">
              Copyright © 2015 清风
            </div>
          </div>


        </footer>
      </div>
    );
  }
});
export default HomePage;
