import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button, Input, Select, Upload, Icon, Spin, Cascader } from 'antd'
const FormItem = Form.Item
const { Option, OptGroup } = Select
import { GET_INDUSTRY } from '../../redux/Actions'

let item = ''

@connect(state => ({
	shopDetail: state.fetchdata.shopDetail,
	industrydata: state.fetchdata.industrydata,
	selectload: state.globaldata.selectload,
	areadata: state.fetchdata.areadata
}), dispath => ({
	getIndustry(param = {}){dispath({type: GET_INDUSTRY, param: param})}
}))
class AddShopForm extends React.Component{
	state = {
		fileList: [],
		formItems: [
			{label: '店铺名称', key: 'shopName', rules: [{required: true, message: '请填写店铺名称'}, {pattern: !/[@#\$%\^&\*]+/g, message: '不能包含非法字符'}]},
			{label: '店铺地址', key: 'territoryDetail', rules: [{required: true, message: '请填写地址'}]},
			{label: '店铺电话', key: 'phone', rules: [{required: true, message: '请填写电话'}]},
			{label: '店铺负责人', key: 'contacts', rules: [{required: true, message: '请填写负责人'}]}
		]
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
	handleInitialValue = id => (f => f(f))(f => id => list => {
		(g => g(g))(g => id => list => list.map(i => i.id === id ? (item = i) : i.childList ? g(g)(id)(i.childList) : null ))(id)(list)
		return item.parentId !== '0' ? f(f)(item.parentId)(this.props.areadata).concat([id]) : [id]
	})(id)(this.props.areadata)

	handleArea = list => (f => f(f))(f => list => list.map(val => Object.assign({value: val.id, label: val.name}, val.childList ? {children: f(f)(val.childList)} : {})))(list)
	handleFormType = (initialKey, rules = []) => ({rules: rules, initialValue: this.props.type === 'edit' ? this.props.shopDetail[initialKey] : ''})
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
				{getFieldDecorator('spIndustryCode', this.handleFormType('spIndustryCode', [{required: true, message: '请选择行业'}]))(
					<Select 
					placeholder='请选择'
					notFoundContent={this.props.selectload ? <Spin size="small"><Row></Row></Spin> : null}
					style={{width: 120}}
					{...(_ => this.props.type === 'edit' ? {} : {onFocus: this.props.getIndustry} )()}>
						{this.props.industrydata.map((val, index) => <OptGroup key={index} label={val.name}>
							{val.childList ? val.childList.map((item, key) => <Option key={key} value={item.code}>{item.name}</Option>) : null}
						</OptGroup>)}
					</Select>
				)}
			</FormItem>
			<FormItem
			label = '归属区域'
			{...formSet}>
				{getFieldDecorator('jcTerritoryId', {
				    rules: [{required: true, message: '请选择区域'}],
					initialValue: this.props.type === 'edit' && this.props.shopDetail['jcTerritoryId'] || this.props.shopDetail['jcTerritoryId'] === 0 ? this.handleInitialValue(this.props.shopDetail['jcTerritoryId']) : ''
				})(
					<Cascader options={this.handleArea(this.props.areadata)} placeholder="请选择地区" style={{width: 200}}/>
				)}
			</FormItem>
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