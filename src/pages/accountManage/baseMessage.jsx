import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Input, Modal, Upload, Icon, Select } from 'antd'
const Option = Select.Option
const FormItem = Form.Item
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { MODAL_STATE, GET_USERINFO, CHANGE_USERINFO } from '../../redux/Actions'
import AddBankCard from './addbankCard.jsx'

@connect(state => ({
	loading: state.globaldata.loading,
	userinfo: state.fetchdata.userinfodata,
	modalState: state.globaldata.modalState
}), dispath => ({
	changeModal(state){dispath({type: MODAL_STATE, data: state})},
	getUserInfo(){dispath({type: GET_USERINFO})},
	changeUserInfo(param = {}){dispath({type: CHANGE_USERINFO, param})}
}))
class BaseMessage extends React.Component{
	componentWillMount = _ => this.props.getUserInfo()
	state={
		fileList: [],
		modalType: 'edit'
	}
	openModal = async type => {
		await new Promise((rsl, rej) => this.setState({modalType: type}, _ => rsl()))
		this.props.changeModal(true)
	}

	removePic = file => this.setState({fileList: []})
	beforeUpload = file => {
		this.setState({
			fileList: [file]
		})
		return false
	}
	handleSubmit = (e) => {
	    e.preventDefault()
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	      		values.headImg = this.props.userinfo.headImg
	      		this.props.changeUserInfo(values)
	      	}
	    })
	}
	handleRules = (initialRule, key) => Object.assign({
	    rules: initialRule
	}, this.props.userinfo[key] ? key === 'sex' && this.props.userinfo.sex === '2' ? {} : { initialValue: this.props.userinfo[key] } : {})

	render = _ => {
		const { getFieldDecorator } = this.props.form
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<div>
		        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
				<Row style={{background: '#fff', paddingTop: 20}}>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
						label='头像'
						{...formCol}>
							<Link className='avator'>
								<img style={{width: 70, height: 70}}/>
								<span className='hoverBlock' onClick={_ => this.openModal('update')}>编辑头像</span>
							</Link>
						</FormItem>
						<FormItem
						label='昵称'
						{...formCol}>
							{getFieldDecorator('nickname', this.handleRules([{required: true, message: '请填写昵称'}], 'nickname'))(
								<Input style={{width: 200}}/>
							)}
						</FormItem>
						<FormItem
						label='性别'
						{...formCol}>
							{getFieldDecorator('sex', this.handleRules([{required: true, message: '请选择性别'}], 'sex'))(
								<Select
								style={{width: 120}}
								placeholder='请选择'>
									{['女', '男'].map((val, index) => <Option key={index} value={String(index)}>{val}</Option>)}
								</Select>
							)}
						</FormItem>
						<FormItem
						label='银行卡'
						{...formCol}>
							<span style={{marginRight: 50}}>已绑定<Link>1</Link>张银行卡</span>
							<Link to="/home/mybank">查看银行卡列表</Link>
						</FormItem>
						<FormItem
						label=' '
						colon={false}
						{...formCol}>
							<Row>
								<Button 
								type="primary" 
								style={{marginRight: 20}} 
								loading={this.props.loading}
								htmlType="submit">保存</Button>
							</Row>
						</FormItem>
					</Form>
				</Row>
				<Modal
				visible={this.props.modalState}
				title={this.state.modalType === 'edit' ? '添加银行卡' : '上传头像'}
				footer={null}
				onCancel={_ => this.props.changeModal(false)}>
					{this.state.modalType === 'edit' ? 
						<AddBankCard onCancel={_ => this.props.changeModal(false)}></AddBankCard> : 
						<Upload
					    className="uploader"
					    listType = 'picture'
					    beforeUpload = {this.beforeUpload}
					    onRemove = {this.removePic}
					    fileList = {this.state.fileList}>
							<Button>
							    <Icon type="upload" /> upload
							</Button>
					    </Upload>
					}
				</Modal>
			</div>
		)
	}
}
BaseMessage = Form.create({})(BaseMessage)
export default BaseMessage