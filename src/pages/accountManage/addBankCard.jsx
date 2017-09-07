import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Row, Input, Modal } from 'antd'
const FormItem = Form.Item

class AddBankCard extends React.Component{
	constructor(props){super(props)}
	render = _ => {
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<Form>
				{['真实姓名', '身份证号', '银行卡号', '手机号'].map((val, index) => 
					<FormItem
					label={val}
					key={index}
					{...formCol}>
						<Input style={{width: 200}}/>
					</FormItem>
				)}
				<FormItem
					label='手机验证码'
					{...formCol}>
						<Input style={{width: 100}} size='small'/><Button size='small' style={{marginLeft: 10}}>获取验证码</Button>
					</FormItem>
				<FormItem
				label=' '
				colon={false}
				{...formCol}>
					<Row>
						<Button type="primary" style={{marginRight: 20}} htmlType="submit">保存</Button>
						<Button onClick={this.props.onCancel}>取消</Button>
					</Row>
				</FormItem>
			</Form>
		)
	}
}

export default AddBankCard