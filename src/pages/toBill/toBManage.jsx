import React from 'react'
import { Row, Select, Button, DatePicker, Col, Table, Pagination } from 'antd'
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'

class ToBManage extends React.Component{
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<div>
				<span style={{padding: '0 10px 0 25px'}}>交易店铺</span>
				<Select style={{width: 120}} placeholder='请选择'>{['火车站'].map(val => <Option value={val} key={val}>{val}</Option>)}</Select>
			</div>
			<div>
				<Button type='primary'>日汇总</Button>
				<span style={{padding: '0 15px'}}>自定义时间</span>
				<DatePicker/>
			</div>
			<div>
				<Button icon='download'>导出账单</Button>
			</div>
		</div>
		<Row className='billCountContainer'>
			{['wx', 'aliy'].map((item, key) => 
				<Col span={12} className='ContainerCol' key={key}  style={item === 'wx' ? {justifyContent: 'flex-end'} : {}}>
					<div className={item === 'wx' ? 'WXitemContainer' : 'ALIYitemContainer'}>
						<span className='iconContainer'><img src={require(`../../assets/img/images/${item === 'wx' ? '微信' : '支付宝'}icon.png`)}/><p>支付宝</p></span>
						{[{
							title: '交易金额',
							count: '8000'
						},{
							title: '交易笔数',
							count: '8000'
						}].map((val, index) => <Row key={index}>
								<Col span={14} style={{textAlign: 'right'}} className='itemCol'>{`${val.title}：`}</Col>
								<Col span={10} className='itemCol'>{val.count}</Col>
							</Row>
						)}
					</div>
				</Col>
			)}
		</Row>
		<Row></Row>
	</div>
}

export default ToBManage