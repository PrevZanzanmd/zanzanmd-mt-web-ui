import React from 'react'
import {connect} from 'react-redux'
import { Layout } from 'antd';
const { Header } = Layout;
import { LOGOUT } from '../../redux/Actions'

@connect(state => ({}), dispath => ({
	logout(){dispath({type: LOGOUT})}
}))
class HomeHeader extends React.Component{
	constructor(props){
		super(props)
	}

	render = _ => <Header className = 'homeHeader'>
		<div className = 'headerContent'>
			<div className="headerLogo">
				<img style={{width:40+'px',height:40+'px'}}/>
				<div className="logoName">
					<p className="logoNameCont">赞赞买单商家版</p>
					<p>mt.zanzanmd.cn</p>
				</div>
			</div>
			<div className="headerName">
				<img className="userNameImg" style={{width:40+'px',height:40+'px',borderRadius:20+'px',backgroundColor:'#aaa'}}/>
				<div className="userName">
					<div className="userNameCont">
						<p>欢迎，张三儿</p>
						<p className="signOut" onClick={this.props.logout}>退出</p>
					</div>
					<p>上次登录时间：2017.07.26 11:30</p>
				</div>
			</div>
		</div>
	</Header>
}

export default HomeHeader