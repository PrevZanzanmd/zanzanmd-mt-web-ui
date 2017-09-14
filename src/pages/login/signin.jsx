import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
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
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="login-form-name">登录赞赞买单</div>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <div style={{textAlign:'right',marginTop:-10+'px'}}>
                        <a className="login-form-forgot" href="" style={{color:'#fff'}}>忘记登录密码？</a>
                    </div>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:100+'%'}}>
                        登录
                    </Button>
                    <div style={{textAlign:'right'}}>
                        <a href="">免费注册</a>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm