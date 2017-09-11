import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb, Table, Row, Select } from 'antd'
const Option = Select.Option
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { GET_SHOP_LIST } from '../../redux/Actions'

const data = [{time: '2017.07.28', source: '中国银行提现', count: '800', state: '提现成功'},
{time: '2017.07.28', source: '中国银行提现', count: '800', state: '提现成功'},
{time: '2017.07.28', source: '中国银行提现', count: '800', state: '提现成功'},
{time: '2017.07.28', source: '中国银行提现', count: '800', state: '提现成功'}]

@connect(state => ({}), dispath => ({
    getShopList(param = {}){dispath({type: GET_SHOP_LIST, param: param})}
}))
class ContentContainer extends React.Component {
    constructor(props){super(props)}
    componentWillMount = _ => this.props.getShopList()
    state={
        headerCount: [{title: '账户余额', num: '608.00', render: _ => <Link to="/home/withdraw">提现</Link>},
        {title: '今日总交易额', num: '8000.00'},
        {title: '成功交易笔数', num: '300.00'}],
        columns: [{title: '提现时间', dataIndex: 'time', key: 'time'},
        {title: '提现方式', dataIndex: 'source', key: 'source'},
        {title: '提现金额', dataIndex: 'count', key: 'count', render: (text, record) => <div>{`¥${record.count}`}</div>},
        {title: '提现状态', dataIndex: 'state', key: 'state'},
        {title: '操作', dataIndex: 'operate', key: 'operate', render: (text, record) => <Link>详情</Link>}]
    }
    render = _ =><div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div>
                <span style={{padding: '0 10px 0 25px'}}>选择店铺</span>
                <Select style={{width: 120}} placeholder='请选择'>{['火车站'].map(val => <Option value={val} key={val}>{val}</Option>)}</Select>
            </div>
        </div>
        <div className="cont-container">
            <div className="home-account">
                {this.state.headerCount.map((val, index) => 
                    <div className="home-accountitem" key={index}>
                        <p className="home-stitle">{val.title}</p>
                        <p className="home-cash">{val.num}<span>{val.title === '成功交易笔数' ? '笔' : '元'}</span></p>
                        {val.render ? val.render() : null}
                        <a>查看</a>
                    </div>
                )}
            </div>
            <div className="home-withdraw">
                <Table 
                columns={this.state.columns} 
                pagination={false}
                title={_ => <div>最近提现记录</div>}
                showHeader={false}
                size='small'
                dataSource={data.map((val, index) => Object.assign({}, val, {key: index}))} />
                <Link className="withdraw-link" to="/home/withdrawRecord">查看所有提现记录</Link>
            </div>
        </div>
    </div>
}
export default ContentContainer