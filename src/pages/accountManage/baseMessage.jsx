import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Input, Modal, Upload, Icon } from 'antd'
const FormItem = Form.Item
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { MODAL_STATE } from '../../redux/Actions'
import AddBankCard from './addbankCard.jsx'

@connect(state => ({
	modalState: state.globaldata.modalState
}), dispath => ({
	changeModal(state){dispath({type: MODAL_STATE, data: state})}
}))
class BaseMessage extends React.Component{
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

	render = _ => {
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<div>
		        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
				<Row style={{background: '#fff', paddingTop: 20}}>
					<Form>
						<FormItem
						label='头像'
						{...formCol}>
							<Link className='avator'>
								<img style={{width: 70, height: 70}}/>
								<span className='hoverBlock' onClick={_ => this.openModal('update')}>编辑头像</span>
							</Link>
						</FormItem>
						{['昵称', '性别', '真实姓名'].map((val, index) => 
							<FormItem
							label={val}
							key={index}
							{...formCol}>
								<Input style={{width: 200}}/>
							</FormItem>
						)}
						<FormItem
						label='银行卡'
						{...formCol}>
							<span style={{marginRight: 50}}>已绑定<Link>1</Link>张银行卡</span>
							<Link onClick = {_ => this.openModal('edit')}>添加</Link> | <Link>管理</Link>
						</FormItem>
						<FormItem
						label='注册时间'
						{...formCol}>2017.07.26</FormItem>
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
					    fileList = {this.state.fileList}
					    >
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

export default BaseMessage