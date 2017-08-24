import React from 'react'
import connect from 'react-redux'

class HomeHeader extends React.Component{
	constructor(props){
		super(props)
	}

	render = _ => <div className = 'homeHeader'>
		<div className = 'headerContent'></div>
	</div>
}

export default HomeHeader