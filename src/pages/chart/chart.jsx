import React from 'react'
import { Row, Select, Button, DatePicker, Col, Table, Pagination } from 'antd'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
import BCrumb from '../Components/bCrumb.jsx'
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')

class Chart extends React.Component{
	createChart(id, data){
		const Chart = echarts.init(document.getElementById(id))
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
		Chart.setOption(option)
	}

	componentDidMount(){
		this.createChart('chart', {
			xData: [1, 2, 3, 4, 5],
			mainData: [0, 1100, 5412, 3313, 4414]
		})
	}
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<div style={{display: 'flex', alignItems: 'center'}}>
			<div>
				<span style={{padding: '0 10px 0 25px'}}>交易店铺</span>
				<Select style={{width: 120}} placeholder='请选择'>{['火车站'].map(val => <Option value={val} key={val}>{val}</Option>)}</Select>
			</div>
			<span style={{padding: '0 10px 0 25px'}}>请选择交易时间</span><RangePicker/>
			{['前一天', '后一天'].map((val, index) => <Button key={index} type='primary' size='small' style={{marginLeft: 15}}>{val}</Button>)}
		</div>
		<Row style={{marginTop: 17}}>
			{[[{title: '今日总交易额', count: '800'}, {title: '成功交易笔数', count: '50'}], [{title: '累计收入', count: '88'}, {title: '交易笔数', count: '77'}]].map((val, index) => <Col span={12} className='chartCountCol' key={index}>
				<Row className='wrap'>
					{val.map((item, key) => <Col span={12} key={key}>
						<p className='title'>{item.title}</p>
						<p className='count'>{item.count}</p>
					</Col>)}
				</Row>
			</Col>)}
		</Row>
		<Row className='billCountContainer' style={{border: 'none', position: 'relative'}}>
			<span style={{position: 'absolute', left: 25, top: 12, fontSize: 15}}>交易记录</span>
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
		<Row style={{background: '#fff', marginTop: 20, paddingBottom: 10}}>
			<p style={{padding: '15px 0 0 24px', fontSize: 15}}>近30天交易趋势</p>
			<div id = 'chart' style={{width: '100%', height: 244}}></div>
		</Row>
	</div>
}

export default Chart