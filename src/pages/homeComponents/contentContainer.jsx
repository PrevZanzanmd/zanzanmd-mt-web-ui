import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb, Table, Row, Select } from 'antd'
const Option = Select.Option
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { GET_PRIMARYHOME, FILTER_HOMEMESS, MODAL_STATE } from '../../redux/Actions'
import WithdrawModal from './withdrawModal.jsx'
import { judgeWithDrawState, fmoney } from '../../fetchApi/commonApi'

@connect(state => ({
    loading: state.globaldata.loading,
    modalState: state.globaldata.modalState,
    shoplist: state.fetchdata.shoplist,
    shopBalance: state.fetchdata.shopBalance,
    todaytotal: state.fetchdata.todaytotal,
    withdrawlist: state.fetchdata.withdrawlist
}), dispath => ({
    getPrimaryHome(param = {}){dispath({type: GET_PRIMARYHOME, param})},
    filterHome(param = {}){dispath({type: FILTER_HOMEMESS, param})},
    changeModal(state){dispath({type: MODAL_STATE, data: state})}
}))
class ContentContainer extends React.Component {
    constructor(props){super(props)}
    componentWillMount = _ => this.props.getPrimaryHome()
    componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0)
            this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
    }
    state={
        selected: false,
        selectedItem: '',
        searchParam: {},
        withdrawItem: {},
        headerCount: [{title: '账户余额', num: 'shopBalance', render: _ => <Link to="/home/withdraw">提现</Link>},
        {title: '今日总交易额', num: 'todaytotal'},
        {title: '成功交易笔数', num: 'todaytotal'}],
        columns: [{title: '提现时间', dataIndex: 'createTime', key: 'createTime'},
        {title: '提现方式', dataIndex: 'bcBankCardTypeN', key: 'bcBankCardTypeN'},
        {title: '提现金额', dataIndex: 'cashWithdrawal', key: 'cashWithdrawal', render: (text, record) => <div>{`¥${fmoney(record.cashWithdrawal)}`}</div>},
        {title: '提现状态', dataIndex: 'cashWithdrawalStatus', key: 'cashWithdrawalStatus', render: (text, record) => judgeWithDrawState(record.cashWithdrawalStatus)},
        {title: '操作', dataIndex: 'operate', key: 'operate', render: (text, record) => <Link onClick={async _ => {
            await new Promise((rsl, rej) => this.setState({withdrawItem: record}, _ => rsl()))
            this.props.changeModal(true)
        }}>详情</Link>}]
    }
    handleFilter = async param => {
        this.state.searchParam.spShopId ? null : await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0].id})}, _ => rsl()))
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        this.props.filterHome(this.state.searchParam)
    }
    handleNum = num => num || 0
    render = _ =><div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div>
                <span style={{paddingRight: 10}}>选择店铺</span>
                <Select 
                placeholder='选择店铺'
                onChange={val => {
                    this.setState({selectedItem: val})
                    this.handleFilter({spShopId: val})
                }}
                {...(_ => this.state.selectedItem !== '' ? {value: this.state.selectedItem} : {})()}                      
                style={{ width: 120}}>
                    {this.props.shoplist.map((val, index) => <Option value={val.id} key={index}>{val.shopName}</Option>)}
                </Select>
            </div>
        </div>
        <div className="cont-container">
            <div className="home-account">
                {this.state.headerCount.map((val, index) => 
                    <div className="home-accountitem" key={index}>
                        <p className="home-stitle">{val.title}</p>
                        <p className="home-cash">
                            {this.handleNum(val.num === 'shopBalance' ? fmoney(this.props.shopBalance.shopBalance) 
                            : val.title === '成功交易笔数' ? this.props.todaytotal.succeedTotalNumber : fmoney(this.props.todaytotal.todayTotalMoney))}
                            <span style={{paddingLeft: 5}}>{val.title === '成功交易笔数' ? '笔' : '元'}</span>
                        </p>
                        {val.render ? val.render() : null}
                    </div>
                )}
            </div>
            <div className="home-withdraw">
                <Table 
                columns={this.state.columns} 
                loading={this.props.loading}
                pagination={false}
                title={_ => <div>最近提现记录</div>}
                showHeader={false}
                size='small'
                dataSource={this.props.withdrawlist.list.map((val, index) => Object.assign({}, val, {key: index}))} />
                <Link className="withdraw-link" to="/home/withdrawRecord">查看所有提现记录</Link>
            </div>
        </div>
        <WithdrawModal visible={this.props.modalState} data={this.state.withdrawItem} onCancel={_ => this.props.changeModal(false)}/>
    </div>
}
export default ContentContainer