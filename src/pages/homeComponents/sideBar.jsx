import React from 'react'
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { Link } from 'react-router'
import {connect} from 'react-redux'

@connect(state => ({
    sideMenuData: state.globaldata.sideMenu
}), dispath => ({}))
class Sidebar extends React.Component{
    componentWillMount(){
        this.setState({selectedKeys: location.hash})
    }
    componentWillReceiveProps(n){
        console.log(n)
        this.setState({selectedKeys: n.path})
    }

    state={selectedKeys: '', openKeys: []}

    render = _ => <Sider width={210}>
        <Menu
        selectedKeys={[this.state.selectedKeys]}
        // openKeys={this.state.openKeys}
        mode='inline'>
            {this.props.sideMenuData.map((val,index) => 
                val.submenu ? 
                <SubMenu key = {`${index}submenu`} 
                title={<span>
                    <span className="iconfont">{val.icon}</span>
                    <span className = 'nav-text'>{val.title}</span>
                </span>}>
                    {val.submenu.map((item, key) => 
                            <Menu.Item key = {`#${item.path}`}>
                                <Link to = {`${item.path}?`}>
                                    <span>{item.title}</span>
                                </Link>                    
                            </Menu.Item>
                        )}
                </SubMenu>
                : <Menu.Item key = {`#${val.path}`}>
                    <Link to = {val.path}>
                        <span className="iconfont">{val.icon}</span>
                        <span className = 'nav-text'>{val.title}</span>
                    </Link>                    
                </Menu.Item>
            )}
        </Menu>
    </Sider>
}

export default Sidebar