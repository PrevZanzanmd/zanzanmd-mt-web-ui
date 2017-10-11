import React from 'react'
import {connect} from 'react-redux'
import { Breadcrumb, Select, Spin, Pagination } from 'antd'
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'
import { GET_WITHDRAWLIST, GET_PRIMARYWITHDRAW, MODAL_STATE } from '../../redux/Actions'
import WithdrawModal from './withdrawModal.jsx'
import { judgeWithDrawState, fmoney } from '../../fetchApi/commonApi'

@connect(state => ({
    loading: state.globaldata.loading,
    modalState: state.globaldata.modalState,
    withdrawlist: state.fetchdata.withdrawlist,
    shoplist: state.fetchdata.shoplist
}), dispath => ({
    getWithDraw(param = {}){dispath({type: GET_WITHDRAWLIST, param})},
    getPrimaryWithDraw(param = {}){dispath({type: GET_PRIMARYWITHDRAW, param})},
    changeModal(state){dispath({type: MODAL_STATE, data: state})}
}))
class WithdrawRecord extends React.Component {
    componentWillMount = _ => this.props.getPrimaryWithDraw(this.state.searchParam)
    componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0)
            this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
    }
    state={
        selected: false,
        selectedItem: '',
        searchParam: {page: 1, rows: 10},
        withdrawItem: {}
    }
    handleFilter = async param => {
        this.state.searchParam.spShopId ? null : await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0].id})}, _ => rsl()))
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        this.props.getWithDraw(this.state.searchParam)
    }
    render = _ =><div className='contentContainer'>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
        <div className="widthdraw">
            <div className="selcet-time" style={{display: 'flex', alignItems: 'center'}}>
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
            <Spin spinning={this.props.loading}>
                <ul className="widthdraw-wrapper">
                    {this.props.withdrawlist.list.map((val, index) => 
                        <li className="widthdraw-record" key={index}>
                            <div style={{flex:2}}>
                                <img className="bankimg" src="http://p2.so.qhimgs1.com/t016449f1b71623bc92.jpg"/>
                                <div className="bank-time">
                                    <span>{val.createTime.split(' ')[0]}</span>
                                    <span className="widthdarw-sub">{val.createTime.split(' ')[1]}</span>
                                </div>
                            </div>
                            <div className="bank-name" style={{flex:4}}>
                                <span>{val.bcBankCardTypeN}</span>
                            </div>
                            <div style={{flex:2}}>
                                <p className="widthdraw-money">￥<span>{fmoney(val.cashWithdrawal)}</span></p>
                            </div>
                            <div style={{flex:2}}>{val.cashWithdrawalStatus ? judgeWithDrawState(val.cashWithdrawalStatus) : ''}</div>
                            <div className="details" style={{flex:2}}><a className="withdraw-link" onClick={async _ => {
                                await new Promise((rsl, rej) => this.setState({withdrawItem: val}, _ => rsl()))
                                this.props.changeModal(true)
                            }}>详情</a></div>
                        </li>
                    )}
                </ul>
            </Spin>
            <div className="pagination">
                <Pagination 
                size="small" 
                onChange={(page, pageSize) => this.handleFilter({'page': page, 'rows': pageSize})}
                total={this.props.withdrawlist.total == '0' || !this.props.withdrawlist.total ? 1 : this.props.withdrawlist.total}/>
            </div>
        </div>
        <WithdrawModal visible={this.props.modalState} data={this.state.withdrawItem} onCancel={_ => this.props.changeModal(false)}/>
    </div>
}

export default WithdrawRecord