import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Button, Row, Pagination } from 'antd'
const TabPane = Tabs.TabPane
import BCrumb from '../Components/bCrumb.jsx'
import CardList from './cardList.jsx'

class Card extends React.Component{
	constructor(props){super(props)}
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} />
		<Row style={{background: '#fff'}}>
			<Tabs tabBarExtraContent={<Button size='small' style={{marginRight: 10}}>添加卡券</Button>}>
			    <TabPane tab="卡券管理" key="1">
			    	<CardList list={[1, 2, 3, 4]} />
			    </TabPane>
			    <TabPane tab="店铺优惠券" key="2">
			    	<CardList list={[1, 2, 3, 4]} />
			    </TabPane>
			    <TabPane tab="店铺红包" key="3">
			    	<CardList list={[1, 2, 3, 4]} />
			    </TabPane>
			</Tabs>
		</Row>
	</div>
}

export default Card