import React from 'react'
import { Layout } from 'antd'
const { Content } = Layout

import HomeHeader from './homeComponents/header.jsx'
import SideBar from './homeComponents/sideBar.jsx'

const Home = props => 
	<Layout className="wrapper">
		<HomeHeader></HomeHeader>
		<Layout className = 'contentWrap ant-layout-has-sider'>
			<SideBar></SideBar>
			<Content style = {{paddingLeft: 36}}>{props.children}</Content>
		</Layout>
	</Layout>

export default Home