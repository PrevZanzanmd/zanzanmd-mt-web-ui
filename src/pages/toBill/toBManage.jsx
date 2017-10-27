import React from 'react'
import { connect } from 'react-redux'
import { Row, Select, Button, DatePicker, Col, Table, Pagination } from 'antd'
const Option = Select.Option
const { RangePicker } = DatePicker
import BCrumb from '../Components/bCrumb.jsx'
import { GET_SHOP_LIST } from '../../redux/Actions'

@connect(state => ({
    shoplist: state.fetchdata.shoplist
}), dispath => ({
    getShopList(param = {}){dispath({type: GET_SHOP_LIST, param})}
}))
class ToBManage extends React.Component{
	componentWillMount(){
		this.props.getShopList()
	}

	state={
		selectedItem: '',
		searchParam: {},
		selectKey: 'y',
		btnRender: [{ label: '昨天', key: 'y', style: {marginRight: 15}, onClick: _ =>  this.handleSelectTimeBtnClick('y') },
		{ label: '上周', key: 'w', style: {marginRight: 15}, onClick: _ => this.handleSelectTimeBtnClick('w') },
		{ label: '上月', key: 'm', style: {marginRight: 15}, onClick: _ => this.handleSelectTimeBtnClick('m') }]
	}

	handleSelectTimeBtnClick = key => this.setState({selectKey: key})

	handleDate = async dateString => {
        let obj = {...this.state.searchParam}
        if(dateString[0] == ''){
            delete obj.startTime
            delete obj.endTime
        }else{
            obj = Object.assign({}, obj, {startTime: `${dateString[0]} 00:00:00`, endTime: `${dateString[1]} 23:59:59`})
        }
        await new Promise((rsl, rej) => this.setState({ searchParam: Object.assign({}, obj, this.state.defaultPage) }, _ => rsl()))
    }

    handleDownload = _ => {
    	console.log(this.state.searchParam)
    }

	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<div style={{background: '#fff', padding: '25px 36px'}}>
			<Row style={{paddingBottom: 15}}>
				<div className="selcet-time" style={{display: 'flex', alignItems: 'center'}}>
	                <span style={{paddingRight: 10}}>选择店铺</span>
	                <Select 
	                placeholder='选择店铺'
	                onChange={val => {
	                    this.setState({selectedItem: val, searchParam: Object.assign({}, this.state.searchParam, {spShopId: val}) })
	                }}
	                {...{value: this.state.selectedItem}}                      
	                style={{ width: 120}}>
	                    {[{id: '', shopName: '所有店铺'}].concat(this.props.shoplist).map((val, index) => <Option value={val.id} key={index}>{val.shopName}</Option>)}
	                </Select>
	            </div>
			</Row>
			<Row style={{paddingBottom: 15}}>
				{this.state.btnRender.map((v, i) => <Button 
					{...v.key == this.state.selectKey ? {type: 'primary'} : {}} 
					style={v.style} 
					onClick={v.onClick} 
					key={i} >{v.label}</Button>)}
				<RangePicker onChange={(date, dateString) => this.handleDate(dateString)} size='default' style={{width:220}}/>
			</Row>
			<Row>
				<Button type='primary' onClick={this.handleDownload}>下载</Button>
			</Row>
		</div>
	</div>
}

export default ToBManage