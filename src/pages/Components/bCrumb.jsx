import React from 'react'
import { Breadcrumb } from 'antd'

const BCrumb = ({ routes, params, style }) =>
	<div style={Object.assign({display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10, marginBottom: 20, borderBottom: '1px solid #dddfe0'}, style ? style : {})}>
		<span className="iconfont" style={{color: '#3eba6c', paddingRight: 10}}>{'\ue605'}</span>
		<Breadcrumb routes={routes} params={params} />
	</div>

export default BCrumb