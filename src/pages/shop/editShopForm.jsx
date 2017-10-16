import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Row, Col, Button } from 'antd'
const FormItem = Form.Item
import { CHANGE_SHOP_ACCOUNT } from '../../redux/Actions'
import { trim } from '../../fetchApi/commonApi'

@connect(state => ({
	shopAccountdata: state.fetchdata.shopAccountdata
}), dispath => ({
	saveChanges(param = {}){dispath({type: CHANGE_SHOP_ACCOUNT, param: param})}
}))
class EditShopForm extends React.Component{
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	        	this.props.saveChanges(Object.assign(values, {id: this.props.id}))
	      	}
	    })
	}
	render(){
		const { getFieldDecorator } = this.props.form
		const formSet = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<Form onSubmit = {this.handleSubmit}>
				<FormItem
				label = '账号'
				{...formSet}>
					{getFieldDecorator('account', {
					    rules: [{required: true, message: '请填写账号'}, {pattern: !/[@#\$%\^&\*]+/g, message: '不能包含非法字符'}],
					    getValueFromEvent: e => trim(e.target.value),
					    initialValue: this.props.shopAccountdata.account
					})(
						<Input disabled style={{ width: 200 }}/>
					)}
				</FormItem>
				<FormItem
				label = '密码'
				{...formSet}>
					{getFieldDecorator('password', {
					    rules: [{required: true, message: '请填写密码'}],
					    getValueFromEvent: e => trim(e.target.value),
					    initialValue: this.props.shopAccountdata.password
					})(
						<Input style={{ width: 200 }}/>
					)}
				</FormItem>
				<FormItem
				label = ' '
				colon = {false}
				{...formSet}>
					<Row>
						<Col>
							<Button type="primary" htmlType="submit">保存</Button>
						</Col>
					</Row>
				</FormItem>
			</Form>
		)
	}
}
EditShopForm = Form.create({})(EditShopForm)
export default EditShopForm