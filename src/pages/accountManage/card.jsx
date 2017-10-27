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
	openNotification = _ => (<div>
		<p>1.什么是赞赞买单红包？</p>
		<p>赞赞买单红包是为赞赞买单发行和认可的购物券，可在赞赞买单APP下单时使用，可抵扣相应的金额。</p>
		<p>２.赞赞买单红包可以找零兑换吗？</p>
		<p>赞赞买单红包不找零、不兑换。</p>
		<p>３.赞赞买单红包可以在其他平台使用吗？</p>
		<p>赞赞买单红包仅限在赞赞买单客户端内使用，不可在微信钱包、手机QQ等其他平台使用。</p>
		<p>4.赞赞买单红包的使用条件？</p>
		<p>赞赞买单红包需同时满足以下条件才可用：</p>
		<p>1)仅在线支付使用。</p>
		<p>2)仅限在发该商家红包的店铺使用。</p>
		<p>3)满足红包上的使用条件。</p>
		<p>注意事项：</p>
		<p>红包/优惠券一切费用由商家承担，与赞赞买单平台无关</p>
		<p>1.什么是赞赞买单优惠券？</p>
		<p>赞赞买单优惠券是商家自己发行的，在用户下单时可用于自己店铺内的优惠券，可抵扣相应的金额。</p>
		<p>2.赞赞买单优惠券可以找零、兑换吗？</p>
		<p> 赞赞买单优惠券不找零、不兑换。</p>
		<p>３.赞赞买单优惠券可以在其他平台使用吗？</p>
		<p>赞赞买单优惠券仅限在赞赞买单客户端内使用，不可在微信钱包、手机QQ等其他平台使用</p>
		<p>4.赞赞买单优惠券的使用条件？</p>
		<p>赞赞买单优惠券需同时满足以下条件才可用：</p>
		<p>(1)仅在线支付使用。</p>
		<p>(2)仅限在发该商家券的店铺使用。</p>
		<p>(3)满足优惠券上的使用条件。</p>
		<p>注意事项：</p>
	    <p>红包/优惠券一切费用由商家承担，与赞赞买单平台无关</p>
	</div>)
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