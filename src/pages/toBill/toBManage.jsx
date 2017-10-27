import React from 'react'
import { connect } from 'react-redux'
import { Row, Select, Button, DatePicker, Col, Table, Pagination, message } from 'antd'
const Option = Select.Option
const { RangePicker } = DatePicker
import BCrumb from '../Components/bCrumb.jsx'
import { GET_SHOP_LIST } from '../../redux/Actions'
import moment from 'moment'
import { getTime, handleThreeMonthBill } from '../../fetchApi/commonApi'

@connect(state => ({
    shoplist: state.fetchdata.shoplist
}), dispath => ({
    getShopList(param = {}){dispath({type: GET_SHOP_LIST, param})}
}))
class ToBManage extends React.Component{
	componentWillMount(){
		this.props.getShopList()
	}

	componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0){
        	let d = getTime().Y
	        this.setState({ date: [moment(d), moment(d)], searchParam: Object.assign( {}, this.state.searchParam, {
	        	startTime: `${d} 00:00:00`,
	        	endTime: `${d} 23:59:59`
	        } ), selected: true })
        }
    }

	state={
		selectedItem: '',
		searchParam: {},
		selectKey: 'y',
		date: [],
		selected: false,
		btnRender: [{ label: '昨天', key: 'y', style: {marginRight: 15}, onClick: _ =>  this.handleSelectTimeBtnClick('y') },
		{ label: '上周', key: 'w', style: {marginRight: 15}, onClick: _ => this.handleSelectTimeBtnClick('w') },
		{ label: '上月', key: 'm', style: {marginRight: 15}, onClick: _ => this.handleSelectTimeBtnClick('m') }]
	}

	handleSelectTimeBtnClick = key => {
		let startTime,
			endTime,
			start,
			end,
			d = getTime()

		switch(key){
			case 'y':
				startTime = endTime = d.Y
				break
			case 'w':
				startTime = d.Ws,
				endTime = d.We
				break
			case 'm': 
				startTime = d.Ms,
				endTime = d.Me
				break
		}
		this.setState({ selectKey: key, date: [moment(startTime), moment(endTime)], searchParam: Object.assign( {}, this.state.searchParam, {startTime: `${startTime} 00:00:00`, endTime: `${endTime} 23:59:59`} ) })
	}

	handleDate = async dateString => {
        let obj = {...this.state.searchParam}
        if(dateString[0] == ''){
            delete obj.startTime
            delete obj.endTime
        }else{
            obj = Object.assign({}, obj, {startTime: `${dateString[0]} 00:00:00`, endTime: `${dateString[1]} 23:59:59`})
        }
        this.setState({ searchParam: obj, date: obj.startTime ? [moment(obj.startTime), moment(obj.endTime)] : [] })
    }

    handleDownload = _ => {
    	let obj = this.state.searchParam
    	if(!handleThreeMonthBill(obj.startTime)){
    		message.error('只能导出最近3个月的账单')
    	}else{
    		if(this.state.spShopId == ''){
	    		delete this.state
	    	}
	    	console.log(this.state.searchParam)
    	}
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
	                	let obj = this.state.searchParam
	                	if(val == ''){
	                		delete obj.spShopId
	                	}else{
	                		obj.spShopId = val
	                	}
	                    this.setState({selectedItem: val, searchParam: obj })
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
				<RangePicker 
				onChange={(date, dateString) => this.handleDate(dateString)} 
				value={this.state.date}
				size='default' 
				style={{width:220}}/>
			</Row>
			<Row>
				<Button type='primary' onClick={this.handleDownload}>下载</Button>
			</Row>
		</div>
	</div>
}

export default ToBManage