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
        this.setState({defaultOpenKeys: 
            this.props.sideMenuData.map((val, index) => val.submenu ? (_ => {
                val.submenu.map((item, key) => this.handleHashHistory(item, {defaultSelectedKeys: item.title}))
                return `${index}submenu`
            })()
                : (_ => {
                    this.handleHashHistory(val, {defaultSelectedKeys: val.title})
                    return val.title
                })()
            )
        })
    }
    componentWillReceiveProps(nextProps){
        (f => f(f))(f => list => list.map(val => val.submenu ? f(f)(val.submenu) : val.path === nextProps.location ? this.setState({defaultSelectedKeys: val.title}) : null ))(this.props.sideMenuData)
    }
    state={defaultSelectedKeys: '', defaultOpenKeys: []}
    handleHashHistory = (val, state) => location.hash.substring(1, location.hash.length) === val.path ? this.setState(state) : null

    render = _ => <Sider width={210}>
        <Menu
        defaultSelectedKeys={[this.state.defaultSelectedKeys]}
        selectedKeys={[this.state.defaultSelectedKeys]}
        defaultOpenKeys={this.state.defaultOpenKeys}
        mode='inline'>
            {this.props.sideMenuData.map((val,index) => 
                val.submenu ? 
                <SubMenu key = {`${index}submenu`} 
                title={<span>
                    <span className="iconfont">{val.icon}</span>
                    <span className = 'nav-text'>{val.title}</span>
                </span>}>
                    {val.submenu.map((item, key) => 
                            <Menu.Item key = {item.title}>
                                <Link to = {item.path}>
                                    <span>{item.title}</span>
                                </Link>                    
                            </Menu.Item>
                        )}
                </SubMenu>
                : <Menu.Item key = {val.title}>
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