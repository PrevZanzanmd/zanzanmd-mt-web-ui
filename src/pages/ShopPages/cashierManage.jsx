import React from 'react'
import { connect } from 'react-redux'
import { Pagination, Row, Modal, Tabs, Button, Form, Popconfirm, Spin } from 'antd'
const FormItem = Form.Item
const TabPane = Tabs.TabPane
import BCrumb from '../Components/bCrumb.jsx'
import { GET_CASHIERLIST, GET_PAYSRCRET, MODAL_STATE, DELETECASHIER, GET_CASHIERDETAIL } from '../../redux/Actions'
import CashierForm from './cashierForm.jsx'

@connect(state => ({
	loading: state.globaldata.loading,
	shopInfo: state.fetchdata.shopDetail,
	modalState: state.globaldata.modalState,
	cashierlist: state.fetchdata.cashierlist,
	qrcode: state.fetchdata.qrcodeUrl,
	cashierDetail: state.fetchdata.cashierDetail
}), dispath => ({
	getQrcode(param){dispath({type: GET_PAYSRCRET, param: param})},
	changeModal(param){dispath({type: MODAL_STATE, data: param})},
	getCashierlist(){dispath({type: GET_CASHIERLIST})},
	delete(param = {}){dispath({type: DELETECASHIER, param})},
	getCashierDetail(param = {}){dispath({type: GET_CASHIERDETAIL, param})}
}))
class SAcashManager extends React.Component{
	componentWillMount = _ => this.props.getCashierlist()

	state={
		modalState: {
			title: '',
			delete: false,
			render: _ => <div></div>
		},
		detailList: [
			{key: 'account', title: '账号'},
			{key: 'password', title: '密码'},
		],
		buttonRender: [{
			title: '查看二维码',
			onclick: record => {
				this.props.getQrcode({cashierId: record.subUserId})
				this.handleModalState({
					delete: false, 
					title: '二维码', 
					render: _ => <div style={{display: 'flex', justifyContent: 'center'}}><img src={this.props.qrcode} style={{width: 300, height: 300, background: '#ccc'}}/></div>
				})
			}
		},{
			title: '详情',
			onclick: record => {
				this.props.getCashierDetail({userId: record.subUserId})
				this.handleModalState({delete: false, title: '收银员详情', render: _ => <Form>
					{this.state.detailList.map((val, index) => <FormItem
					style={{marginBottom: 10}}
					key={index}
					label={val.title}
					{...{labelCol: {span: 5}, wrapperCol: {span: 19}}}>{val.render ? val.render(this.props.cashierDetail[val.key]) : this.props.cashierDetail[val.key]}</FormItem>)}
				</Form>
				})
			}
		},{
			title: '编辑',
			onclick: record => {
				this.props.getCashierDetail({userId: record.subUserId})
				this.modalAddShop({type: 'edit', title: '编辑收银员', id: record.subUserId})
			}
		},{
			title: '删除',
			type: 'delete',
			onclick: record => this.props.delete({id: record.subUserId})
		}]
	}

	handleModalState = param => this.setState({modalState: Object.assign({}, this.state.modalState, param)})
	modalAddShop = ({type, title, id}) => this.handleModalState({delete: false, title: title, render: _ => <CashierForm type={type} id={id || null}/>})

	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} style={{margin: '0 0 10px'}}></BCrumb>
        <Row style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: 10}}>
        	<Button onClick={_ => {
				this.props.changeModal(true)
				this.modalAddShop({type: 'add', title: '添加收银员'})
			}}>添加收银员</Button>
        </Row>
        <Spin spinning={this.props.loading}>
			{this.props.cashierlist.map((val, index) => 
				<Row className='shopAccountItem' key={index}>
					<img 
					src={val.headImg || require(`../../assets/img/personHeadImg.jpg`)} 
					className='accountAvator' 
					style={{background: 'transparent', border: '1px solid #ccc'}}/>
					<div className='accountTitle'>
						<p className='title'>{val.account}</p>
						<p>{this.props.shopInfo.shopName || ' '}</p>
					</div>
					{this.state.buttonRender.map((item, key) => item.type && item.type === 'delete' ?  
						<Popconfirm title="确定要删除吗?" onConfirm={_ => item.onclick(val)} okText="确定" cancelText="取消" key={key}>
					    	<a style={{paddingRight: 10}}>{item.title}</a>
					  	</Popconfirm>
						: <a style={{paddingRight: 10}} key={key} onClick={_ => item.onclick(val)}>{item.title}</a>
					)}
				</Row>
			)}
		</Spin>
		<Modal
		title={this.state.modalState.title}
		{...Object.assign({}, this.state.modalState.delete ? {onOk: _ => console.log(1)} : {footer: null})}
		onCancel={_ => this.props.changeModal(false)}
		visible={this.props.modalState}>
			{this.state.modalState.render()}
		</Modal>
	</div>
}

export default SAcashManager