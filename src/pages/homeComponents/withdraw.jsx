import React from 'react'
import {connect} from 'react-redux'
import {Breadcrumb, Radio,Button } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'
const RadioGroup = Radio.Group;

class Withdraw extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        value: 1,
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="getcash">
            <div className="getcash-cont">
                <div className="getcash-row">
                    <span className="cash-label">选择银行卡</span>
                    <div className="cash-cont">
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio className="cash-bank" value={1}>
                                    <div className="cash-bankbox">
                                    <div className="bank-box">
                                        <img className="bank-img" src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/>
                                        <span className="bank-name">中国银行</span>
                                    </div>
                                    <div>尾号6666<span className="speedy">快捷</span></div>
                                    </div>
                                </Radio>
                                <Radio className="cash-bank" value={2}>
                                    <div className="cash-bankbox">
                                    <div className="bank-box">
                                        <img className="bank-img" src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/>
                                        <span className="bank-name">中国银行</span>
                                    </div>
                                    <div>尾号6666<span className="speedy">快捷</span></div>
                                    </div>
                                </Radio>
                            </RadioGroup>
                    </div>
                </div>
                <div className="getcash-row">
                    <span className="cash-label">提现金额</span>
                    <div className="cash-cont">
                        <div><input className="cash-num"/>元</div>
                        <span style={{fontSize:12+'px',color:'#a3a3a3'}}>今日可提现800.00元</span>
                    </div>
                </div>
                <div className="getcash-row">
                    <span className="cash-label">到账时间</span>
                    <span className="cash-cont">18:00前到账</span>
                </div>
                <div className="getcash-row">
                    <span className="cash-label"></span>
                    <div className="cash-cont"><Button type="primary">下一步</Button></div>
                </div>
            </div>
        </div>
    </div>
}
export default Withdraw