import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Button, Row, Pagination, Modal, Select, notification, Spin } from 'antd'
import { Link } from 'react-router'
const Option = Select.Option
const TabPane = Tabs.TabPane
import BCrumb from '../Components/bCrumb.jsx'
import CardList from './cardList.jsx'
import CardForm from './cardForm.jsx'
import { MODAL_STATE, GET_CARDLIST, CARD_PRIMARY_LOAD, GET_USEDCARD } from '../../redux/Actions'

@connect(state => ({
    loading: state.globaldata.loading,
	modalState: state.globaldata.modalState,
    shoplist: state.fetchdata.shoplist,
	cardlistdata: state.fetchdata.cardlistdata
}), dispath => ({
	changeModal(state){dispath({type: MODAL_STATE, data: state})},
	getCardlist(param = {}){dispath({type: GET_CARDLIST, param})},
	getPrimaryCard(param = {}){dispath({type: CARD_PRIMARY_LOAD, param})},
	getUSedCard(param = {}){dispath({type: GET_USEDCARD, param})}
}))
class Card extends React.Component{
	constructor(props){super(props)}
	componentWillMount = async _ => {
		await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {couponStatus: this.state.statelist.map(val => val.id).join(',')})}, _ => rsl()))
		this.props.getPrimaryCard(this.state.searchParam)
	}
	componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0){
            this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
        }
    }
    state = {
    	selected: false,
    	selectedItem: '',
    	searchParam: {couponStatus: '', page: 1, rows: 4},
    	statelist: [{title: '未上线', id: '1'},{title: '未开始', id: '2'},{title: '已开始', id: '3'},{title: '已使用', id: '4'},{title: '已过期', id: '5'}]
    }
	openNotification = _ => notification.warning({
	    message: '卡券使用说明',
	    duration: null,
	    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
	})
	handleFilter = async (param = {}, cb = this.props.getCardlist) => {
        this.state.searchParam.spShopId ? null : await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0].id})}, _ => rsl()))
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        cb(this.state.searchParam)
    }
    handleRemove = async (key, cb = this.props.getCardlist) => {
    	let param = this.state.searchParam
    	delete param[key]
    	await new Promise((rsl, rej) => this.setState({searchParam: param}, _ => rsl()))
    	this.handleFilter({}, cb)
    }
    getCb = _ => this.state.searchParam.couponStatus === '4' ? this.props.getUSedCard : this.props.getCardlist
    handleTabCheck = key => key != 0 ? this.handleFilter({couponType: String(key)}, this.getCb()) 
    	: this.handleRemove('couponType', this.getCb())
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} />
		<Row style={{background: '#fff'}}>
			<Tabs onChange={this.handleTabCheck} tabBarExtraContent={<div>
						<Link onClick={this.openNotification}>卡券使用说明</Link>
						<Select 
		                placeholder='请选择店铺'
		                size='small'
		                onChange={val => {
		                    this.setState({selectedItem: val})
		                    this.handleFilter({spShopId: val}, this.getCb())
		                }}
		                {...(_ => this.state.selectedItem !== '' ? {value: this.state.selectedItem} : {})()}                      
		                style={{ width: 120, margin: '0 20px' }}>
		                    {this.props.shoplist.map((val, index) => <Option value={val.id} key={index}>{val.shopName}</Option>)}
		                </Select>
						<Select
						size='small'
						placeholder='请选择卡券状态'
						onChange={val => this.handleFilter({couponStatus: val}, val === '4' ? this.props.getUSedCard : this.props.getCardlist)}
						style={{width: 120, marginRight: 20}}>
							{this.state.statelist.map((val, index) => <Option value={val.id} key={index}>{val.title}</Option>)}
						</Select>
						<Button size='small' style={{marginRight: 10}} onClick={_ => this.props.changeModal(true)}>添加卡券</Button>
					</div>}>
			    {['所有卡券', '优惠券', '红包'].map((val, index) => 
				    <TabPane tab={val} key={index}>
				    	<Spin spinning={this.props.loading}>
				    		<CardList list={this.props.cardlistdata.list} />
				    	</Spin>
				    </TabPane>
			    )}
			</Tabs>
		</Row>
		<Modal
		title='添加卡包'
		footer={null}
		onCancel={_ => this.props.changeModal(false)}
		visible={this.props.modalState}>
			<CardForm searchParam={this.state.searchParam} onCancel={_ => this.props.changeModal(false)}/>
		</Modal>
	</div>
}

export default Card