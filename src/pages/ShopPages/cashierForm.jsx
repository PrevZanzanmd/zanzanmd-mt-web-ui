import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button, Input, Select, Upload, Icon, Spin, Cascader } from 'antd'
const FormItem = Form.Item
const { Option, OptGroup } = Select
import { GET_INDUSTRY, CHANGE_SHOPDETAIL, ADD_CASHIER, EDIT_CASHIER } from '../../redux/Actions'
import { trim } from '../../fetchApi/commonApi'

let item = ''

@connect(state => ({
	cashierDetail: state.fetchdata.cashierDetail
}), dispath => ({
	editCashier(action, param = {}){dispath({type: action, param})}
}))
class CashierForm extends React.Component{
	constructor(props){super(props)}
	componentWillReceiveProps = nextprops => {
		if(this.props.type != nextprops.type && nextprops.type === 'add'){
			this.state.formItems.map(val => {
				let obj = {}
				obj[val.key] = {}
				obj[val.key].value = ''
				nextprops.form.setFields(obj)
			})
		}
		if(nextprops.type === 'edit' && this.props.cashierDetail !== nextprops.cashierDetail){
			this.state.formItems.map(val => {
				let obj = {}
				obj[val.key] = {}
				obj[val.key].value = nextprops.cashierDetail[val.key]
				nextprops.form.setFields(obj)
			})
		}
	}
	state = {
		formItems: [
			{label: '账号', key: 'account', rules: [{required: true, message: '请填写收银员名称'}, {pattern: !/[@#\$%\^&\*]+/g, message: '不能包含非法字符'}]},
			{label: '密码', key: 'password', rules: [{required: true, message: '请填写密码'}, {pattern: /^[a-zA-Z0-9]{6,10}$/, message: '密码为6～10为字母或数字'}]}
		]
	}
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, val) => {
	      	if (!err) {
	      		console.log(this.props.id)
	      		this.props.editCashier(this.props.type == 'edit' ? EDIT_CASHIER : ADD_CASHIER, Object.assign({}, val, this.props.type == 'edit' ? {id: this.props.id || ''} : {}))
	      	}
	    })
	}

	handleFormType = (initialKey, rules = []) => ({rules: rules, getValueFromEvent: e => trim(e.target.value), initialValue: this.props.type === 'edit' ? this.props.cashierDetail[initialKey] : ''})
	render = _ => {
		const { getFieldDecorator } = this.props.form
		const formSet = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (<Form onSubmit={this.handleSubmit}>
			{this.state.formItems.map((val, index) => 
				<FormItem
				key={index}
				label = {val.label}
				{...formSet}>
					{getFieldDecorator(val.key, this.handleFormType(val.key, val.rules))(
						<Input style={{ width: 200 }}/>
					)}
				</FormItem>
			)}
			<FormItem
			label = ' '
			colon = {false}
			{...formSet}>
				<Row>
					<Button type="primary" htmlType="submit">保存</Button>
					<span style={{paddingLeft: 15, color: '#ccc'}}>{this.props.type == 'edit' ? '保存后二维码保持不变' : ''}</span>
				</Row>
			</FormItem>
		</Form>)
	}
}

CashierForm = Form.create({})(CashierForm)
export default CashierForm