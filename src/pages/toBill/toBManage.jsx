import React from 'react'
import { Row, Select, Button, DatePicker, Col, Table, Pagination } from 'antd'
const Option = Select.Option
import BCrumb from '../Components/bCrumb.jsx'

class ToBManage extends React.Component{
	state={
	}
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params}></BCrumb>
		<Row>123</Row>
	</div>
}

export default ToBManage