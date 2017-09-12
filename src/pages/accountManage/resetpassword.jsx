import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Input } from 'antd'
const FormItem = Form.Item
import BCrumb from '../Components/bCrumb.jsx'
import { RESET_PASSWORD } from '../../redux/Actions'

@connect(state => ({}), dispath => ({
	resetPassword(param = {}){dispath({type: RESET_PASSWORD, param})}
}))
class ResetPass extends React.Component{
	state = {
		formItem: [{label: '当前登录密码', key: 'oldPassword', rules: [{required: true, message: '请填写旧密码'}, {pattern: !/[@#\$%\^&\*]+/g, message: '不能包含非法字符'}]},
		{label: '新登录密码', key: 'newPassword', rules: [{required: true, message: '请填写新密码'}, {pattern: /^[a-zA-Z0-9]{6,10}$/, message: '密码为6～10为字母或数字'}]},
		{label: '确认新登录密码', key: 'confirmPassword', rules: [{required: true, message: '请确认密码'},{
		   	validator: (rule, value, callback) => value && value !== this.props.form.getFieldValue('newPassword') ? callback('两次输入不一致') : callback()
		}]}]
	}
	handleSubmit = (e) => {
	    e.preventDefault()
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	      		delete values.confirmPassword
	      		console.log(values)
	      		this.props.resetPassword(values)
	      	}
	    })
	}
	render = _ => {
		const { getFieldDecorator } = this.props.form
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<div>
		        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
				<Row style={{background: '#fff', paddingTop: 20}}>
					<Form onSubmit={this.handleSubmit}>
						{this.state.formItem.map((val, index) => <FormItem
						key={index}
						label={val.label}
						{...formCol}>
							{getFieldDecorator(val.key, {rules: val.rules})(
								<Input type='password' style={{width: 200}}/>
							)}
						</FormItem>)}
						<FormItem
						label=' '
						colon={false}
						{...formCol}>
							<Row>
								<Button type="primary" style={{marginRight: 20}} htmlType="submit">保存</Button>
							</Row>
						</FormItem>
					</Form>
				</Row>
			</div>
		)
	}
}
ResetPass = Form.create({})(ResetPass)
export default ResetPass