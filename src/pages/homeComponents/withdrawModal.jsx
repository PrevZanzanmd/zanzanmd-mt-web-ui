import React from 'react'
import { Form, Modal, Button } from 'antd'
const FormItem = Form.Item
import { judgeWithDrawState } from '../../fetchApi/commonApi'

const withdrawItem = [{label: '交易状态', key: 'cashWithdrawalStatus', render: state => judgeWithDrawState(state)},
{label: '银行卡', key: 'bcBankCardTypeN'},
{label: '流水号', key: 'orderNumber'},
{label: '提现金额', key: 'cashWithdrawal'},
{label: '提现时间', key: 'createTime'}]

const WithdrawModal = props => <Modal
title='提现详情'
onCancel={props.onCancel}
footer={<Button type='primary' onClick={props.onCancel}>确定</Button>}
visible={props.visible}>
	{withdrawItem.map((val, index) => <FormItem
	{...{labelCol: {span: 4}, wrapperCol: {span: 20}}}
	key={index}
	label={val.label}>{val.render ? val.render(props.data[val.key]) : props.data[val.key]}</FormItem>)}
</Modal>

export default WithdrawModal
	