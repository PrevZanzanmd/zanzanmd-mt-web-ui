import React from 'react'
import { Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Regist extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-wrapper'>
                <div className="header">
                    <img style={{width: 357 + 'px',height: 51 + 'px'}} src={require(`../../assets/img/images/rlogo.png`)}/>
                </div>
                <div className="content-wrapper" >
                    <div className="forget-content">
                        <div className="backlogo">
                            <img style={{width:120+'px',height:120+'px'}} src={require(`../../assets/img/images/backlogo.png`)}/>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="login-form-name"><span className="login-form-text">注册</span></div>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入手机号！' }],
                                })(
                                    <Input className="account-tel" placeholder="请输入手机号" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码！' }],
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('newpassword', {
                                    rules: [{ required: true, message: '请确认密码！' }],
                                })(
                                    <Input type="password" placeholder="请确认密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('checkCode', {
                                    rules: [{ required: true, message: '请输入验证码！' }],
                                })(
                                    <Input className="account-code" placeholder="请输入验证码" />
                                )}
                                <div className="getcode">获取验证码</div>
                            </FormItem>
                            <FormItem>
                                <div style={{textAlign:'right',marginTop:-15+'px',marginBottom:-10+'px'}}>
                                    <span style={{color:'#999'}}>已有账号，</span><a className="login-form-forgot" href="">去登录</a>
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
        );
    }
}

const RegistAccount = Form.create()(Regist);

export default RegistAccount