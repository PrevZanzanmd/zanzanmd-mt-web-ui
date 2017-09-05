import React from 'react'
import { Pagination, Row, Modal } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'
import EditShopForm from './editShopForm.jsx'

class ShopAccount extends React.Component{
	state={
		modalState: false
	}
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		{[1, 2, 3, 4, 5].map(val => 
			<Row className='shopAccountItem' key={val}>
				<img className='accountAvator'/>
				<div className='accountTitle'>
					<p className='title'>过桥米线／金沙滩店</p>
					<p>长江东路666号</p>
				</div>
				<a onClick={_ => this.setState({modalState: true})}>编辑</a>
			</Row>
		)}
		<Row className='pagePagination'>
			<Pagination defaultCurrent={1} total={50} />
		</Row>
		<Modal
		onCancel={_ => this.setState({modalState: false})}
		footer={null}
		title='编辑店铺'
		visible={this.state.modalState}>
			<EditShopForm></EditShopForm>
		</Modal>
	</div>
}

export default ShopAccount