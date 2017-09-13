import React from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, DatePicker, Row, Select, InputNumber } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
import { CHANGE_CARD } from '../../redux/Actions'

@connect(state => ({
	shoplist: state.fetchdata.shoplist
}), dispath => ({
	addCard(param = {}, searchParam = {}){dispath({type: CHANGE_CARD, param, searchParam})}
}))
class CardForm extends React.Component{
	constructor(props){super(props)}
	state = {
		formItem: [{label: '数量', rules: [{required: true, message: '请填写数量'}], key: 'couponQuantity'},
		{label: '优惠金额', rules: [{required: true, message: '请填写优惠金额'}], key: 'discountAmount'},
		{label: '满减金额', rules: [{required: true, message: '请填写满减金额'}], key: 'fullAmount'}]
	}
	handleSubmit = (e) => {
	    e.preventDefault()
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	      		values.time = values.time.map(val => val.format('YYYY-MM-DD'))
	      		values.spShopId = values.shop.key
	      		values.spShopName = values.shop.label
	      		delete values.shop
	      		values.startDate = values.time[0]
	      		values.deadline = values.time[1]
	      		delete values.time
	      		console.log(values)
	      		console.log(this.props.searchParam)
	        	this.props.addCard(values, this.props.searchParam)
	      	}
	    })
	}
	render = _ => {
		const { getFieldDecorator } = this.props.form
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<Form onSubmit = {this.handleSubmit}>
				<FormItem
				label='选择店铺'
				{...formCol}>
					{getFieldDecorator('shop', {rules:[{required: true, message: '请选择店铺'}]})(
						<Select 
						labelInValue={true}
						placeholder='请选择' 
						style={{width: 120}}>
							{this.props.shoplist.map((val, index) => <Option value={val.id} key={index}>{val.shopName}</Option>)}
						</Select>
					)}
				</FormItem>
				<FormItem
				label='卡券种类'
				{...formCol}>
					{getFieldDecorator('couponType', {rules:[{required: true, message: '请选择类型'}]})(
						<Select 
						placeholder='请选择' 
						style={{width: 120}}>
							{[{title: '优惠券', id: '1'}, {title: '红包', id: '2'}].map((val, index) => <Option value={val.id} key={index}>{val.title}</Option>)}
						</Select>
					)}
				</FormItem>
				{this.state.formItem.map((val, index) => 
					<FormItem
					label={val.label}
					key={index}
					{...formCol}>
						{getFieldDecorator(val.key, {rules:val.rules})(
							<InputNumber min={1} max={10000} style={{width: 120}}/>
						)}
					</FormItem>
				)}
				<FormItem
				label='有效日期'
				{...formCol}>
					{getFieldDecorator('time', {rules:[{required: true, message: '请选择时间'}]})(
						<RangePicker />
					)}
				</FormItem>
				<FormItem
				label=' '
				colon={false}
				{...formCol}>
					<Row>
						<Button type="primary" style={{marginRight: 20}} htmlType="submit">保存</Button>
						<Button onClick={this.props.onCancel}>取消</Button>
					</Row>
				</FormItem>
			</Form>
		)
	}
}
CardForm = Form.create({})(CardForm)
export default CardForm