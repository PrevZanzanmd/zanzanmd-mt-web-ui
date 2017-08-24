import React from 'react'
import { connect } from 'react-redux'

@connect(state => ({
	sideMenuData: state.globaldata.sideMenu
}), dispath => ({}))
class Sidebar extends React.Component{
	render = _ => <div className = 'sideBarWrapper'></div>
}

export default Sidebar