import React from 'react'
import { connect } from 'react-redux'
import { Row, Select, Button, DatePicker, Col, Table, Pagination, Spin } from 'antd'
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { CHART_PRIMARY_LOAD, FILTER_CHART } from '../../redux/Actions'

let chart
@connect(state => ({
	loading: state.globaldata.loading,
    todaytotal: state.fetchdata.todaytotal,
    shoplist: state.fetchdata.shoplist,
    allTotaldata: state.fetchdata.allTotaldata,
    dayTotaldata: state.fetchdata.dayTotaldata,
    chartData: state.fetchdata.chartData.coordinateList
}), dispath => ({
	getPrimaryChart(){dispath({type: CHART_PRIMARY_LOAD})},
	filterChart(param = {}){dispath({type: FILTER_CHART, param: param})}
}))
class Chart extends React.Component{
	componentWillMount = _ => this.props.getPrimaryChart()
	state = {
		searchParam: {},
		isCreated: false,
		selected: false,
		selectedItem: ''
	}
	componentDidUpdate(){
		if(!this.state.isCreated){
			(async _ => {
				await new Promise((rsl, rej) => this.setState({isCreated: true}, _ => rsl()))
				chart = echarts.init(document.getElementById('chart'))
			})()
		}
		if(!this.state.selected && this.props.shoplist.length > 0){
			this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
		}
		if(this.props.chartData.length > 0)
			this.createChart({
				xData: this.props.chartData.map(val => val.time),
				mainData: this.props.chartData.map(val => val.money)
			})
	}
	createChart(data){
		const option = {
		    color: ['#3eba6c'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '2%',
		        right: '2%',
		        bottom: '5%',
		        top: '10%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : data.xData,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLine: {
				    	lineStyle: {
				    		color: '#888'
				    	}
				    }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine: {
		                show: false
		            },
		            nameTextStyle: {
		            	fontSize: 8
		            },
		            axisLine: {
				    	lineStyle: {
				    		color: '#888'
				    	}
				    }
		        }
		    ],
		    series : [
		        {
		            name:'交易金额',
		            type:'line',
		            barWidth: '60%',
		            data: data.mainData,
		            lineStyle: {
		            	normal: {
		            		width: 1
		            	}
		            },
		            areaStyle: {
		            	normal: {color: 'rgb(182, 255, 210)'}
		            }
		        }
		    ]
		}
		chart.setOption(option)
	}

	
	handleFilter = async param => {
        this.state.searchParam.spShopId ? null : await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0].id})}, _ => rsl()))
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        this.props.filterChart(this.state.searchParam)
    }
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<div style={{display: 'flex', alignItems: 'center'}}>
			<div>
				<span style={{padding: '0 10px 0 25px'}}>交易店铺</span>
				<Select 
                placeholder='请选择'
                onChange={val => {
                	this.setState({selectedItem: val})
                	this.handleFilter({spShopId: val})
                }}
                {...(_ => this.state.selectedItem !== '' ? {value: this.state.selectedItem} : {})()}                       
                style={{ width: 120}}>
                    {this.props.shoplist.map((val, index) => <Option value={val.id} key={index}>{val.shopName}</Option>)}
                </Select>
			</div>
			<span style={{padding: '0 10px 0 25px'}}>请选择交易时间</span><DatePicker onChange={(date, dateStr) => this.handleFilter({dayTime: dateStr})}/>
		</div>
		<Row style={{marginTop: 17}}>
			<Col span={12} className='chartCountCol'>
				<Row className='wrap'>
					<Col span={12}>
						<p className='title'>今日总交易额</p>
						<p className='count'>{this.props.dayTotaldata.totalMoney ? this.props.dayTotaldata.totalMoney : 0}</p>
					</Col>
					<Col span={12}>
						<p className='title'>成功交易笔数</p>
						<p className='count'>{this.props.dayTotaldata.totalNumber ? this.props.dayTotaldata.totalNumber : 0}</p>
					</Col>
				</Row>
			</Col>
			<Col span={12} className='chartCountCol'>
				<Row className='wrap'>
					<Col span={12}>
						<p className='title'>累计收入</p>
						<p className='count'>{this.props.allTotaldata.totalMoney ? this.props.allTotaldata.totalMoney : 0}</p>
					</Col>
					<Col span={12}>
						<p className='title'>交易笔数</p>
						<p className='count'>{this.props.allTotaldata.totalNumber ? this.props.allTotaldata.totalNumber : 0}</p>
					</Col>
				</Row>
			</Col>
		</Row>
		<Row className='billCountContainer' style={{border: 'none', position: 'relative'}}>
			<span style={{position: 'absolute', left: 25, top: 12, fontSize: 15}}>交易记录</span>
			{['wX', 'aLIY'].map((item, key) => 
				<Col span={12} className='ContainerCol' key={key}  style={item === 'wX' ? {justifyContent: 'flex-end'} : {}}>
					<div className={item === 'wX' ? 'WXitemContainer' : 'ALIYitemContainer'}>
						<span className='iconContainer'><img src={require(`../../assets/img/images/${item === 'wX' ? '微信' : '支付宝'}icon.png`)}/><p>支付宝</p></span>
						{[{title: '交易金额', key: 'TotalMoney'}, {title: '交易笔数', key: 'TotalNumber'}].map((val, index) => 
							<Row key={index}>
								<Col span={14} style={{textAlign: 'right', paddingRight: 10}} className='itemCol'>{val.title}</Col>
								<Col span={10} className='itemCol'>{this.props.dayTotaldata[`${item}${val.key}`] ? this.props.dayTotaldata[`${item}${val.key}`] : 0}</Col>
							</Row>
						)}
					</div>
				</Col>
			)}
		</Row>
		<Row style={{background: '#fff', marginTop: 20, paddingBottom: 10}}>
			<p style={{padding: '15px 0 0 24px', fontSize: 15}}>近30天交易趋势</p>
			<Spin spinning={this.props.loading}>
				<div id = 'chart' style={{width: '100%', height: 244}}></div>
			</Spin>
		</Row>
	</div>
}

export default Chart