import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Button, Row, Pagination, Modal, Select, Spin } from 'antd'
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
        if(!this.state.selected && this.props.shoplist.length > 0)
            this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
    }
    state = {
    	selected: false,
    	selectedItem: '',
    	type: 0,
    	searchParam: {couponStatus: '', couponType: '1', page: 1, rows: 4},
    	statelist: [
    		// {title: '未上线', id: '1'},
    		{title: '未开始', id: '2'},{title: '已开始', id: '3'},{title: '已使用', id: '4'},{title: '已过期', id: '5'}]
    }
	openNotification = _ => 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
	handleFilter = async (param = {}, cb = this.props.getCardlist) => {
        this.state.searchParam.spShopId ? null : await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0].id})}, _ => rsl()))
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        cb(this.state.searchParam)
    }
    handleUsed = async _ => {
    	let obj = Object.assign({}, this.state.searchParam)
    	delete obj.couponStatus
    	delete obj.couponType
    	obj.spShopId ? null : obj.spShopId = this.props.shoplist[0].id
    	this.props.getUSedCard(obj)
    }
    // getCb = _ => this.state.searchParam.couponStatus === '4' ? this.props.getUSedCard : this.props.getCardlist
    getCb = _ => this.state.type == '2' ? this.handleUsed : this.props.getCardlist
    handleTabCheck = async key => {
    	await new Promise((rsl, rej) => this.setState({type: key}, _ => rsl()))
    	console.log(this.state.type == '2')
    	key != 2 ? this.handleFilter({couponType: String(Number(key) + 1)}, this.getCb()) : this.handleUsed()
    }
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} />
		<Row style={{background: '#fff'}}>
			<Tabs onChange={this.handleTabCheck} tabBarExtraContent={<div>
						<Link onClick={_ => this.props.changeModal(true)}>卡券使用说明</Link>
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
					</div>}>
			    {['优惠券', '红包', '已使用'].map((val, index) => 
				    <TabPane tab={val} key={index}>
				    	<Spin spinning={this.props.loading}>
				    		<CardList list={this.props.cardlistdata} handlePageChange={this.handleFilter}/>
				    	</Spin>
				    </TabPane>
			    )}
			</Tabs>
		</Row>
		<Modal
		title='卡券使用说明'
		onCancel={_ => this.props.changeModal(false)}
		footer={null}
		visible={this.props.modalState}>
			{this.openNotification()}
		</Modal>
	</div>
}


export default Card