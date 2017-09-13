import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Input, Button } from 'antd'
const FormItem = Form.Item
import { Link, hashHistory } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'
import { SET_TIMESTATE, SET_TIMESTR } from '../../redux/Actions'

@connect(state => ({
	loading: state.globaldata.loading,
	timeBtnDisabled: state.globaldata.timeBtnDisabled,
	timeStr: state.globaldata.timeStr
}), dispath => ({
	setTimeStr(data){dispath({type: SET_TIMESTR, data})},
	setTimeState(data){dispath({type: SET_TIMESTATE, data})}
}))
class SecureSetting extends React.Component{
	handleSendClick = _ => {
		let time = 60
		this.props.setTimeState(true)
		let interval = setInterval(async _ => {
			this.props.setTimeStr(time === 0 ? '获取验证码' : `${--time}秒后重新发送`)
			this.props.timeStr === '获取验证码' ? (
				this.props.setTimeState(false),
				clearInterval(interval)
			) : null
		}, 1000)
	}
	handleSubmit = (e) => {
	    e.preventDefault()
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	      		console.log(values)
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
							disabled={this.props.timeBtnDisabled}
							onClick={this.handleSendClick}
							style={{marginLeft: 10, width: 100}}>{this.props.timeStr}</Button>
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