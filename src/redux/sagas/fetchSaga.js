import { takeLatest } from 'redux-saga'
import { put, fork, call } from 'redux-saga/effects'
import { message } from 'antd'
import * as ACTION from '../Actions'
import * as fetchApi from '../../fetchApi'

function* baseFetchSaga(action, api, thisAction){
	yield put({type: ACTION.START_LOADING})
	let data = yield call(api, thisAction.param)
	data.code === '200' ? yield put({type: action, data: data.data}) : console.warn(new Error(data.msg))
	yield put({type: ACTION.CLOSE_LOADING})
}


function* getShopList(){
	yield takeLatest(ACTION.GET_SHOP_LIST, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList, action.param)
		data.code === '200' || data.code === '60012' ? yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.code === '200' ? data.data : []}) : console.warn(new Error(data.msg))
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* getShopDetail(){
	yield takeLatest(ACTION.GET_SHOP_DETAIL, function* (action){
		let data = yield call(fetchApi.getShopDetail, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_DETAIL_SUCCESS, data: data.data}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : console.warn(new Error(data.msg))
	})
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* getQrcode(){
	yield takeLatest(ACTION.GET_PAYSRCRET, function* (action){
		let data = yield call(fetchApi.getPaySecret, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_PAYSRCRET_SUCCESS, data: `http://zanzanmd.sssvip4.natapp.cc/api-mt//common/gen/qrcode/v1/gennerateQcode?paySecret=${data.data.paySecret}`}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : console.warn(new Error(data.msg))
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* deleteShop(){
	yield takeLatest(ACTION.DELETE_SHOP, function* (action){
		let data = yield call(fetchApi.deleteShop, action.param)
		data.code === '200' ? (
			message.success('删除成功'),
			yield put({type: ACTION.GET_SHOP_LIST, param: {}})
		) : (message.error('删除失败'), console.warn(new Error(data.msg)))
	})
}

export default function* (){
	yield fork(getShopList)
	yield fork(getShopDetail)
	yield fork(getQrcode)
	yield fork(deleteShop)
}