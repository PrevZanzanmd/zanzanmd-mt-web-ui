import React from 'react'
import { connect } from 'react-redux'
import { Select, Checkbox, Row, Col, Spin } from 'antd'
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'
import { GET_SHOP_LIST, GET_SHOPPERM, CHANGE_SHOPPERM, GET_PRIMARYPERMISSION } from '../../redux/Actions'

@connect(state => ({
	shoplist: state.fetchdata.shoplist,
	loading: state.globaldata.loading,
	shopPerm: state.fetchdata.shopPerm
}), dispath => ({
	getPrimaryPerm(){dispath({type: GET_PRIMARYPERMISSION})},
	getShopPerm(param = {}){dispath({type: GET_SHOPPERM, param: param})},
	changeshopperm(param = {}){dispath({type: CHANGE_SHOPPERM, param: param})}
}))
class ShopPermission extends React.Component{
	componentWillMount = _ => this.props.getPrimaryPerm()
	componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0)
            this.setState({selected: true, userId: this.props.shoplist[0].mtUserId })
    }
	state={selected: false, userId: ''}
	handleCheckperm = e => {
		e.preventDefault()
		let arr = []
		for(let i of this.props.shopPerm){
			if(i.isSelect == '0')
				arr.push(i.permissionId)
		}
		let has
		for(let i in arr){arr[i] === e.target.value ? has = i : null}
		has ? arr.splice(has, 1) : arr.push(e.target.value)
		this.props.changeshopperm(Object.assign({userId: this.state.userId}, arr.length ? {permissionId: arr.join(',')} : {}))
	}
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<div className='shopPermissionWrap'>
			<Row className='shopSelect'>
				<Select 
				style={{width: 120}}
				value={this.state.userId}
				onChange={async id => {
					await new Promise((rsl, rej) => this.setState({userId: id}, _ => rsl()) )
					this.props.getShopPerm({userId: id})
				}}
				placeholder='请选择店铺'>{
					this.props.shoplist.map((val, index) => <Option value={val.mtUserId} key={index}>{val.shopName}</Option>)
				}</Select>
			</Row>
			<Spin
			spinning={this.props.loading}>
				{this.props.shopPerm.map((val, index) => 
					<Row key={index} className='shopItem'>
						<Checkbox 
						value={val.permissionId} 
						checked={val.isSelect == '0'}
						onChange={this.handleCheckperm}>{val.permissionName}</Checkbox>
					</Row>
				)}
			</Spin>
		</div>
	</div>
}

export default ShopPermission