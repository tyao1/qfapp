'use strict';

import React from 'react';
import Banner from '../Banner';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import DetailStore from '../../stores/DetailStore';
import DetailConstants from '../../constants/DetailConstants';
import Counter from '../Counter';

import ButtonNormal from '../ButtonNormal';
import {addtocart, time, itemsleft, renren, weibo, tencent, douban, qzone, wechat} from '../SVGs';

import BookCard from '../BookCard';
import QRCode from 'qrcode.react';
import CartActions from '../../actions/CartActions';
import DetailActions from '../../actions/DetailActions';

import ImageView from '../ImageView';
import Modal from '../Modal';

import UserStore from '../../stores/UserStore';
require('./ItemDetailPage.scss');

function thisUrl(){
  return encodeURIComponent(window.location.href);
}

const ItemDetailPage = React.createClass({
  mixins: [PureRenderMixin],
  getTitle(){
    return encodeURIComponent('在清风上看到了一件好东西：' + this.state.detail.price + '元的' + this.state.detail.name + '，买买买！');
  },
  getImgPath(){
    return encodeURIComponent('http://qfplan.com' + this.state.detail.img[0].path);
  },
  _onDetailChange(){
    const detail = DetailStore.getDetail();
    console.log('get detail', detail);
    if(detail!==this.state.detail){
      this.setState({
        detail,
        num: 1
      });
    }
    else{
      this.setState({
        detail
      });
    }
  },



  _onScroll(){
    this.setState({
      isScrolled: window.pageYOffset > 42
      });
  },
  getInitialState(){
    return {
      detail: DetailStore.getDetail(),
      num: 1,
      wechatOpen: false,
    };
  },

  componentWillMount(){
    DetailStore.addChangeListener(this._onDetailChange);
    window.addEventListener('scroll', this._onScroll);

  },
  componentWillUnmount(){
    DetailStore.removeChangeListener(this._onDetailChange);
    window.removeEventListener('scroll', this._onScroll);

  },
  handleCounterChange(num){
    this.setState({num});
  },
  handleBuyClick(){
    let {type_id, goods_name, price, nickname,sum ,sold_num, book_num, img, is_qf, ps} = this.state.detail;
    sum = sum - sold_num - book_num;
    let path = img[0].path;
    CartActions.cartAdd({
      goods_id: DetailStore.getCurId(),
      type_id, goods_name, sum, price, nickname, path, is_qf, ps,
      num: this.state.num
    });
  },
  handleRetry(){
    DetailActions.refresh();
  },

  handleRenren(){
    let url = `http://widget.renren.com/dialog/share?resourceUrl=${thisUrl()}&srcUrl=${thisUrl()}&title=${this.getTitle()}&pic=${this.getImgPath()}&description=${this.state.detail.detail}`;
    window.open(url, '_blank');
  },
  handleSina(){
    let url = `http://v.t.sina.com.cn/share/share.php?url=${thisUrl()}&title=${this.getTitle()}&pic=${this.getImgPath()}`;
    window.open(url, '_blank');
  },
  handleTencent(){
    let url = `http://v.t.qq.com/share/share.php?title=${this.getTitle()}&url=${thisUrl()}&site=清风&pic=${this.getImgPath()}`;
    window.open(url, '_blank');
  },
  handleDouban(){
    let url = `http://www.douban.com/recommend/?url=${thisUrl()}&title=${this.getTitle()}&image=${this.getImgPath()}`;
    window.open(url, '_blank');
  },
  handleTencentZone(){
    let url = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${thisUrl()}&title=${this.getTitle()}&site=清风&pics=${this.getImgPath()}&desc=${this.state.detail.detail}`;
    window.open(url, '_blank');
  },
  handleWechatClose(){
    this.setState({wechatOpen: false});
  },
  handleWechat(){
    this.setState({wechatOpen: true});
  },
  render() {

    const detail = this.state.detail;
    const max = detail.sum - detail.sold_num - detail.book_num;
    let elem;
    if(detail === DetailConstants.DETAIL_KEY_NULL)
    {
      document.title = '载入中 - 清风';
      elem = <div className="itemDetailPage">
          <div className="brief">
            <div className="inner">
              <img src="./facebook.svg" />
            </div>
          </div>
        </div>;
    }
    else if(detail === DetailConstants.DETAIL_KEY_NOT_FOUND)
    {
      document.title = '咦，找不到ლ(・∀・ )ლ - 清风';
      elem = <div className="itemDetailPage">
        <div className="brief">
          <div className="inner">
            <div className="words">
              <p className="itemName">咦，找不到这个物品ლ(・∀・ )ლ</p>
            </div>
          </div>
        </div>
      </div>;
    }
    else if(detail === DetailConstants.DETAIL_KEY_FAILURE)
    {
      document.title = '加载失败ლ(・∀・ )ლ - 清风';
      elem = <div className="itemDetailPage">
          <div className="brief">
            <div className="inner">
              <div className="words">
                <p className="itemName">加载出错了~</p>
                <ButtonNormal text="重试" onClick={this.handleRetry}/>
              </div>
            </div>
          </div>
        </div>;
    }
    else{
      document.title = detail.goods_name + ' - 清风';
      elem = <div className="itemDetailPage">
        <div className="brief">
          <div className="inner">
            <div className="words">
              <p className="itemName">{detail.goods_name}</p>
              <p className="price">{
                detail.is_qf==='S'?
                  detail.ps
                  : detail.price?'¥' + detail.price.toFixed(2):'免费'
              }</p>
            </div>
            {
              detail.tokenoff?
                <div className={`controls${this.state.isScrolled?' isScrolled':''}`}><p className="off">{'抱歉>_<，该物品已经下架'}</p></div>
                :
                <div className={`controls${this.state.isScrolled?' isScrolled':''}`}>
                  <div className="amount">
                    <span className="title">剩余数量：{max}</span>
                    {
                      max?
                        <Counter initValue={this.state.num} OnValueChange={this.handleCounterChange} max={max} min={1}/>
                        :
                        <Counter initValue={0} max={0} min={0}/>
                    }

                  </div>
                  <div className="totalPrice">
                    <span className="title">总价</span>
                      {
                        max?
                        <p>¥{(detail.price * this.state.num).toFixed(2)}</p>
                        :
                        <p>0.00</p>

                    }
                  </div>
                  {
                    max?
                      <ButtonNormal text="加入购物车" svg={addtocart} onClick={this.handleBuyClick}/>
                      :
                      <ButtonNormal text="卖完了" svg={addtocart} />
                  }
                </div>
            }

          </div>

        </div>
        {
          detail.isTemp?
            <main>
              <div className="inner">
                <img src="./facebook.svg" />
              </div>
            </main>:
          <div>
            <main>
              <div className="inner">
                <div className="gallery">
                  <ImageView images={detail.img} />
                </div>
                <ul className="brief">
                  <li>
                    {time}
                    <div className="words">
                      <p className="title">剩余时间</p>
                      <p className="value">{Math.round((parseInt(detail.limit_time) - Date.now()/1000) / (60 * 60 * 24))}天</p>
                    </div>
                  </li>
                  <li>
                    {itemsleft}
                    <div className="words">
                      <p className="title">已经售出</p>
                      <p className="value">{detail.sold_num}件</p>
                    </div>
                  </li>

                </ul>
                <div className="detail">
                  <p className="quote">"</p>
                  <p>{detail.detail?
                    detail.detail.split('\\n').map( para => <p>{para}</p>)
                    :'(ง •̀_•́)ง┻━┻卖家很懒，什么介绍都没写～'}</p>
                </div>
              </div>
            </main>
          <div className="seller">
            <div className="inner">
              <div className="info">
                <img src={detail.upath}/>
                <div className="words">
                  <p className="user">{detail.nickname}</p>
                  <p className="subtle">{detail.signature}</p>
                </div>
              </div>
              <div className="share">
                <span>分享</span>
                <ul>
                  <li onClick={this.handleSina}>{weibo}</li>
                  <li onClick={this.handleRenren}>{renren}</li>
                  <li onClick={this.handleTencentZone}>{qzone}</li>
                  <li onClick={this.handleWechat}>{wechat}</li>
                  <li onClick={this.handleTencent}>{tencent}</li>
                  <li onClick={this.handleDouban}>{douban}</li>
                </ul>
                <Modal isOpen={this.state.wechatOpen} onClose={this.handleWechatClose}>
                  <div className="wechatShare">
                    <h2>扫一扫，分享给好友</h2>
                    <QRCode value={window.location.href} size={200}/>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
            </div>
        }

      </div>;
    }
    return (
      <div>
        {elem}
      </div>
    );
  }
});

export default ItemDetailPage;
