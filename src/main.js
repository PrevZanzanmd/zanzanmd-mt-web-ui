import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'

import store from './redux/store'

import './assets/style/main.less'

import Page from './page.jsx'
import Home from './pages/home.jsx'
import ContentContainer from './pages/homeComponents/contentContainer.jsx'
import withdrawRecord from './pages/homeComponents/withdrawRecord.jsx'
import withdraw from './pages/homeComponents/withdraw.jsx'
import Bill from './pages/bills/bill.jsx'
const routeConfig = (
	<Route path = {'/'} breadcrumbName='赞赞买单' component = {Page}>
		<IndexRedirect to="/home"/>
		<Route path = {'home'} breadcrumbName='首页' component = {Home}>
			<IndexRedirect to="/home/contentContainer"/>
			<Route path = {'contentContainer'} breadcrumbName='动态' component = {ContentContainer}/>
			<Route path = {'withdrawRecord'} breadcrumbName='账单' component = {withdrawRecord}/>
			<Route path = {'withdraw'} breadcrumbName='提现' component = {withdraw}/>
			<Route path = {'bill'} breadcrumbName='账单' component = {Bill}/>
		</Route>
	</Route>
)

ReactDom.render(
	<Provider store = { store }>
		<Router history = {hashHistory}>
			{routeConfig}
		</Router>
	</Provider>,
	document.getElementById('root')
)