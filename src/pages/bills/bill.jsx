import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb,Button,Pagination, Select ,DatePicker} from 'antd'
import { Link} from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class Bill extends React.Component {
    constructor(props){super(props)}
    render = _ =><div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="trade">
            <div className="trade-time" style={{flex:3}}>
                <span className="trade-label">交易时间</span>
                <RangePicker size='default' style={{width:220}}/>
            </div>
            <div className="trade-status">
                <span className="trade-label">交易状态</span>
                <Select defaultValue="交易成功" style={{ width: 120}}>
                    <Option value="交易成功">交易成功</Option>
                </Select>
            </div>
            <div className="trade-shop">
                <span className="trade-label">交易店铺</span>
                <Select defaultValue="交易成功" style={{ width: 120}}>
                    <Option value="交易成功">光头许</Option>
                </Select>
            </div>
            <div className="trade-way">
                <span className="trade-label">交易方式</span>
                <Select defaultValue="交易成功" style={{ width: 120}}>
                    <Option value="交易成功">支付宝</Option>
                </Select>
            </div>
        </div>
        <div className="bill-container">
            <div className="home-account">
                <div className="home-accountitem">
                    <p className="home-stitle">今日总交易额</p>
                    <p className="home-cash">8000.<span>00元</span></p>
                </div>
                <div className="home-accountitem">
                    <p className="home-stitle">成功交易笔数</p>
                    <p className="home-cash">300<span>笔</span></p>
                </div>
            </div>

            <div className="bill-wrapper">
                <ul className="bill-list">
                    <li className="bill-title">
                        <div style={{flex:1}}>分类</div>
                        <div style={{flex:2}}>订单号</div>
                        <div style={{flex:3}}>交易时间</div>
                        <div style={{flex:2}}>交易金额（元）</div>
                        <div style={{flex:2}}>交易状态</div>
                        <div style={{flex:1}}>操作</div>
                    </li>
                    <li className="bill-item">
                        <div style={{flex:1}}><img className="bill-img" src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/></div>
                        <div style={{flex:2}}>40025086014562</div>
                        <div style={{flex:3}}><span className="bill-date">2017.07.29</span>12:30:36</div>
                        <div style={{flex:2}}>￥10.00</div>
                        <div style={{flex:2}}>交易成功</div>
                        <div className="withdraw-link" style={{flex:1}}>详情</div>
                    </li>
                    <li className="bill-item">
                        <div style={{flex:1}}><img className="bill-img" src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/></div>
                        <div style={{flex:2}}>40025086014562</div>
                        <div style={{flex:3}}><span className="bill-date">2017.07.29</span>12:30:36</div>
                        <div style={{flex:2}}>￥10.00</div>
                        <div style={{flex:2}}>交易成功</div>
                        <div className="withdraw-link" style={{flex:1}}>详情</div>
                    </li>
                </ul>
                <div className="page-control">
                    <Button type="default">导出账单</Button>
                    <Pagination size="small" total={50}/>
                </div>
            </div>
        </div>
    </div>
}
export default Bill