import { put } from 'redux-saga/effects'
import { SIDEMENU_COMPLETE } from '../Actions'

const sideMenu = [
	{	icon:'\ue600',
		title: '首页',
		path: '/home/ContentContainer'
	},{
        icon:'\ue626',
        title: '账单',
        path: '/home/bill'
    },{
        icon:'\ue615',
        title: '报表',
        path: '/'
    },{
        icon:'\ue606',
        title: '对账',
        path: '/'
    },{
        icon:'\ue6a8',
		title: '店铺管理',
		path: '/',
		submenu: [
			{
				title: '我的店铺',
				path: '/home/myShop'
			},{
				title: '店铺权限',
				path: '/home/shopPermission'
			},{
				title: '店铺账号',
				path: '/home/shopAccount'
			}
		]
	},{
        icon:'\ue610',
		title: '账号管理',
		path: '/',
		submenu: [
			{
				title: '基本信息',
				path: '/home/baseMessage'
			},{
				title: '安全设置',
				path: '/home/secureSetting'
			},{
				title: '消息提醒',
				path: '/'
			},{
				title: '卡包',
				path: '/'
			}
		]
	}
]

export function* getSideMenu(){
	yield put({
		type: SIDEMENU_COMPLETE,
		data: sideMenu
	})
}