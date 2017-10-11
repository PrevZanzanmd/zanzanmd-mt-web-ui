import React from 'react'
import { connect } from 'react-redux'
import { Button, Row } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'
import { C_GET_PAYSRCRET } from '../../redux/Actions'

@connect(s => ({
	qrcode: s.fetchdata.qrcodeUrl
}), d => ({
	getQrcode(){d({type: C_GET_PAYSRCRET})}
}))
class CAQrcode extends React.Component{
	componentWillMount(){
		this.props.getQrcode()
	}

	render = _ => <div>
		<BCrumb routes={this.props.routes} params={this.props.params} style={{margin: 0}}></BCrumb>
		<Row style={{background: '#fff', padding: '100px', marginTop: 20}}>
			<img 
			style={{width: 300, height: 300, margin: '0 auto', display: 'block', background: '#ccc'}} 
			{...Object.assign({}, this.props.qrcode ? {src: this.props.qrcode} : {})}/>
		</Row>
	</div>
}

export default CAQrcode