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
			yield call(downloadDetail, data.data),
			yield put({type: ACTION.GET_TODAYTOTAL, param: {spShopId: data.data.id || ''}})
		) : throwError(data)
	})
}

function* downloadDetail(param){
	let data = yield call(fetchApi.download, {key: param.headPortrait})
	data.code == '200' ? yield put({type: ACTION.GET_SHOP_DETAIL_SUCCESS, data: Object.assign(param, {headPortrait: data.data})})
	: yield put({type: ACTION.GET_SHOP_DETAIL_SUCCESS, data: param})
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

function* getQrcode(){
	yield takeLatest(ACTION.C_GET_PAYSRCRET, function* (action){
		let data = yield call(fetchApi.getPaySecret, {})
		data.code === '200' ? (
			yield put({type: ACTION.GET_PAYSRCRET_SUCCESS, data: `${fetchApi.baseUrl}/api-mt/common/gen/qrcode/v1/gennerateQcode?paySecret=${data.data.paySecret}`})
		) : throwError(data)
	})
}

//cashier

function* getCashierlist(){
	yield takeLatest(ACTION.GET_CASHIERLIST, function* (p){
		yield put({type: ACTION.START_LOADING})
		yield put({type: ACTION.S_GET_SHOPDETAIL})
		let data = yield call(fetchApi.getCashierList)
		data.code == '200' ? yield put({type: ACTION.GET_CASHIERLIST_COMPLETE, data: data.data}) : throwError(data)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* deleteCashier(){
	yield takeLatest(ACTION.DELETECASHIER, function* (action){
		let data = yield call(fetchApi.deleteCashier, action.param)
		data.code == '200' ? (
			message.success('删除成功'),
			yield put({type: ACTION.GET_CASHIERLIST})
		) : (message.error('删除失败'), throwError(data))
	})
}

function* getCashierDetail(){
	yield takeLatest(ACTION.GET_CASHIERDETAIL, function* (action){
		let data = yield call(fetchApi.cashierDetail, action.param)
		data.code == '200' ? (
			yield put({type: ACTION.GET_CASHIERDETAIL_COMPLETE, data: data.data}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}

function* editCashier(cb, action){
	let data = yield call(cb, action.param)
	data.code == '200' ? (
		message.success('操作成功'),
		yield put({type: ACTION.MODAL_STATE, data: false}),
		yield put({type: ACTION.GET_CASHIERLIST})
	) : (message.error('操作失败'), throwError(data))
}

function* addCashier(){
	yield takeLatest(ACTION.ADD_CASHIER, editCashier, fetchApi.addCashier)
}

function* updateCashier(){
	yield takeLatest(ACTION.EDIT_CASHIER, editCashier, fetchApi.updateCashier)
}

export default function* (){
	yield fork(SAshopdetail)
	yield fork(getPrimaryBill)
	yield fork(getPrimaryChart)
	yield fork(getPrimaryCard)
	yield fork(getQrcode)
	yield fork(getCashierlist)
	yield fork(deleteCashier)
	yield fork(getCashierDetail)
	yield fork(addCashier)
	yield fork(updateCashier)
}