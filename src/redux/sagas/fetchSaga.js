import { takeLatest } from 'redux-saga'
import { put, fork, call } from 'redux-saga/effects'
import { message } from 'antd'
import * as ACTION from '../Actions'
import * as fetchApi from '../../fetchApi'

const throwError = error => console.warn(new Error(error))

function* baseFetchSaga(action, api, thisAction){
	yield put({type: ACTION.START_LOADING})
	let data = yield call(api, thisAction.param)
	data.code === '200' ? yield put({type: action, data: data.data}) : throwError(data.msg)
	yield put({type: ACTION.CLOSE_LOADING})
}


function* getShopList(){
	yield takeLatest(ACTION.GET_SHOP_LIST, function* (action){
		action.spin ? null : yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList, action.param)
		data.code === '200' || data.code === '60012' ? yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.code === '200' ? data.data : []}) : throwError(data.msg)
		action.spin ? null : yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* getShopDetail(){
	yield takeLatest(ACTION.GET_SHOP_DETAIL, function* (action){
		let data = yield call(fetchApi.getShopDetail, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_DETAIL_SUCCESS, data: data.data}),
			action.edit ? yield put({type: ACTION.GET_INDUSTRY, param: {}, edit: true}) : null,
			action.edit ? null : yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data.msg)
	})
}

function* getShopPermission(){
	yield takeLatest(ACTION.GET_SHOPPERM, baseFetchSaga, ACTION.GET_SHOPPERM_SUCCESS, fetchApi.checckShopPermission)
}

function* getIndustrydata(){
	yield takeLatest(ACTION.GET_INDUSTRY, function* (action){
		yield put({type: ACTION.SELECT_LOAD, data: true})
		let data = yield call(fetchApi.getIndustrylist, action.param)
		data.code === '200' ? yield put({type: ACTION.GET_INDUSTRY_SUCCESS, data: data.data}) : throwError(data.msg)
		yield put({type: ACTION.SELECT_LOAD, data: false})
		action.edit ? yield put({type: ACTION.MODAL_STATE, data: true}) : null
	})
}
function* getAreadata(){
	yield takeLatest(ACTION.GET_AREA, function* (action){
		let data = yield call(fetchApi.getAreadata)
		data.code === '200' ? yield put({type: ACTION.GET_AREA_SUCCESS, data: data.data}) : throwError(data.msg)
	})
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* changeShopPrem(){
	yield takeLatest(ACTION.CHANGE_SHOPPERM, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.changeShopperm, action.param)
		data.code === '200' ? (
			message.success('修改成功'),
			yield put({type: ACTION.GET_SHOPPERM, param: {userId: action.param.userId}})
		) : (message.error('修改失败'), throwError(data.msg))
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* getQrcode(){
	yield takeLatest(ACTION.GET_PAYSRCRET, function* (action){
		let data = yield call(fetchApi.getPaySecret, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_PAYSRCRET_SUCCESS, data: `http://zanzanmd.sssvip4.natapp.cc/api-mt//common/gen/qrcode/v1/gennerateQcode?paySecret=${data.data.paySecret}`}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data.msg)
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* deleteShop(){
	yield takeLatest(ACTION.DELETE_SHOP, function* (action){
		let data = yield call(fetchApi.deleteShop, action.param)
		data.code === '200' ? (
			message.success('删除成功'),
			yield put({type: ACTION.GET_SHOP_LIST, param: {}})
		) : (message.error('删除失败'), throwError(data.msg))
	})
}

export default function* (){
	yield fork(getShopList)
	yield fork(getShopDetail)
	yield fork(getQrcode)
	yield fork(deleteShop)
	yield fork(getShopPermission)
	yield fork(changeShopPrem)
	yield fork(getIndustrydata)
	yield fork(getAreadata)
}