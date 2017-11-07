import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Modal, Form } from 'antd'
const FormItem = Form.Item
import BCrumb from '../Components/bCrumb.jsx'
import { S_GET_SHOPDETAIL, MODAL_STATE, GET_PAYSRCRET } from '../../redux/Actions'
import { fmoney } from '../../fetchApi/commonApi'

const style = {
	countTitle: {padding: '37px 0 37px 53px', fontSize: 15},
	countContent: {textAlign: 'center', fontSize: 30},
	countSpan: {paddingLeft: 5, fontSize: 20}
}

@connect(state => ({
	modalState: state.globaldata.modalState,
	downloaddata: state.fetchdata.downloaddata,
	shopInfo: state.fetchdata.shopDetail,
	todaytotal: state.fetchdata.todaytotal,
	qrcode: state.fetchdata.qrcodeUrl
}), dispath => ({
	getShopDetail(){dispath({type: S_GET_SHOPDETAIL})},
	changeModal(state){dispath({type: MODAL_STATE, data: state})},
	getQrcode(param){dispath({type: GET_PAYSRCRET, param})}
}))
class SAccountHome extends React.Component{
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
			src={this.props.downloaddata.url || require(`../../assets/img/personHeadImg.jpg`)} 
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
		<Row style = {{height: 200, background: '#3eba6c', color: '#fff'}}>
            <Col span={12} style={{height: 200, background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADICAIAAACmkByiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFMDk1MDdDQzM1RTExRTdCM0Q2QkY3QkVBNTQ4OTE4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFMDk1MDdEQzM1RTExRTdCM0Q2QkY3QkVBNTQ4OTE4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEUwOTUwN0FDMzVFMTFFN0IzRDZCRjdCRUE1NDg5MTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEUwOTUwN0JDMzVFMTFFN0IzRDZCRjdCRUE1NDg5MTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hfnoHAAABNUlEQVR42oxS2U7DQAyc3fBdfBFfyAcgUCUEKi2ltERVVQqkue9rl/WmaZIqHA/WeMZeexwFl9dXHMCvwcA4Yw2q5Mg55z3OiZOII/a4ofOGt7mBI7IOz/OOG5Rf9KLVhn18qI329GqK48Z6wt1hjom9wL29xKOzwtR9w9wzsfA3WAZbrMMdzGiPTfSBbfyFXWJhn9j4TB1YmQc79+HmAbwiQlDECMsEcZkiqTKkVY68LlDUJcq6QiUoatQqhBQUTEo5Fqom2x7dT+9K9Z7m0DyaS/NpD+2jvbSffDjKj5352h/5JL/km/zTHWb4jpW6i+6jO2fq3qm7xoPzqr7DCyaHZ9xaM66281p2IXq58jSoNfVz7Wcu/qGLMYTUKE661D6FbPWGS42N1uaEUmsN/vHvfwswAN6BbWh902CXAAAAAElFTkSuQmCC) no-repeat 100% 0'}}>
                <p style={style.countTitle}>今日总交易额</p>
                <p style={style.countContent}>{fmoney(this.props.todaytotal.todayTotalMoney || 0)}<span style={style.countSpan}>元</span></p>
            </Col>
            <Col span={12} style={{height: 200}}>
                <p style={style.countTitle}>今日交易笔数</p>
                <p style={style.countContent}>{this.props.todaytotal.succeedTotalNumber || 0}<span style={style.countSpan}>笔</span></p>
            </Col>
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

export default SAccountHome
