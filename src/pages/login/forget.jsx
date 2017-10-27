import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button} from 'antd'
const FormItem = Form.Item
import { TIME, SENDFORGETCODE, FORGETNEXTSTEP } from '../../redux/Actions'

@connect(state => ({
    loading: state.globaldata.loading,
    time: state.globaldata.time
}), dispath => ({
    handleTime(state){dispath({type: TIME, data: state})},
    sendForgetcode(param = {}){dispath({type: SENDFORGETCODE, param})},
    forgetNextstep(param = {}){dispath({type: FORGETNEXTSTEP, param})}
}))
class ForgetPasswrod extends React.Component {
    state={
        phone: '',
        timeStr: '获取验证码', 
        timeBtnDisabled: false
    }
    componentWillReceiveProps = nextProps => !this.props.time && nextProps.time ? this.handleSendClick() : null
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.forgetNextstep(values)
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
    render() {
        const { getFieldDecorator } = this.props.form
        return (
        <div className='login-wrapper'>
            <div className="header">
                <img style={{width: 357 + 'px',height: 51 + 'px'}} src={require(`../../assets/img/images/loginforget.png`)}/>
            </div>
            <div className="content-wrapper" >
                <div className="forget-content">
                    <div className="backlogo">
                        <img style={{width:120+'px',height:120+'px'}} src={require(`../../assets/img/images/backlogo.png`)}/>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="login-form-name"><span className="login-form-text">忘记密码</span></div>
                        <FormItem>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入账号！' }, {pattern: /^1[34578]\d{9}$/, message: '请输入正确账号'}],
                            })(
                                <Input 
                                className="account-tel" 
                                onChange={e => this.setState({phone: e.target.value})} 
                                placeholder="请输入账号" />
                            )}
                        </FormItem>
                        <FormItem>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: '请输入验证码！' }],
                                })(
                                    <Input style={{width: 120, marginRight: 20}} placeholder="请输入验证码" />
                                )}
                                <Button 
                                type='primary' 
                                style={{marginTop: 0}} 
                                disabled={this.state.timeBtnDisabled}
                                onClick={_ => {
                                    this.state.phone === '' ? message.error('请填写手机号') : this.props.sendForgetcode({phone: this.state.phone})
                                }}>{this.state.timeStr}</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:100+'%'}}>
                                下一步
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

const ForgetPass = Form.create()(ForgetPasswrod)

export default ForgetPass