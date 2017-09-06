import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb } from 'antd'
import { Link} from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'

class ContentContainer extends React.Component {
    constructor(props){super(props)}
    render = _ =><div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="cont-container">
            <div className="home-account">
                <div className="home-accountitem">
                    <p className="home-stitle">账户余额</p>
                    <p className="home-cash">608.<span>00元</span></p>
                    <Link to="/home/withdraw">提现</Link>
                    <a>查看</a>
                </div>
                <div className="home-accountitem">
                    <p className="home-stitle">今日总交易额</p>
                    <p className="home-cash">8000.<span>00元</span></p>
                    <a>查看</a>
                </div>
                <div className="home-accountitem">
                    <p className="home-stitle">成功交易笔数</p>
                    <p className="home-cash">300<span>笔</span></p>
                    <a>查看</a>
                </div>
            </div>
            <div className="home-withdraw">
                <ul>
                    <li className="withdraw-item">最近提现记录</li>
                    <li className="withdraw-item">
                        <div style={{flex:2}}>2017.07.28</div>
                        <div style={{flex:3}}>中国银行提现</div>
                        <div style={{flex:4}}><span>￥</span>800</div>
                        <div style={{flex:3}}>提现成功</div>
                        <div style={{flex:1}}><a className="withdraw-link">详情</a></div>
                    </li>
                </ul>
                <Link className="withdraw-link" to="/home/withdrawRecord">查看所有提现记录</Link>
            </div>
        </div>
    </div>
}
export default ContentContainer