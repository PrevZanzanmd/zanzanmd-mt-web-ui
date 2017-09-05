import React from 'react'
import { Form, Row, Col, Button, Input, Select, Upload, Icon } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class AddShopForm extends React.Component{
	state = {
		fileList: []
	}
	beforeUpload = file => {
		this.setState({
			fileList: [file]
		})
		return false
	}
	removePic = file => this.setState({fileList: []})
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	        	console.log(values)
	      	}
	    })
	}
	render = _ => {
		const { getFieldDecorator } = this.props.form
		const formSet = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (<Form onSubmit={this.handleSubmit}>
			<FormItem
			label = '店铺头像'
			{...formSet}>
				<Upload
			    listType = 'picture'
			    beforeUpload = {this.beforeUpload}
			    onRemove = {this.removePic}
			    fileList = {this.state.fileList}
			    >
					<Button>
					    <Icon type="upload" /> 上传图片
					</Button>
				</Upload>
			</FormItem>
			<FormItem
			label = '行业分类'
			{...formSet}>
				{getFieldDecorator('industry', {
				    rules: [{required: true, message: '请选择行业'}]
				})(<Select 
				placeholder='请选择'
				style={{width: 120}}>
					{['1', '2', '3'].map(val => <Option key={val}>{val}</Option>)}
				</Select>)}
			</FormItem>
			<FormItem
			label = '店铺名称'
			{...formSet}>
				{getFieldDecorator('name', {
				    rules: [{required: true, message: '请填写店铺名称'}, {pattern: !/[@#\$%\^&\*]+/g, message: '不能包含非法字符'}]
				})(
					<Input style={{ width: 200 }}/>
				)}
			</FormItem>
			<FormItem
			label = '店铺地址'
			{...formSet}>
				{getFieldDecorator('address', {
					rules: [{required: true, message: '请填写地址'}]
				})(
					<Input style={{ width: 200 }}/>
				)}
			</FormItem>
			<FormItem
			label = '店铺电话'
			{...formSet}>
				{getFieldDecorator('phone', {
					rules: [{required: true, message: '请填写电话'}]
				})(
					<Input style={{ width: 200 }}/>
				)}
			</FormItem>
			<FormItem
			label = '店铺负责人'
			{...formSet}>
				{getFieldDecorator('owner', {
					rules: [{required: true, message: '请填写负责人'}]
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
		</Form>)
	}
}

AddShopForm = Form.create({})(AddShopForm)
export default AddShopForm