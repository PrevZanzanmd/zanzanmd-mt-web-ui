import React from 'react'
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;
import WrappedNormalLoginForm from './signin.jsx'
import { message } from 'antd'

class Login extends React.Component {
    componentWillMount(){
        this.props.location.state ? message.error('登录失效') : null
    }
    render = _ => <div className='login-wrapper'>
        <div className="header">
            <img style={{width: 307 + 'px',height: 51 + 'px'}} src={require(`../../assets/img/images/logo.png`)}/>
        </div>
        <div className="content-wrapper" style={{
            width: 100 + '%',
            height: 464 + 'px'
        }}>
            <div className="content">
                <div className="zzlogin">
                    <div className="login-cont">
                        <WrappedNormalLoginForm></WrappedNormalLoginForm>
                    </div>
                </div>
            </div>
        </div>
        <div className="message">
            <div className="dynamic">
            <div className="dynamic-infor">
                <p className="description">赞赞以微信支付、支付宝支付的快捷支付为基础，向用户提供安全、快捷、高效的支付服务。</p>
                <p className="description">赞赞为消费者提供了便捷的支付方式和优惠折扣，为用户“钱包”再省一点。</p>
                <p className="description">目前，赞赞已实现扫码支付、立减优惠等营销新工具，满足用户及商户的不同支付场景，成为大众消费者跟商家喜爱的支付和收款方式。</p>
            </div>
            </div>
              <div className="dynamic-qr">
                    <img className="zz-qr" src={require(`../../assets/img/images/erweima.png`)}/>
                    <div>
                        <p className="qr-text">扫一扫立享折扣</p>
                        <p className="qr-text">关注微信公众号，获取更多优惠信息</p>
                    </div>
            </div>
        </div>
        <div className="footer">©2015-2016 赞赞 版权所有 ICP证：鲁ICP备14019564号</div>
    </div>
}

export default Login