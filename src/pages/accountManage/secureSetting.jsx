import React from 'react'
import { Form, Row, Input, Button } from 'antd'
const FormItem = Form.Item
import { Link, hashHistory } from 'react-router'
import BCrumb from '../Components/bCrumb.jsx'

class SecureSetting extends React.Component{
	render = _ => {
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<div>
		        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
				<Row style={{background: '#fff', paddingTop: 20}}>
					<Form>
						<FormItem
						label='上次登陆时间'
						{...formCol}>2017.07.26</FormItem>
						<FormItem
						label='手机号'
						{...formCol}>
							<Input style={{width: 200}}/>
						</FormItem>
						<FormItem
						label=' '
						colon={false}
						{...formCol}>
							<Row>
								<Button type="primary" style={{marginRight: 20}} htmlType="submit">保存</Button>
								<Button htmlType="submit" onClick={_ => hashHistory.push('/home/resetPass')}>重置登录密码</Button>
							</Row>
						</FormItem>
					</Form>
				</Row>
			</div>
		)
	}
}

export default SecureSetting