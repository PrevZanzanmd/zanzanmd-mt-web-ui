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
        this.setState(!n.path.split('?')[1] ? {selectedKeys: n.path} : {selectedKeys: n.path.split('?')[0], openKeys: [`${n.path.split('?')[1]}submenu`]})
    }

    state={selectedKeys: '', openKeys: []}

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
        this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    }

    render = _ => <Sider width={210}>
        <Menu
        selectedKeys={[this.state.selectedKeys]}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
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
                                <Link to = {`${item.path}?${index}`}>
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