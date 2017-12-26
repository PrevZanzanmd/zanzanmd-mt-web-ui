import React from 'react'
import {connect} from 'react-redux'
import {Breadcrumb, Radio, Button, Select, Form, Row, InputNumber, Checkbox } from 'antd'
const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'
const RadioGroup = Radio.Group;
import { GET_ALLBANK, WITHDRAW_ALL, GET_FEE } from '../../redux/Actions'
import { getBankType, fmoney, handleTime } from '../../fetchApi/commonApi'

@connect(state => ({
    shoplist: state.fetchdata.withdrawShop,
    bankCardlist: state.fetchdata.bankCardlist,
    withdrawMsg: state.fetchdata.withdrawMsg,
    withdrawFee: state.fetchdata.withdrawFee
}), dispath => ({
    getPrimaryBank(param = {}){dispath({type: GET_ALLBANK, param})},
    withdraw(param = {}){dispath({type: WITHDRAW_ALL, param})},
    getFee(){dispath({type: GET_FEE})}
}))
class WithdrawAll extends React.Component {
    constructor(props){super(props)}
    componentWillMount = _ => {
        this.props.getPrimaryBank()
        this.props.getFee()
    }

    componentWillReceiveProps(n){
        if(n.shoplist != this.props.shoplist){
            this.props.form.setFields({ shopList: { value: [] } })
        }
        if(this.props.form.getFieldValue('shopList') && this.props.shoplist && this.props.shoplist.length > 0){
            if(this.props.form.getFieldValue('shopList').length == this.props.shoplist.length){
                console.log(1)
                this.setState({checked: true})
            }else{
                this.setState({checked: false})
            }

        }
    }


    state = {
        radioVal: '',
        selected: false,
        selectedItem: '',
        searchParam: {},
        num: 0,
        checked: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.bcBankCardTypeN = JSON.parse(values.bankCard).bcBankCardTypeN
                values.bcBankCardTypeId = JSON.parse(values.bankCard).bcBankCardTypeId
                values.bankNo = JSON.parse(values.bankCard).bankNo
                delete values.bankCard
                values.shopList = values.shopList.map(val => {
                    let shop = JSON.parse(val),
                        commission = fmoney(shop.shopBalance * this.props.withdrawFee / 1000)
                    return {
                        spShopId: shop.id,
                        shopName: shop.shopName,
                        cashWithdrawal: shop.shopBalance - commission,
                        commission
                    }
                } )
                // console.log(values)
                this.props.withdraw(values)
            }
        })
    }
    handleCompleteTime = _ => {
        let date = new Date()
        date.setTime(date.getTime()+24*60*60*1000)
        return handleTime(date)
    }
    getTip = _ => {
        if(this.props.withdrawMsg)
            switch(this.props.withdrawMsg.toUpperCase()){
                case 'SUCCESS': return ''
                case 'PLEASE BINDING THE BANKCARD': return '未绑定银行卡'
                case 'WITHDRAWAL IS SUCCESS': return '当日已经提现'
                case 'OVERTIME': return '提现时间为17:00-24:00'
                case 'WITHDRAWAL_IS_NOT_SHOP': return '今日没有可提现店铺'
                case 'NONE_BANK': return '没有此银行卡'
                default: return ''
            }
    }

    getFee = (list, type) => {
        if(list && list.length > 0){
            list = list.map(val => JSON.parse(val).shopBalance)
            let balance = 0,
                commission

            for(let i of list){
                balance += Number(i)
            }

            commission = fmoney(balance * this.props.withdrawFee / 1000)

            return type == 'balance' ? (<div>
                    <span style={{display: 'block'}}>{`${balance} 元`}</span>
                    <span style={{color: '#ababab'}} >{`手续费 ${commission} 元`}</span>
                </div>) : (<div>{`${balance - commission} 元`}</div>)
        }
        return '0.00 元'
    }

    onChange = e => {
        let checked = e.target.checked,
            allShop = this.props.shoplist.map(v => JSON.stringify(v))

        this.setState({checked})
        this.props.form.setFields({ shopList: { value: checked ? allShop : [] } })
    }



    render = _ => {
        const { getFieldDecorator } = this.props.form
        const formCol = {labelCol: {span: 4}, wrapperCol: {span: 20}}
        return (
            <div>
                <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
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
                        </FormItem>
                        <FormItem
                        {...formCol}
                        label='提现店铺'>
                            <Checkbox onChange={this.onChange} checked={this.state.checked}>全选</Checkbox>
                            {getFieldDecorator('shopList', {rules:[{required: true, message: '请选择提现店铺'}]})(
                                    <CheckboxGroup 
                                    className='withAll' 
                                    options = {this.props.shoplist.map((val, key) => ({ 
                                    label: <span className='withCheck' >
                                        <span className='withContainer'>
                                            <span>{val.shopName}</span>
                                            <span>{`余额 ${val.shopBalance} 元`}</span>
                                        </span>
                                        <span className='withContainer withTip'>
                                            <span>{`手续费 ${fmoney(val.shopBalance * this.props.withdrawFee / 1000)} 元`}</span>
                                            <span>{`到账金额 ${val.shopBalance - fmoney(val.shopBalance * this.props.withdrawFee / 1000) } 元`}</span>
                                        </span>
                                    </span>, 
                                    value: JSON.stringify(val) }) )} 
                                    />
                            )}
                        </FormItem>
                        <FormItem
                        {...formCol}
                        label='提现金额'>
                            { this.getFee(this.props.form.getFieldValue('shopList'), 'balance') }
                        </FormItem>  
                        <FormItem
                        {...formCol}
                        label='到账金额'>
                            { this.getFee(this.props.form.getFieldValue('shopList')) }
                        </FormItem>  
                        <FormItem
                        {...formCol}
                        label='到账时间'>
                            <span className="cash-cont">{`${this.handleCompleteTime()} 前到账`}</span>
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
                                htmlType="submit">一键提现</Button>

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
WithdrawAll = Form.create({})(WithdrawAll)
export default WithdrawAll