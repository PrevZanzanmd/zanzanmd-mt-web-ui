import { put } from 'redux-saga/effects'
import { SIDEMENU_COMPLETE } from '../Actions'

const sideMenu = [
	{
		title: '主页',
		path: '/'
	},{
		title: '账单',
		path: '/'
	},{
		title: '报表',
		path: '/'
	},{
		title: '对账',
		path: '/'
	},{
		title: '店铺管理',
		path: '/',
		submenu: [
			{
				title: '我的店铺',
				path: '/'
			},{
				title: '店铺权限',
				path: '/'
			},{
				title: '店铺账号',
				path: '/'
			}
		]
	},{
		title: '账单管理',
		path: '/',
		submenu: [
			{
				title: '基本信息',
				path: '/'
			},{
				title: '安全设置',
				path: '/'
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