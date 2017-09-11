import React from 'react'
import { Row, Switch } from 'antd'
import BCrumb from '../Components/bCrumb.jsx'

class MessageSetting extends React.Component{
	render = _ => <div>
        <BCrumb routes={this.props.routes} params={this.props.params} />
		<Row style={{background: '#fff'}}>
			<ul style={{padding: '0 5px 15px'}}>
				<li className='messageItem'>
					<span>收款信息通知</span>
					<span>发生退款，付款成功／失败时，用于信息提示</span>
					<Switch></Switch>
				</li>
				<li className='messageItem'>
					<span>收款语音通知</span>
					<span>发生退款，付款成功／失败时，用于语音播报提示</span>
					<Switch></Switch>
				</li>
			</ul>
		</Row>
	</div>
}

export default MessageSetting