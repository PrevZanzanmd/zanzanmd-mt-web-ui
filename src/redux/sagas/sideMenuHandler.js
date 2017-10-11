import { put, call } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
import { SAVE_USERCHARACTER, SIDEMENU_COMPLETE, GET_SIDEMENU } from '../Actions'
import { getInitialUserInfo } from '../../fetchApi'
import { hashHistory } from 'react-router'

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
        path: '/home/chart'
    },{
        icon:'\ue6a8',
		title: '店铺管理',
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
		submenu: [
			{
				title: '基本信息',
				path: '/home/baseMessage'
			},{
				title: '安全设置',
				path: '/home/secureSetting'
			},{
				title: '消息提醒',
				path: '/home/messageSetting'
			},{
				title: '卡包',
				path: '/home/card'
			}
		]
	}
]

const ShopMenu = [
	{	icon:'\ue600',
		title: '首页',
		path: '/home/sAccountHome'
	},{
        icon:'\ue626',
        title: '账单',
        path: '/home/sAbill'
    },{
        icon:'\ue615',
        title: '报表',
        path: '/home/sAchart'
    },{
        icon:'\ue6a8',
        title: '卡包',
        path: '/home/sAcard'
    },{
        icon:'\ue626',
        title: '消息提醒',
        path: '/home/messageSetting'
    },{
        icon:'\ue610',
        title: '收银员管理',
        path: '/home/sAcashManager'
    }
]

const countMenu = [
	{
        icon:'\ue626',
        title: '账单',
        path: '/home/sAbill'
    },{
        icon:'\ue6a8',
        title: '店铺',
        path: '/home/cAshop'
    },{
        icon:'\ue615',
        title: '卡包',
        path: '/home/sAcard'
    },{
        icon:'\ue610',
        title: '消息提醒',
        path: '/home/messageSetting'
    },{
        icon:'\ue610',
        title: '我的二维码',
        path: '/home/cAqrcode'
    }
]

export function* getSideMenu(){
	if(localStorage.getItem('token')){
		let data = yield call(getInitialUserInfo)
		yield put({type: SAVE_USERCHARACTER, data: data.data || {} })
		let type = data.data.accountType
		data.code == '200' ? yield put({type: SIDEMENU_COMPLETE, data: type == '3' ? countMenu : type == '2' ? ShopMenu : sideMenu }) : throwError(data)
	}
	yield takeLatest(GET_SIDEMENU, function* (action){
		let menu = action.data == '3' ? countMenu : action.data == '2' ? ShopMenu : sideMenu
		yield put({
			type: SIDEMENU_COMPLETE,
			data: menu
		})
		hashHistory.push(menu[0].path)
	})
}