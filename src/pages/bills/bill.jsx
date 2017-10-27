import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb, Button, Pagination, Select ,DatePicker, Table, Modal, Form, message } from 'antd'
const FormItem = Form.Item
import { Link } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
import { BILL_PRIMARY_LOAD, FILTER_BILL, GET_BILLDETAIL, MODAL_STATE, TODO_EXCEL } from '../../redux/Actions'
import { handleTime, fmoney } from '../../fetchApi/commonApi'

@connect(state => ({
    loading: state.globaldata.loading,
    modalState: state.globaldata.modalState,
    billlistdata: state.fetchdata.billlistdata,
    shoplist: state.fetchdata.shoplist,
    todaytotal: state.fetchdata.todaytotal,
    billDetail: state.fetchdata.billDetail
}), dispath => ({
    getPrimaryBill(param = {}){dispath({type: BILL_PRIMARY_LOAD, param: param})},
    filterBill(param = {}){dispath({type: FILTER_BILL, param: param})},
    getBillDetail(param = {}){dispath({type: GET_BILLDETAIL, param: param})},
    changeModal(state){dispath({type: MODAL_STATE, data: state})},
    todoExcel(param = {}){dispath({type: TODO_EXCEL, param})}
}))
class Bill extends React.Component {
    constructor(props){super(props)}
    componentWillMount(){
        this.props.getPrimaryBill()
    }
    componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0)
            this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
    }
    state={
        selected: false,
        selectedItem: '',
        searchRender: [{title: '交易时间',render: _ => <RangePicker onChange={(date, dateString) => this.handleDate(dateString)} size='default' style={{width:220}}/>},
            {title: '交易状态', option: [{title: '全部', value: ''}, {title: '待支付', value: '1'}, {title: '收款成功', value: '2'}, {title: '已关闭', value: '3'}, {title: '已退款', value: '4'}, {title: '退款失败', value: '5'}]},
            {title: '交易方式', option: [{title: '全部', value: ''}, {title: '微信', value: 'WX'}, {title: '支付宝', value: 'ALIY'}]}],
        mtCount: [{title: '今日总交易额', num: '8000.00'}, {title: '成功交易笔数', num: '300'}],
        columns: [{title: '支付方式', dataIndex: 'paymentType', key: 'paymentType', render: (text, record) => <div>{record.paymentType === 'WX' ? '微信' : '支付宝'}</div>},
        {title: '订单号', dataIndex: 'serialNumber', key: 'serialNumber'},
        {title: '交易时间', dataIndex: 'date', key: 'date'},
        {title: '交易金额（元）', dataIndex: 'transactionPrice', key: 'transactionPrice', render: (text, record) => <div>{`¥${fmoney(record.transactionPrice)}`}</div>},
        {title: '交易状态', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (text, record) => <div>{this.chooseState(record.paymentStatus)}</div>},
        {title: '操作', dataIndex: 'operate', key: 'operate', render: (text, record) => <Link onClick={_ => this.props.getBillDetail({id: record.id})}>详情</Link>}],
        detailItem: [{label: '交易状态', key: 'paymentStatus', render: state => this.chooseState(state)},
        {label: '实收金额', key: 'receivedPrice', render: m => fmoney(m)},
        {label: '交易金额', key: 'transactionPrice', render: m => fmoney(m)},
        {label: '交易时间', key: 'tradingTime', render: time => handleTime(time)},
        {label: '付款方式', key: 'paymentType', render: type => type === 'WX' ? '微信' : '支付宝'},
        {label: '收银员', key: 'cashierName'},
        {label: '交易单号', key: 'serialNumber'},
        {label: '交易门店', key: 'merchantName'}],
        searchParam: {'page': 1, 'rows': 10},
        pagination: {
            current: 1,
            defaultPageSize: 10,
            onChange: (page, rows) => {
                this.setState({pagination: Object.assign({}, this.state.pagination, {current: page})})
                this.handleFilter({page, rows})
            }
        },
        defaultPage: {page: 1, rows: 10}
    }
    handleFilter = async param => {
        this.state.searchParam.spShopId ? null : await this.handleInitialShopId()
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        this.props.filterBill(this.state.searchParam)
    }
    handleDate = async dateString => {
        this.state.searchParam.spShopId ? null : await this.handleInitialShopId()
        let obj = {...this.state.searchParam}
        if(dateString[0] == ''){
            delete obj.startTime
            delete obj.endTime
        }else{
            obj = Object.assign({}, obj, {startTime: dateString[0], endTime: `${dateString[1]} 23:59:59`})
        }
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, obj, this.state.defaultPage)
            ,pagination: Object.assign({}, this.state.pagination, {current: 1})}, _ => rsl()))
        this.props.filterBill(this.state.searchParam)
    }
    chooseState = state => {
        switch(state){
            case '1': return '待支付'
            case '2': return '收款成功'
            case '3': return '已关闭'
            case '4': return '已退款'
            case '5': return '退款失败'
            default: return 
        }
    }
    handleInitialShopId = _ => new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0] ? this.props.shoplist[0].id : '' })}, _ => rsl()))
    handleExcel = async _ => {
        this.state.searchParam.spShopId ? null : await this.handleInitialShopId()
        this.state.searchParam.startTime && this.state.searchParam.endTime ? 
            this.props.todoExcel({startTime: this.state.searchParam.startTime, endTime: this.state.searchParam.endTime, shopId: this.state.searchParam.spShopId}) : message.error('请选择时间范围')
    }

    handleSearch = async (val, key) => {
        this.state.searchParam.spShopId ? null : await this.handleInitialShopId()
        let obj = Object.assign({}, this.state.searchParam)
        val ? (obj[key] = val) : delete obj[key]
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, obj, this.state.defaultPage)
            ,pagination: Object.assign({}, this.state.pagination, {current: 1})}, _ => rsl()))
        this.props.filterBill(this.state.searchParam)
    }

    render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="trade">
            <div>
                <span className="trade-label">交易店铺</span>
                <Select 
                placeholder='请选择'
                onChange={val => {
                    this.setState({selectedItem: val})
                    this.handleSearch(val, 'spShopId' )
                }}
                {...(_ => this.state.selectedItem !== '' ? {value: this.state.selectedItem} : {})()}                      
                style={{ width: 120}}>
                    {this.props.shoplist.map((val, index) => <Option value={val.id} key={index}>{val.shopName}</Option>)}
                </Select>
            </div>
            {this.state.searchRender.map((val, index) => <div key={index}>
                <span className="trade-label">{val.title}</span>
                {val.render ? val.render() : 
                    <Select 
                    placeholder='请选择'
                    onChange={item => this.handleSearch(item, val.title === '交易状态' ? 'paymentStatus' : 'paymentType' )}
                    {...(_ => val.value ? {value: val.value} : {})()}                       
                    style={{ width: 120 }}>
                        {val.option ? val.option.map((item, key) => <Option value={item.value} key={key}>{item.title}</Option>) : null}
                    </Select>
                }
            </div>)}
        </div>
        <div className="bill-container">
            <div className="home-account">
                <div className="home-accountitem">
                    <p className="home-stitle">今日总交易额</p>
                    <p className="home-cash">{fmoney(this.props.todaytotal.todayTotalMoney)}<span style={{paddingLeft: 5}}>元</span></p>
                </div>
                <div className="home-accountitem">
                    <p className="home-stitle">成功交易笔数</p>
                    <p className="home-cash">{this.props.todaytotal.succeedTotalNumber || 0}<span style={{paddingLeft: 5}}>笔</span></p>
                </div>
            </div>

            <div className="bill-wrapper">
                <Table 
                columns={this.state.columns} 
                pagination={false}
                size='small'
                loading={this.props.loading}
                dataSource={this.props.billlistdata.transactionLists.map((val, index) => Object.assign({}, val, {key: index}))} />
                <div className="page-control">
                    <Button type="default" onClick={this.handleExcel}>导出账单</Button>
                    <Pagination 
                    size="small" 
                    {...this.state.pagination}
                    total={this.props.billlistdata.totalNum == '0' || !this.props.billlistdata.totalNum ? 1 : this.props.billlistdata.totalNum}/>
                </div>
            </div>
        </div>
        <Modal
        visible={this.props.modalState}
        onCancel={_ => this.props.changeModal(false)}
        footer={<Button type = 'primary' onClick={_ => this.props.changeModal(false)} >确定</Button>}
        title='交易详情'>
            {this.state.detailItem.map((val, index) => <FormItem
            key={index}
            label={val.label}
            {...{labelCol: {span: 4}, wrapperCol: {span: 20}}}>
                {val.render ? val.render(this.props.billDetail[val.key]) : this.props.billDetail[val.key]}
            </FormItem>)}
        </Modal>
    </div>
}
export default Bill








