import React from 'react'
import { Select, Checkbox, Row, Col } from 'antd'
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'

class ShopPermission extends React.Component{
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<div className='shopPermissionWrap'>
			<Row className='shopSelect'>
				<Select 
				style={{width: 120}}
				defaultValue='111'>{
					['111', '222'].map(val => <Option value={val} key={val}>{val}</Option>)
				}</Select>
			</Row>
			{['查看账单', '查看收银员', '申请充值金', '提现'].map(val => 
				<Row key={`${val}Row`} className='shopItem'>
					<Checkbox value={val} onChange={e => {
						e.preventDefault()
						console.log(e.target.value)
					}}>{val}</Checkbox>
				</Row>
			)}
		</div>
	</div>
}

export default ShopPermission