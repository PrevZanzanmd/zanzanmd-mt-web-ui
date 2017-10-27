import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item
import { SETNEWPASSWORD } from '../../redux/Actions'

@connect(state => ({
    forgetdata: state.fetchdata.forgetdata
}), dispath => ({
    saveNewpassword(param = {}){dispath({type: SETNEWPASSWORD, param})}
}))
class ForgetNext extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values.confirmPassword
                this.props.saveNewpassword(Object.assign({}, this.props.forgetdata, values))
            }
        })
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
                            <div className="login-form-name"><span className="login-form-text">设置新密码</span></div>
                            <FormItem>
                                {getFieldDecorator('newPassword', {
                                    rules: [{ required: true, message: '请输入新密码'}],
                                })(
                                    <Input type="password" placeholder="请输入新密码"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('confirmPassword', {
                                    rules: [{ required: true, message: '请确认密码' },{
                                    validator: (rule, value, callback) => value && value !== this.props.form.getFieldValue('newPassword') ? callback('两次输入不一致') : callback()
                                }],
                                })(
                                    <Input type="password" placeholder="请确认新密码"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:100+'%'}}>
                                    完成
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

const ForgetPassNext = Form.create()(ForgetNext)

export default ForgetPassNext