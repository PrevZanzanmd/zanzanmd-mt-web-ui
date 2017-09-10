import React from 'react'
import { connect } from 'react-redux'
import { Pagination, Row, Modal } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'
import EditShopForm from './editShopForm.jsx'
import { MODAL_STATE } from '../../redux/Actions'

@connect(state => ({
	modalState: state.globaldata.modalState
}), dispath => ({
	changeModal(state){dispath({type: MODAL_STATE, data: state})}
}))
class ShopAccount extends React.Component{
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		{[1, 2, 3, 4, 5].map(val => 
			<Row className='shopAccountItem' key={val}>
				<img className='accountAvator'/>
				<div className='accountTitle'>
					<p className='title'>过桥米线／金沙滩店</p>
					<p>长江东路666号</p>
				</div>
				<a onClick={_ => this.props.changeModal(true)}>编辑</a>
			</Row>
		)}
		<Modal
		onCancel={_ => this.props.changeModal(false)}
		footer={null}
		title='编辑店铺'
		visible={this.props.modalState}>
			<EditShopForm></EditShopForm>
		</Modal>
	</div>
}

export default ShopAccount