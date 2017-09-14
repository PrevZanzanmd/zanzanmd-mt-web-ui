import React from 'react'
import { connect } from 'react-redux'
import { Pagination, Row, Modal, Tabs, Button, Form, Popconfirm, Spin } from 'antd'
const FormItem = Form.Item
const TabPane = Tabs.TabPane
import BCrumb from '../Components/bCrumb.jsx'
import AddShopForm from './addShopForm.jsx'
import { GET_SHOP_LIST, GET_SHOP_DETAIL, MODAL_STATE, GET_PAYSRCRET, DELETE_SHOP, GET_AREA } from '../../redux/Actions'

@connect(state => ({
	loading: state.globaldata.loading,
	modalState: state.globaldata.modalState,
	shoplist: state.fetchdata.shoplist,
	shopDetail: state.fetchdata.shopDetail,
	qrcode: state.fetchdata.qrcodeUrl
}), dispath => ({
	getShopList(param = {}){dispath({type: GET_SHOP_LIST, param: param})},
	getShopDetail(param = {}, edit = false){dispath({type: GET_SHOP_DETAIL, param: param, edit: edit})},
	changeModal(param){dispath({type: MODAL_STATE, data: param})},
	getQrcode(param){dispath({type: GET_PAYSRCRET, param: param})},
	deleteShop(param = {}){dispath({type: DELETE_SHOP, param: param})},
	getareadata(param = {}){dispath({type: GET_AREA, param: param})}
}))
class MyShop extends React.Component{
	componentWillMount = _ => {
		this.props.getShopList(this.state.searchParam)
		this.props.getareadata()
	}
	state={
		searchParam: {},
		modalState: {
			title: '',
			delete: false,
			render: _ => <div></div>
		},
		shopDetailList: [
			{key: 'lineState', title: '店铺状态', render: state => state === '0' ? '上线' : '未上线'},
			{key: 'jcTerritoryName', title: '店铺区域'},
			{key: 'territoryDetail', title: '店铺地址'},
			{key: 'spIndustryName', title: '行业分类'},
			{key: 'phone', title: '店铺电话'},
			{key: 'contacts', title: '店铺负责人'}
		],
		buttonRender: [{
			title: '查看二维码',
			onclick: record => {
				this.props.getQrcode({shopId: record.id})
				this.handleModalState({
					delete: false, 
					title: '二维码', 
					render: _ => <div style={{display: 'flex', justifyContent: 'center'}}><img src={this.props.qrcode} style={{width: 300, height: 300, background: '#ccc'}}/></div>
				})
			}
		},{
			title: '详情',
			onclick: record => {
				this.props.getShopDetail({id: record.id})
				this.handleModalState({delete: false, title: '店铺详情', render: _ => <Form>
					{this.state.shopDetailList.map((val, index) => <FormItem
					style={{marginBottom: 10}}
					key={index}
					label={val.title}
					{...{labelCol: {span: 5}, wrapperCol: {span: 19}}}>{val.render ? val.render(this.props.shopDetail[val.key]) : this.props.shopDetail[val.key]}</FormItem>)}
				</Form>
				})
			}
		},{
			title: '编辑',
			onclick: record => {
				this.props.getShopDetail({id: record.id}, true)
				this.modalAddShop({type: 'edit', title: '编辑店铺'})
			}
		},{
			title: '删除',
			type: 'delete',
			onclick: record => this.props.deleteShop({id: record.id})
		}]
	}
	handleTabChange = key => this.props.getShopList(Object.assign({}, Number(key) ? { lineState: String(key - 1) } : {}))

	handleModalState = param => this.setState({modalState: Object.assign({}, this.state.modalState, param)})
	modalAddShop = ({type, title}) => this.handleModalState({delete: false, title: title, render: _ => <AddShopForm type={type}/>})
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} style={{margin: 0}}></BCrumb>
		<Row>
			<Tabs onChange={this.handleTabChange} tabBarExtraContent={<Button onClick={_ => {
				this.props.changeModal(true)
				this.modalAddShop({type: 'add', title: '添加店铺'})
			}}>添加店铺</Button>}>
			    {['所有店铺', '已上线店铺', '已下线店铺'].map((val, index) => 
			    	<TabPane tab={val} key={index} style={{minHeight: 120}}>
			    		<Spin spinning={this.props.loading}>
				    		{this.props.shoplist.map((record) => 
								<Row className='shopAccountItem' key={record.id}>
									<img 
									src={record.headPortrait && record.headPortrait.length > 20 ? record.headPortrait : require(`../../assets/img/personHeadImg.jpg`)} 
									className='accountAvator' 
									style={{background: 'transparent', border: '1px solid #ccc'}}/>
									<div className='accountTitle'>
										<p className='title'>{record.shopName}</p>
										<p>{record.jcTerritoryName}</p>
									</div>
									{this.state.buttonRender.map((item, key) => item.type && item.type === 'delete' ?  
										<Popconfirm title="确定要删除吗?" onConfirm={_ => item.onclick(record)} okText="确定" cancelText="取消" key={key}>
									    	<a style={{paddingRight: 10}}>{item.title}</a>
									  	</Popconfirm>
										: <a style={{paddingRight: 10}} key={key} onClick={_ => item.onclick(record)}>{item.title}</a>
									)}
								</Row>
							)}
			    		</Spin>
			    	</TabPane>
			    )}
			</Tabs>
		</Row>
		<Modal
		title={this.state.modalState.title}
		{...Object.assign({}, this.state.modalState.delete ? {onOk: _ => console.log(1)} : {footer: null})}
		onCancel={_ => this.props.changeModal(false)}
		visible={this.props.modalState}>
			{this.state.modalState.render()}
		</Modal>
	</div>
}

export default MyShop