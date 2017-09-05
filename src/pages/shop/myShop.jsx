import React from 'react'
import { Pagination, Row, Modal, Tabs, Button, Form, Popconfirm } from 'antd'
const FormItem = Form.Item
const TabPane = Tabs.TabPane
import BCrumb from '../Components/bCrumb.jsx'
import AddShopForm from './addShopForm.jsx'

class MyShop extends React.Component{
	state={
		modalState: {
			visible: false,
			title: '',
			delete: false,
			render: _ => <div></div>
		},
		shopDetailList: [
			{title: '店铺状态', value: '上线'},
			{title: '店铺区域', value: '111111'},
			{title: '店铺地址', value: '上1111111线'},
			{title: '行业分类', value: '上1111111线'},
			{title: '店铺电话', value: '11111111111'},
			{title: '店铺负责人', value: '222'},
			{title: '店铺二维码', value: (_ => <img style={{width: 45, height: 45, background: '#ccc'}}/>)()}
		],
		buttonRender: [{
			title: '查看二维码',
			onclick: _ => this.handleModalState({
				visible: true, 
				delete: false, 
				title: '二维码', 
				render: _ => <div style={{display: 'flex', justifyContent: 'center'}}><img style={{width: 300, height: 300, background: '#ccc'}}/></div>
			})
		},{
			title: '详情',
			onclick: _ => this.handleModalState({visible: true, delete: false, title: '店铺详情', render: _ => <Form>
				{this.state.shopDetailList.map((val, index) => 
					<FormItem
					style={{marginBottom: 10}}
					key={index}
					label={val.title}
					{...{labelCol: {span: 5}, wrapperCol: {span: 19}}}>{val.value}</FormItem>
				)}
			</Form>
			})
		},{
			title: '编辑',
			onclick: _ => this.modalAddShop({type: 'edit', title: '编辑店铺'})
		},{
			title: '删除',
			type: 'delete',
			onclick: _ => console.log('delete')
		}]
	}
	handleModalState = param => this.setState({modalState: Object.assign({}, this.state.modalState, param)})
	modalAddShop = ({type, title}) => this.handleModalState({visible: true, delete: false, title: title, render: _ => <AddShopForm type={type}/>})
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} style={{margin: 0}}></BCrumb>
		<Row>
			<Tabs tabBarExtraContent={<Button onClick={_ => this.modalAddShop({type: 'add', title: '添加店铺'})}>添加店铺</Button>}>
			    {['所有店铺', '已上线店铺', '已下线店铺'].map((val, index) => 
			    	<TabPane tab={val} key={index}>
			    		{[1, 2, 3, 4, 5].map(val => 
							<Row className='shopAccountItem' key={val}>
								<img className='accountAvator'/>
								<div className='accountTitle'>
									<p className='title'>过桥米线／金沙滩店</p>
									<p>长江东路666号</p>
								</div>
								{this.state.buttonRender.map((item, key) => item.type && item.type === 'delete' ?  
									<Popconfirm title="确定要删除吗?" onConfirm={item.onclick} okText="确定" cancelText="取消" key={key}>
								    	<a style={{paddingRight: 10}}>{item.title}</a>
								  	</Popconfirm>
									: <a style={{paddingRight: 10}} key={key} onClick={item.onclick}>{item.title}</a>
								)}
							</Row>
						)}
						<Row className='pagePagination'>
							<Pagination defaultCurrent={1} total={50} />
						</Row>
			    	</TabPane>
			    )}
			</Tabs>
		</Row>
		<Modal
		title={this.state.modalState.title}
		{...Object.assign({}, this.state.modalState.delete ? {onOk: _ => console.log(1)} : {footer: null})}
		onCancel={_ => this.handleModalState({visible: false})}
		visible={this.state.modalState.visible}>
			{this.state.modalState.render()}
		</Modal>
	</div>
}

export default MyShop