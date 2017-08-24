import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'

import store from './redux/store'

import './assets/style/main.less'

import Page from './page.jsx'
import Home from './pages/home.jsx'

const routeConfig = (
	<Route path = {'/'} component = {Page}>
		<IndexRedirect to="/home" />
		<Route path = {'/home'} component = {Home}>

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