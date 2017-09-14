import React from 'react'
import { connect } from 'react-redux'
import { Pagination, Row, Modal, Spin } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'
import EditShopForm from './editShopForm.jsx'
import { MODAL_STATE, GET_SHOP_LIST, GET_ACCOUNT_DETAIL } from '../../redux/Actions'

@connect(state => ({
	loading: state.globaldata.loading,
	modalState: state.globaldata.modalState,
	shoplist: state.fetchdata.shoplist,
}), dispath => ({
	changeModal(state){dispath({type: MODAL_STATE, data: state})},
	getShopList(param = {}){dispath({type: GET_SHOP_LIST, param: param})},
	getSpAccountDetail(param = {}){dispath({type: GET_ACCOUNT_DETAIL, param: param})}
}))
class ShopAccount extends React.Component{
	componentWillMount = _ => this.props.getShopList()
	state={id: ''}
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <Spin spinning={this.props.loading}>
			{this.props.shoplist.map((val, index) => 
				<Row className='shopAccountItem' key={index}>
					<img 
					src={val.headPortrait && val.headPortrait.length > 20 ? val.headPortrait : require(`../../assets/img/personHeadImg.jpg`)} 
					className='accountAvator' 
					style={{background: 'transparent', border: '1px solid #ccc'}}/>
					<div className='accountTitle'>
						<p className='title'>{val.account}</p>
						<p>{`负责人：${val.contacts}`}</p>
					</div>
					<a onClick={_ => {
						this.setState({id: val.mtUserId})
						this.props.getSpAccountDetail({id: val.mtUserId})
					}}>编辑</a>
				</Row>
			)}
		</Spin>
		<Modal
		onCancel={_ => this.props.changeModal(false)}
		footer={null}
		title='编辑店铺'
		visible={this.props.modalState}>
			<EditShopForm id={this.state.id}></EditShopForm>
		</Modal>
	</div>
}

export default ShopAccount