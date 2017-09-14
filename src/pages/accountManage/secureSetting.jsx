import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Input, Button } from 'antd'
const FormItem = Form.Item
import { Link, hashHistory } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { SEND_MODIFY, TIME, CHANGE_PHONE } from '../../redux/Actions'

@connect(state => ({
	loading: state.globaldata.loading,
	time: state.globaldata.time
}), dispath => ({
	sendModify(){dispath({type: SEND_MODIFY})},
	handleTime(state){dispath({type: TIME, data: state})},
	changePhone(param = {}){dispath({type: CHANGE_PHONE, param})}
}))
class SecureSetting extends React.Component{
	componentWillReceiveProps = nextProps => !this.props.time && nextProps.time ? this.handleSendClick() : null
	state = {timeStr: '获取验证码', timeBtnDisabled: false}
	handleSendClick = async _ => {
		let time = 60
		await this.handleSetState({timeBtnDisabled: true})
		let interval = setInterval(async _ => {
			await this.handleSetState({timeStr: time === 0 ? '获取验证码' : `${--time}秒后重新发送`})
			this.state.timeStr === '获取验证码' ? (
				await this.handleSetState({timeBtnDisabled: false}),
				this.props.handleTime(false),
				clearInterval(interval)
			) : null
		}, 1000)
	}
	handleSetState = state => new Promise((rsl, rej) => this.setState(state, _ => rsl()))
	handleSubmit = (e) => {
	    e.preventDefault()
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	      		console.log(values)
	      		this.props.changePhone(values)
	      	}
	    })
	}
	render = _ => {
		const { getFieldDecorator } = this.props.form
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<div>
		        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
				<Row style={{background: '#fff', paddingTop: 20}}>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
						label='新手机号'
						{...formCol}>
							{getFieldDecorator('phone', {rules: [{required: true, message: '请填写新手机号'}]})(
								<Input style={{width: 200}}/>
							)}
						</FormItem>
						<FormItem
						label='手机验证码'
						{...formCol}>
							{getFieldDecorator('code', {rules: [{required: true, message: '请填写验证码'}]})(
								<Input style={{width: 100}}/>
							)}
							<Button 
							size='small' 
							disabled={this.state.timeBtnDisabled}
							onClick={this.props.sendModify}
							style={{marginLeft: 10, width: 100}}>{this.state.timeStr}</Button>
						</FormItem>
						<FormItem
						label=' '
						colon={false}
						{...formCol}>
							<Row>
								<Button 
								loading={this.props.loading}
								type="primary" 
								style={{marginRight: 20}} 
								htmlType="submit">保存</Button>
								<Button htmlType="submit" onClick={_ => hashHistory.push('/home/resetPass')}>重置登录密码</Button>
							</Row>
						</FormItem>
					</Form>
				</Row>
			</div>
		)
	}
}
SecureSetting = Form.create({})(SecureSetting)
export default SecureSetting