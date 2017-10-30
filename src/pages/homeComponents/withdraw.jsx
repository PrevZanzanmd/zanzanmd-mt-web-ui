import React from 'react'
import {connect} from 'react-redux'
import {Breadcrumb, Radio, Button, Select, Form, Row, InputNumber } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'
const RadioGroup = Radio.Group;
import { GET_PRIMARYBANK, FILTER_WITHDRAWBANK, WITHDRAW, GET_FEE } from '../../redux/Actions'
import { getBankType, fmoney } from '../../fetchApi/commonApi'

@connect(state => ({
    shoplist: state.fetchdata.shoplist,
    bankCardlist: state.fetchdata.bankCardlist,
    shopBalance: state.fetchdata.shopBalance,
    withdrawMsg: state.fetchdata.withdrawMsg,
    withdrawFee: state.fetchdata.withdrawFee
}), dispath => ({
    getPrimaryBank(param = {}){dispath({type: GET_PRIMARYBANK, param})},
    filterbank(param = {}){dispath({type: FILTER_WITHDRAWBANK, param})},
    withdraw(param = {}){dispath({type: WITHDRAW, param})},
    getFee(){dispath({type: GET_FEE})}
}))
class Withdraw extends React.Component {
    constructor(props){super(props)}
    componentWillMount = _ => {
        this.props.getPrimaryBank()
        this.props.getFee()
    }
    componentDidUpdate(){
        if(!this.state.selected && this.props.shoplist.length > 0)
            this.setState({selected: true, selectedItem: this.props.shoplist[0].id})
    }
    state = {
        radioVal: '',
        selected: false,
        selectedItem: '',
        searchParam: {},
        num: 0
    }
    setPrimaryShopId = _ => new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, {spShopId: this.props.shoplist[0].id})}, _ => rsl()))
    handleFilter = async param => {
        this.state.searchParam.spShopId ? null : await this.setPrimaryShopId()
        await new Promise((rsl, rej) => this.setState({searchParam: Object.assign({}, this.state.searchParam, param)}, _ => rsl()))
        this.props.filterbank(this.state.searchParam)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.state.searchParam.spShopId ? null : await this.setPrimaryShopId()
                values.bcBankCardTypeN = JSON.parse(values.bankCard).bcBankCardTypeN
                values.bcBankCardTypeId = JSON.parse(values.bankCard).bcBankCardTypeId
                values.bankNo = JSON.parse(values.bankCard).bankNo
                delete values.bankCard
                values.spShopId = this.state.searchParam.spShopId
                values.commission = fmoney(values.cashWithdrawal * this.props.withdrawFee / 1000)
                values.commissionRate = this.props.withdrawFee
                this.props.withdraw(values)
            }
        })
    }
    handleTwoHourTime = _ => {
        let date = new Date()
        let h = date.getHours() + 2
        let m = date.getMinutes()
        let handletime = t => t < 10 ? `0${t}` : t
        return `${handletime(h)}: ${handletime(m)}`
    }
    getTip = _ => {
        switch(this.props.withdrawMsg.toUpperCase()){
            case 'SUCCESS': return ''
            case 'PLEASE BINDING THE BANKCARD': return '未绑定银行卡'
            case 'WITHDRAWAL IS SUCCESS': return '当日已经提现'
            case 'OVERTIME': return '提现时间为9:00-18:00'
            default: return ''
        }
    }
    render = _ => {
        const { getFieldDecorator } = this.props.form
        const formCol = {labelCol: {span: 4}, wrapperCol: {span: 20}}
        return (
            <div>
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
                <Row style={{background: '#fff', paddingTop: 20, marginTop: 20}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                        {...formCol}
                        label='选择银行卡'>
                            {getFieldDecorator('bankCard', {rules:[{required: true, message: '请选择提现银行卡'}]})(
                                <RadioGroup>
                                    {this.props.bankCardlist.length > 0 ? this.props.bankCardlist.map((val, index) => 
                                        <Radio 
                                        value={this.state.radioVal}
                                        className="cash-bank" 
                                        value={JSON.stringify({bcBankCardTypeN: val.bcBankCardTypeN, bcBankCardTypeId: val.bcBankCardTypeId, bankNo: val.bankNo})} 
                                        key={index}>
                                            <div className="cash-bankbox">
                                                <div className="bank-box">
                                                    <span 
                                                    style={{backgroundImage: `url(${require(`../../assets/img/images/${getBankType(val.bcBankCardTypeN)}.png`)})`, backgroundSize: '16px 16px'}}
                                                    className="bank-img" ></span>
                                                    <span className="bank-name">{val.bcBankCardTypeN}</span>
                                                </div>
                                                <div>{`尾号${val.bankNo.substring(val.bankNo.length - 4, val.bankNo.length)}`}</div>
                                            </div>
                                        </Radio>
                                    ) : '未绑定银行卡'}
                                </RadioGroup>
                            )}
                            <span style={{color: 'rgb(163,163,163)'}}>{`提现手续费率${this.props.withdrawFee}‰`}</span>
                        </FormItem>
                        <FormItem
                        {...formCol}
                        label='提现金额'>
                            {getFieldDecorator('cashWithdrawal', {rules:[{required: true, message: '请填写提现金额'}]})(
                                <InputNumber width={120} min={0.01} onChange={val => this.setState({num: val || 0 }) }/>
                            )}
                            <span style={{fontSize:12+'px',color:'#a3a3a3', paddingLeft: 10}}>{`当前店铺余额${this.props.shopBalance.shopBalance ? this.props.shopBalance.shopBalance : 0}元`}</span>
                        </FormItem>   
                        <FormItem
                        {...formCol}
                        label='到账时间'>
                            <span className="cash-cont">{`${this.handleTwoHourTime()}前到账`}</span>
                        </FormItem>  
                        <FormItem
                        label=' '
                        colon={false}
                        {...formCol}>
                            <Row>
                                <Button 
                                disabled={this.props.withdrawMsg === 'SUCCESS' ? false : true}
                                type="primary" 
                                style={{marginRight: 20}} 
                                htmlType="submit">确定</Button>

                                <span style={ Object.assign({
                                    color: 'rgb(163, 163, 163)', 
                                    paddingRight: 20}, this.props.withdrawMsg != 'SUCCESS' || this.state.num <= 0 ? {display: 'none'} : null ) }>{`额外收取${ fmoney(this.state.num * this.props.withdrawFee / 1000) }元手续费`}</span>

                                <span 
                                style={Object.assign({color: 'red'}, this.props.withdrawMsg === 'SUCCESS' ? {visibility: 'hidden'} : null )}>{this.getTip()}</span>
                            </Row>
                        </FormItem>
                    </Form>
                </Row>
            </div>
        )
    }
}
Withdraw = Form.create({})(Withdraw)
export default Withdraw