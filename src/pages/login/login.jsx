import React from 'react'
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;
import WrappedNormalLoginForm from './signin.jsx'

class Login extends React.Component {
    render = _ => <div className='login-wrapper'>
        <div className="header">
            <div style={{
                width: 385 + 'px',
                height: 51 + 'px',
                backgroundImage: `url(${require(`../../assets/img/images/logo.png`)})`
            }}></div>
        </div>
        <div className="content-wrapper" style={{
            width: 100 + '%',
            height: 464 + 'px',
            backgroundImage: `url(${require(`../../assets/img/images/bg.png`)})`
        }}>
            <div className="content">
                <div className="zzinfor">
                    <div className="title-header"></div>
                    <h5 className="infor-h5">带动消费打造最快的商家引流和圈粉平台</h5>
                    <p className="infor-p">以微信支付、支付宝支付的快捷支付为基础，向用户提供安全、快捷、高效的支付服务。</p>
                    <p className="infor-p">带动消费打造最快的商家引流和圈粉平台,以微信支付、支付宝支付的快捷支付为基础，向用户提供安全、快捷、高效的支付服务。</p>
                </div>
                <div className="zzlogin">
                    <div className="login-cont">
                        <div className="login-btn"></div>
                        <WrappedNormalLoginForm></WrappedNormalLoginForm>
                        <div className="login-qr">
                            <div className="login-form-name">扫码登录</div>
                            <div className="login-form-qr"></div>
                            <div className="login-form-dec">请使用手机扫码登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="message">
            <div className="lasted-news">
                <div className="lasted-title"></div>
                <ul className="newsitems">
                    <li className="news-item">
                        <span className="lasted-date">[7.25]</span>
                        <a className="lasted-cont" href="">关于赞赞买单手机版上线的时...</a>
                        <div className="newicon"></div>
                    </li>
                    <li className="news-item">
                        <span className="lasted-date">[7.25]</span>
                        <a className="lasted-cont" href="">关于赞赞买单手机版上线的时...</a>
                        <div className="newicon"></div>
                    </li>
                    <li className="news-item">
                        <span className="lasted-date">[7.25]</span>
                        <a className="lasted-cont" href="">关于赞赞买单手机版上线的时...</a>
                        <div className="newicon"></div>
                    </li>
                </ul>
                <a className="morenews">更多公告>></a>
            </div>
            <div className="dynamic">
                <div className="dynamic-state">
                    <div className="state-title"><div className="state-logo"></div>赞赞动态</div>
                    <ul className="state-list">
                        <li className="state-items">
                            <div className="state-date">
                                <div className="date">26</div>
                                <div className="year">2017-07</div>
                            </div>
                            <div className="item-cont">新闻，也叫消息，是通过报纸、电台、广播、电视台等媒体途径所传播信息的一种称谓。是记录社会、传播信息、反映时代的一种文体。新闻概念有广义与狭义之分。广义上:除了发表于报刊、广播、互联网、电视上的评论与专文外的常用文本都属于新闻，包括消息、通讯、特写、速写(有的将速写纳入特写之列)等等;狭义上:消息是用概括的叙述方式，以较简明扼要的文字，迅速及时地报道附近新近发生的、有价值的事实，使一定人群了解。新闻一般包括标题、导语、主体、背景和结语五部分。</div>
                        </li>
                        <li className="state-items">
                            <div className="state-date">
                                <div className="date">26</div>
                                <div className="year">2017-07</div>
                            </div>
                            <div className="item-cont">新闻，也叫消息，是通过报纸、电台、广播、电视台等媒体途径所传播信息的一种称谓。是记录社会、传播信息、反映时代的一种文体。新闻概念有广义与狭义之分。广义上:除了发表于报刊、广播、互联网、电视上的评论与专文外的常用文本都属于新闻，包括消息、通讯、特写、速写(有的将速写纳入特写之列)等等;狭义上:消息是用概括的叙述方式，以较简明扼要的文字，迅速及时地报道附近新近发生的、有价值的事实，使一定人群了解。新闻一般包括标题、导语、主体、背景和结语五部分。</div>
                        </li>
                        <li className="state-items">
                            <div className="state-date">
                                <div className="date">26</div>
                                <div className="year">2017-07</div>
                            </div>
                            <div className="item-cont">新闻，也叫消息，是通过报纸、电台、广播、电视台等媒体途径所传播信息的一种称谓。是记录社会、传播信息、反映时代的一种文体。新闻概念有广义与狭义之分。广义上:除了发表于报刊、广播、互联网、电视上的评论与专文外的常用文本都属于新闻，包括消息、通讯、特写、速写(有的将速写纳入特写之列)等等;狭义上:消息是用概括的叙述方式，以较简明扼要的文字，迅速及时地报道附近新近发生的、有价值的事实，使一定人群了解。新闻一般包括标题、导语、主体、背景和结语五部分。</div>
                        </li>
                        <li className="state-items">
                            <div className="state-date">
                                <div className="date">26</div>
                                <div className="year">2017-07</div>
                            </div>
                            <div className="item-cont">新闻，也叫消息，是通过报纸、电台、广播、电视台等媒体途径所传播信息的一种称谓。是记录社会、传播信息、反映时代的一种文体。新闻概念有广义与狭义之分。广义上:除了发表于报刊、广播、互联网、电视上的评论与专文外的常用文本都属于新闻，包括消息、通讯、特写、速写(有的将速写纳入特写之列)等等;狭义上:消息是用概括的叙述方式，以较简明扼要的文字，迅速及时地报道附近新近发生的、有价值的事实，使一定人群了解。新闻一般包括标题、导语、主体、背景和结语五部分。</div>
                        </li>
                    </ul>
                </div>
                <div className="dynamic-qr">
                    <div className="zz-qr"></div>
                    <div>
                        <p className="qr-text">扫一扫立享折扣</p>
                        <p className="qr-text">关注微信公众号，获取更多优惠信息</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">©2015-2016 赞赞买单 版权所有 ICP证：鲁ICP备14019564号</div>
    </div>
}

export default Login