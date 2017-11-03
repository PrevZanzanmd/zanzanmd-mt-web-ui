import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, message } from 'antd'
import { Link } from 'react-router'
const FormItem = Form.Item
import { SENDREGCODE, TIME, REGISTER } from '../../redux/Actions'

@connect(state => ({
    loading: state.globaldata.loading,
    time: state.globaldata.time
}), dispath => ({
    sendregcode(param = {}){dispath({type: SENDREGCODE, param})},
    handleTime(state){dispath({type: TIME, data: state})},
    register(param = {}){dispath({type: REGISTER, param})}
}))
class Regist extends React.Component {
    componentWillReceiveProps = nextProps => !this.props.time && nextProps.time ? this.handleSendClick() : null
    state={
        phone: '',
        timeStr: '获取验证码', timeBtnDisabled: false,
        formItem: [{key: 'phone', rules: [{ required: true, message: '请输入手机号' }, {pattern: /^1[34578]\d{9}$/, message: '请输入正确手机号'}], placeholder: '请输入手机号'},
        {key: 'password', rules: [{ required: true, message: '请输入密码' }], placeholder: '请输入密码'},
        {key: 'confirmPassword', rules: [{ required: true, message: '请确认密码' },{
            validator: (rule, value, callback) => value && value !== this.props.form.getFieldValue('password') ? callback('两次输入不一致') : callback()
        }], placeholder: '请确认密码'},
        {key: 'invitationCode', rules: [{ required: true, message: '请输入邀请码' }], placeholder: '请输入邀请码'}]
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.account = values.phone
                console.log(values)
                this.props.register(values)
            }
        })
    }
    handleSetState = state => new Promise((rsl, rej) => this.setState(state, _ => rsl()))
    handleSendClick = async _ => {
        let time = 60
        await this.handleSetState({timeBtnDisabled: true})
        let interval = setInterval(async _ => {
            await this.handleSetState({timeStr: time === 0 ? '获取验证码' : `${--time}秒后重新发送`})
            this.state.timeStr === '获取验证码' ? (
                await this.handleSetState({timeBtnDisabled: false}),
                this.props.handleTime(false),
                clearInterval(interval)
            ) : null
        }, 1000)
    }
    send = _ => {
        this.props.form.validateFields(['phone', 'invitationCode'], (err, val) => {
            if(!err)
                this.props.sendregcode(val)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className='login-wrapper'>
                <div className="header">
                    <img style={{width: 357 + 'px',height: 51 + 'px'}} src={require(`../../assets/img/images/rlogo.png`)}/>
                </div>
                <div className="content-wrapper" style={{background: '#fff'}}>
                    <div className="forget-content">
                        <div className="backlogo">
                            <img style={{width:120+'px',height:120+'px'}} src={require(`../../assets/img/images/backlogo.png`)}/>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="login-form-name"><span className="login-form-text">注册</span></div>
                            {this.state.formItem.map((val, index) => 
                                <FormItem key={index}>
                                    {getFieldDecorator(val.key, {
                                        rules: val.rules
                                    })(
                                        <Input 
                                        placeholder={val.placeholder} 
                                        {...val.key === 'password' || val.key === 'confirmPassword' ? {type: 'password'} : {}}/>
                                    )}
                                </FormItem>
                            )}
                            <FormItem>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: '请输入验证码'}],
                                })(
                                    <Input style={{width: 120, marginRight: 20}} placeholder="请输入验证码"/>
                                )}
                                <Button 
                                type='primary' 
                                style={{marginTop: 0}} 
                                disabled={this.state.timeBtnDisabled}
                                onClick={this.send}>{this.state.timeStr}</Button>
                            </FormItem>
                            <FormItem>
                                <div style={{textAlign:'right',marginTop:-15+'px',marginBottom:-10+'px'}}>
                                    <span style={{color:'#999'}}>已有账号，</span><Link className="login-form-forgot" to='/login'>去登录</Link>
                                </div>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:100+'%'}}>
                                    注册
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="footer">©2015-2016 赞赞买单 版权所有 ICP证：鲁ICP备14019564号</div>
            </div>
        )
    }
}

const RegistAccount = Form.create()(Regist)

export default RegistAccount