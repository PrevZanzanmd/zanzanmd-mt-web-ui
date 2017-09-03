import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'

class WithdrawRecord extends React.Component {
    render = _ =><div className='contentContainer'>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="widthdraw">
            <div className="selcet-time"></div>
            <ul className="widthdraw-wrapper">
                <li className="widthdraw-record">
                    <div style={{flex:2}}>
                        <img className="bankimg" src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/>
                        <div className="bank-time">
                            <span>2017.07.28</span>
                            <span className="widthdarw-sub">12:30:48</span>
                        </div>
                    </div>
                    <div className="bank-name" style={{flex:4}}>
                        <span>中国银行提现</span>
                        <span className="widthdarw-sub">中国银行<i>|</i>...6666<i>|</i>*三儿<i>|</i>流水号2000...666</span>
                    </div>
                    <div style={{flex:2}}>
                        <p className="widthdraw-money">￥<span>200.00</span></p>
                    </div>
                    <div style={{flex:2}}>提现成功</div>
                    <div className="details" style={{flex:2}}><a className="withdraw-link">详情</a></div>
                </li>
            </ul>
            <div className="pagination">页码</div>
        </div>
    </div>
}

export default WithdrawRecord