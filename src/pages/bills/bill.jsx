import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb, Button, Pagination, Select ,DatePicker, Table} from 'antd'
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

const data = [{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'},
{num: '40025086014562', time: '2017.07.29 12:30:36', count: '10.00', state: '交易成功'}]

class Bill extends React.Component {
    constructor(props){super(props)}
    state={
        searchRender: [{title: '交易时间',render: _ => <RangePicker size='default' style={{width:220}}/>},
            {title: '交易状态', option: ['成功', '失败']},
            {title: '交易店铺', option: ['111', '222']},
            {title: '交易方式', option: ['']}],
        mtCount: [{title: '今日总交易额', num: '8000.00'}, {title: '成功交易笔数', num: '300'}],
        columns: [{title: '分类', dataIndex: 'type', key: 'type', render: (text, record) => <img style={{width: 20, height: 20}} src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/>},
        {title: '订单号', dataIndex: 'num', key: 'num'},
        {title: '交易时间', dataIndex: 'time', key: 'time'},
        {title: '交易金额（元）', dataIndex: 'count', key: 'count', render: (text, record) => <div>{`¥${record.count}`}</div>},
        {title: '交易状态', dataIndex: 'state', key: 'state'},
        {title: '操作', dataIndex: 'operate', key: 'operate', render: (text, record) => <Link>详情</Link>}]
    }
    render = _ =><div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="trade">
            {this.state.searchRender.map((val, index) => <div key={index}>
                <span className="trade-label">{val.title}</span>
                {val.render ? val.render() : 
                    <Select 
                    placeholder='请选择'                        
                    style={{ width: 120}}>
                        {val.option ? val.option.map(item => <Option value={item} key={item}>{item}</Option>) : null}
                    </Select>
                }
            </div>)}
        </div>
        <div className="bill-container">
            <div className="home-account">
                {this.state.mtCount.map((val, index) => 
                    <div className="home-accountitem" key={index}>
                        <p className="home-stitle">{val.title}</p>
                        <p className="home-cash">{val.num}<span>{val.title === '今日总交易额' ? '元' : '笔'}</span></p>
                    </div>
                )}
            </div>

            <div className="bill-wrapper">
                <Table 
                columns={this.state.columns} 
                pagination={false}
                size='small'
                dataSource={data.map((val, index) => Object.assign({}, val, {key: index}))} />
                <div className="page-control">
                    <Button type="default">导出账单</Button>
                    <Pagination size="small" total={50}/>
                </div>
            </div>
        </div>
    </div>
}
export default Bill