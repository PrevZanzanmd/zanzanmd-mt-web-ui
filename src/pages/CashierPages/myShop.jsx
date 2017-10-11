import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Form } from 'antd'
const FormItem = Form.Item
import BCrumb from '../Components/bCrumb.jsx'
import { S_GET_SHOPDETAIL, MODAL_STATE, GET_PAYSRCRET } from '../../redux/Actions'
import { fmoney } from '../../fetchApi/commonApi'

@connect(state => ({
	modalState: state.globaldata.modalState,
	downloaddata: state.fetchdata.downloaddata,
	shopInfo: state.fetchdata.shopDetail,
	qrcode: state.fetchdata.qrcodeUrl
}), dispath => ({
	getShopDetail(){dispath({type: S_GET_SHOPDETAIL})},
	changeModal(state){dispath({type: MODAL_STATE, data: state})},
	getQrcode(param){dispath({type: GET_PAYSRCRET, param})}
}))
class CAShop extends React.Component{
	componentWillMount(){
		this.props.getShopDetail()
	}
	state = {
		modalState: {
			title: '',
			render: _ => <div></div>
		},
		shopDetailList: [
			{key: 'lineState', title: '店铺状态', render: state => state === '0' ? '上线' : '未上线'},
			{key: 'jcTerritoryName', title: '店铺区域'},
			{key: 'territoryDetail', title: '店铺地址'},
			{key: 'spIndustryName', title: '行业分类'},
			{key: 'phone', title: '店铺电话'},
			{key: 'contacts', title: '店铺负责人'}
		]
	}

	modal = async (modalState, type = 'code') => {
		await new Promise((rsl, rej) => this.setState({modalState}, _ => rsl()))
		type == 'code' ? null : this.props.changeModal(true)
	}

	render = _ => <div>
		<BCrumb routes={this.props.routes} params={this.props.params} style={{margin: 0}}></BCrumb>
		<Row className='shopAccountItem' style={{marginTop: 25, marginBottom: 30}}>
			<img 
			src={this.props.shopInfo.headPortrait || require(`../../assets/img/personHeadImg.jpg`)} 
			className='accountAvator' 
			style={{background: 'transparent', border: '1px solid #ccc'}}/>
			<div className='accountTitle'>
				<p className='title'>{this.props.shopInfo.shopName || ''}</p>
				<p>{this.props.shopInfo.jcTerritoryName 
					? `${this.props.shopInfo.jcTerritoryName} ${this.props.shopInfo.territoryDetail}` 
					: ''}</p>
			</div>
			<a style={{paddingRight: 10}} onClick={_ => {
				this.props.getQrcode({shopId: this.props.shopInfo.id})
				this.modal({
					title: '店铺二维码',
					render: _ => <div style={{display: 'flex', justifyContent: 'center'}}><img src={this.props.qrcode} style={{width: 300, height: 300, background: '#ccc'}}/></div>
				})
			}}>查看二维码</a>
			<a style={{paddingRight: 10}} onClick={_ => this.modal({
				title: '店铺详情',
				render: _ => <Form>
					{this.state.shopDetailList.map((val, index) => <FormItem
					style={{marginBottom: 10}}
					key={index}
					label={val.title}
					{...{labelCol: {span: 5}, wrapperCol: {span: 19}}}>{val.render ? val.render(this.props.shopInfo[val.key]) : this.props.shopInfo[val.key]}</FormItem>)}
				</Form>
			}, 'detail')}>详情</a>
		</Row>
        <Modal
		title={this.state.modalState.title}
		footer={null}
		onCancel={_ => this.props.changeModal(false)}
		visible={this.props.modalState}>
			{this.state.modalState.render()}
		</Modal>
	</div>
}

export default CAShop
