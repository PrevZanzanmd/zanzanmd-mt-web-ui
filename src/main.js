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
import ShopPermission from './pages/shop/shopPermission.jsx'
import ShopAccount from './pages/shop/shopAccount.jsx'
import MyShop from './pages/shop/myShop.jsx'

const routeConfig = (
	<Route path = {'/'} breadcrumbName='赞赞买单' component = {Page}>
		<IndexRedirect to="/home"/>
		<Route path = {'home'} breadcrumbName='首页' component = {Home}>
			<IndexRedirect to="/home/ContentContainer"/>
			<Route path = {'contentContainer'} breadcrumbName='动态' component = {ContentContainer}/>
			<Route path = {'withdrawRecord'} breadcrumbName='账单' component = {withdrawRecord}/>
			<Route path = {'shopPermission'} breadcrumbName='店铺权限' component = {ShopPermission}/>
			<Route path = {'shopAccount'} breadcrumbName='店铺账号' component = {ShopAccount}/>
			<Route path = {'myShop'} breadcrumbName='我的店铺' component = {MyShop}/>
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