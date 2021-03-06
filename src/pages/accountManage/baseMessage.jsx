import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Input, Modal, Upload, Icon, Select, message } from 'antd'
const Option = Select.Option
const FormItem = Form.Item
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { MODAL_STATE, GET_USERINFO, CHANGE_USERINFO, GET_UPLOADTOKEN, UPLOAD, BANKCARD_LIST } from '../../redux/Actions'
import AddBankCard from './addbankCard.jsx'
import { upload } from '../../fetchApi'
import { trim } from '../../fetchApi/commonApi'

@connect(state => ({
	loading: state.globaldata.loading,
	userinfo: state.fetchdata.userinfodata,
	modalState: state.globaldata.modalState,
	uploadData: state.fetchdata.uploadData,
	downloaddata: state.fetchdata.downloaddata,
	bankCardlist: state.fetchdata.bankCardlist
}), dispath => ({
	changeModal(state){dispath({type: MODAL_STATE, data: state})},
	getUserInfo(){dispath({type: GET_USERINFO})},
	changeUserInfo(param = {}){dispath({type: CHANGE_USERINFO, param})},
	getUploaddata(param = {}){dispath({type: GET_UPLOADTOKEN, param})},
	upload(param = {}){dispath({type: UPLOAD, param})},
	getBankCard(param = {}){dispath({type: BANKCARD_LIST, param, loading: true})}
}))
class BaseMessage extends React.Component{
	componentWillMount = _ => {
		this.props.getUserInfo()
		this.props.getBankCard()
	}
	state={
		fileList: [],
		modalType: 'edit'
	}
	openModal = async type => {
		await new Promise((rsl, rej) => this.setState({modalType: type}, _ => rsl()))
		this.props.getUploaddata({type: 2})
	}

	removePic = file => this.setState({fileList: []})
	beforeUpload = file => {
		this.setState({
			fileList: [file]
		})
		return false
	}
	handleUpload = _ => {
	    const { fileList } = this.state
	    if( fileList.length > 0 ){
		    const formData = new FormData()
		    formData.append('file', fileList[0])
		    formData.append('key', this.props.uploadData.key)
		    formData.append('token', this.props.uploadData.token)
		    this.props.upload({url: this.props.uploadData.url, formData, key: this.props.uploadData.key})
	    }else{
	    	message.error('请先选择照片!')
	    }
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
	}, this.props.userinfo[key] ? { initialValue: this.props.userinfo[key] } : {})

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
							<Link className='avator' onClick={_ => this.openModal('update')}>
								<img src={this.props.downloaddata.url != '' ? this.props.downloaddata.url : require(`../../assets/img/personHeadImg.jpg`)} style={{width: 70, height: 70, border: '1px solid #ccc'}}/>
								<span className='hoverBlock'>编辑头像</span>
							</Link>
						</FormItem>
						<FormItem
						label='昵称'
						{...formCol}>
							{getFieldDecorator('nickname', Object.assign(this.handleRules([{required: true, message: '请填写昵称'}], 'nickname'), {getValueFromEvent: e => trim(e.target.value)}) )(
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
									{['女', '男', '未知'].map((val, index) => <Option key={index} value={String(index)}>{val}</Option>)}
								</Select>
							)}
						</FormItem>
						<FormItem
						label='银行卡'
						{...formCol}>
							<span style={{marginRight: 50}}>已绑定<Link>{this.props.bankCardlist.length}</Link>张银行卡</span>
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
					<Upload
				    className="uploader"
				    listType = 'picture'
				    beforeUpload = {this.beforeUpload}
				    onRemove = {this.removePic}
				    fileList = {this.state.fileList}>
						<Button>
						    <Icon type="upload" /> 选择文件
						</Button>
				    </Upload>
					<Button 
					type='primary' 
					style={{marginTop: 10}}
					loading={this.props.loading}
					onClick={this.handleUpload}>上传并保存</Button>
				</Modal>
			</div>
		)
	}
}
BaseMessage = Form.create({})(BaseMessage)
export default BaseMessage