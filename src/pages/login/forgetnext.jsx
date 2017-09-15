import React from 'react'
import { Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class ForgetNext extends React.Component {
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
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入新密码！' }],
                                })(
                                    <Input className="account-tel" placeholder="请输入新密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('newpassword', {
                                    rules: [{ required: true, message: '两次密码输入不一致！' }],
                                })(
                                    <Input type="password" placeholder="请确认新密码" />
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
        );
    }
}

const ForgetPassNext = Form.create()(ForgetNext);

export default ForgetPassNext