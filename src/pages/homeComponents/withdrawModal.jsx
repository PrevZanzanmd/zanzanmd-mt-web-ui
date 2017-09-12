import React from 'react'
import { Form, Modal, Button } from 'antd'
const FormItem = Form.Item


const WithdrawModal = props => <Modal
title='提现详情'
onCancel={props.onCancel}
footer={<Button type='primary' onClick={props.onCancel}>确定</Button>}
visible={props.visible}>
	<Form></Form>
</Modal>

export default WithdrawModal
	