import React from 'react'
import { Form, Button, Row, Input } from 'antd'
const FormItem = Form.Item
import BCrumb from '../Components/bCrumb.jsx'

class ResetPass extends React.Component{
	render = _ => {
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<div>
		        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
				<Row style={{background: '#fff', paddingTop: 20}}>
					<Form>
						<FormItem
						label='当前登录密码'
						{...formCol}>
							<Input style={{width: 200}}/>
						</FormItem>
						<FormItem
						label='新登录密码'
						{...formCol}>
							<Input style={{width: 200}}/>
						</FormItem>
						<FormItem
						label='确认新登录密码'
						{...formCol}>
							<Input style={{width: 200}}/>
						</FormItem>
						<FormItem
						label=' '
						colon={false}
						{...formCol}>
							<Row>
								<Button type="primary" style={{marginRight: 20}} htmlType="submit">保存</Button>
							</Row>
						</FormItem>
					</Form>
				</Row>
			</div>
		)
	}
}

export default ResetPass