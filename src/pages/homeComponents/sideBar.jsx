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
        this.props.sideMenuData.map((val, index) => val.submenu ? val.submenu.map((item, key) => this.handleHashHistory(item, {defaultSelectedKeys: `${index}sub${key}`, defaultOpenKeys: `${index}submenu`}))
            : this.handleHashHistory(val, {defaultSelectedKeys: `item${index}`})
        )
    }
    state={defaultSelectedKeys: '', defaultOpenKeys: ''}
    handleHashHistory = (val, state) => location.hash.substring(1, location.hash.length) === val.path ? this.setState(state) : null

    render = _ => <Sider width={210}>
        <Menu
        defaultSelectedKeys={[this.state.defaultSelectedKeys]}
        defaultOpenKeys={[this.state.defaultOpenKeys]}
        mode='inline'>
            {this.props.sideMenuData.map((val,index) => 
                    val.submenu ? 
                    <SubMenu key = {`${index}submenu`} 
                    title={<span>
                        <span className="iconfont">{val.icon}</span>
                        <span className = 'nav-text'>{val.title}</span>
                    </span>}>
                        {val.submenu.map((item, key) => 
                                <Menu.Item key = {`${index}sub${key}`}>
                                    <Link to = {item.path}>
                                        <span>{item.title}</span>
                                    </Link>                    
                                </Menu.Item>
                            )}
                    </SubMenu>
                    : <Menu.Item key = {`item${index}`}>
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