import React from 'react'
import { Breadcrumb } from 'antd'

const BCrumb = ({ routes, params }) =>
	<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid #dddfe0'}}>
		<span className="iconfont" style={{color: '#3eba6c', paddingRight: 10}}>{'\ue605'}</span>
		<Breadcrumb routes={routes} params={params} />
	</div>

export default BCrumb