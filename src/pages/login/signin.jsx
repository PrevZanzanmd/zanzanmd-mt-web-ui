import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link } from 'react-router'
import { LOGIN } from '../../redux/Actions'

@connect(state => ({
    loading: state.globaldata.loading
}), dispath => ({
    login(param = {}){dispath({type: LOGIN, param})}
}))
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.flag = 'web'
                this.props.login(values)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="login-form-name">登录赞赞</div>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
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
                        <Link className="login-form-forgot" to='/forget' style={{color:'#fff'}}>忘记登录密码？</Link>
                    </div>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    loading={this.props.loading}
                    style={{width:100+'%'}}>
                        登录
                    </Button>
                    <div style={{textAlign:'right'}}>
                        <Link to="/regist">免费注册</Link>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm