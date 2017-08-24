import React from 'react'

import HomeHeader from './homeComponents/header.jsx'
import SideBar from './homeComponents/sideBar.jsx'

const Home = props => 
	<div>
		<HomeHeader></HomeHeader>
		<div className = 'contentWrap'>
			<SideBar></SideBar>
			<div className = 'contentContainer'>{props.children}</div>
		</div>
	</div>

export default Home