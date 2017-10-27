import React from 'react'
import { Layout } from 'antd'
const { Content } = Layout

import HomeHeader from './homeComponents/header.jsx'
import SideBar from './homeComponents/sideBar.jsx'

class Home extends React.Component{
	render = _ => 
		<Layout className="wrapper">
			<HomeHeader></HomeHeader>
			<Layout className = 'contentWrap ant-layout-has-sider'>
				<SideBar path={location.hash}></SideBar>
				<Content style = {{paddingLeft: 36}}>{this.props.children}</Content>
			</Layout>
		</Layout>
}
	

export default Home