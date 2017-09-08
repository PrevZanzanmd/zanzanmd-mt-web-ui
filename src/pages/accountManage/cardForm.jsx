import React from 'react'
import { Input, Form, Button, DatePicker, Row, Select, InputNumber } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class CardForm extends React.Component{
	constructor(props){super(props)}
	render = _ => {
		const formCol = {labelCol: {span: 8}, wrapperCol: {span: 16}}
		return (
			<Form>
				<FormItem
				label='卡券种类'
				{...formCol}>
					<Select 
					placeholder='请选择' 
					style={{width: 120}}>
						{['优惠券', '红包'].map(val => <Option value={val} key={val}>{val}</Option>)}
					</Select>
				</FormItem>
				{['数量', '金额', '总金额', '最低消费金额'].map((val, index) => 
					<FormItem
					label={val}
					key={index}
					{...formCol}>
						<InputNumber style={{width: 120}}/>
					</FormItem>
				)}
				<FormItem
				label='有效日期'
				{...formCol}>
					<RangePicker />
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

export default CardForm