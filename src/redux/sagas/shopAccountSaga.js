import { takeLatest, takeEvery } from 'redux-saga'
import { put, fork, call } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { message } from 'antd'
import * as ACTION from '../Actions'
import * as fetchApi from '../../fetchApi'
import { handleFullDate } from '../../fetchApi/commonApi'

const throwError = data => {
	data.code === '40003' || data.code === '40001' ? (message.error('登录失效，请重新登录'), hashHistory.push('/login')) : null
	// console.warn(new Error(data.msg))
}

function* getShopInfo(cb){
	let data = yield call(fetchApi.getInitialUserInfo)
	data.code == '200' ? (
		yield put({type: ACTION.SAVE_USERCHARACTER, data: data.data || {} }),
		yield call(cb, data)
	) : throwError(data)
}

function* SAshopdetail(){
	yield takeLatest(ACTION.S_GET_SHOPDETAIL, getShopInfo, function* (p){
		let data = yield call(fetchApi.getShopDetail, p.data.id || '')
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_DETAIL_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_TODAYTOTAL, param: {spShopId: data.data.id || ''}})
		) : throwError(data)
	})
}

function* getPrimaryBill(){
	yield takeLatest(ACTION.S_BILL_PRIMARY_LOAD, function* (action){
		yield put({type: ACTION.START_LOADING})
		yield put({type: ACTION.GET_BILLLIST, param: {}}),
		yield put({type: ACTION.GET_TODAYTOTAL, param: {}})
	})
}

function* getPrimaryChart(){
	yield takeLatest(ACTION.S_CHART_PRIMARY_LOAD, function* (action){
		yield put({type: ACTION.GET_ALLTOTAL, param: {}}),
		yield put({type: ACTION.GET_DAYTOTAL, param: {dayTime: handleFullDate()}}),
		yield put({type: ACTION.GET_CHARTDATA, param: {}})
	})

}

function* getPrimaryCard(){
	yield takeLatest(ACTION.S_CARD_PRIMARY_LOAD, function* (action){
		yield put({type: ACTION.GET_CARDLIST, param: Object.assign({}, action.param)})
	})
}

export default function* (){
	yield fork(SAshopdetail)
	yield fork(getPrimaryBill)
	yield fork(getPrimaryChart)
	yield fork(getPrimaryCard)
}