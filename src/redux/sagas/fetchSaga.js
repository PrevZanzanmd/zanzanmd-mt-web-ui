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

function* baseFetchSaga(action, api, thisAction){
	yield put({type: ACTION.START_LOADING})
	let data = yield call(api, thisAction.param)
	data.code === '200' ? yield put({type: action, data: data.data}) : throwError(data)
	yield put({type: ACTION.CLOSE_LOADING})
}
function* simpleFetchSaga(action, api, thisAction){
	let data = yield call(api, thisAction.param ? thisAction.param : {})
	data.code === '200' ? yield put({type: action, data: data.data}) : throwError(data)
}


function* getShopList(){
	yield takeLatest(ACTION.GET_SHOP_LIST, function* (action){
		action.spin ? null : yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList, action.param)
		data.code === '200' || data.code === '60012' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.code === '200' ? data.data : []}),
			yield call(handleFor, data.data)
		) : throwError(data)
		action.spin ? null : yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* getShopDetail(){
	yield takeLatest(ACTION.GET_SHOP_DETAIL, function* (action){
		yield put({type: ACTION.GET_UPLOADTOKEN, param: {type: 3}})
		let data = yield call(fetchApi.getShopDetail, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_DETAIL_SUCCESS, data: data.data}),
			action.edit ? yield put({type: ACTION.GET_INDUSTRY, param: {}, edit: true}) : null,
			action.edit ? null : yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}

function* getSpAccountDetail(){
	yield takeLatest(ACTION.GET_ACCOUNT_DETAIL, function* (action){
		let data = yield call(fetchApi.getShopAccountDetail, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_ACCOUNT_DETAIL_SUCCESS, data: data.data}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}

function* getShopPermission(){
	yield takeLatest(ACTION.GET_SHOPPERM, baseFetchSaga, ACTION.GET_SHOPPERM_SUCCESS, fetchApi.checckShopPermission)
}

function* getIndustrydata(){
	yield takeLatest(ACTION.GET_INDUSTRY, function* (action){
		yield put({type: ACTION.SELECT_LOAD, data: true})
		let data = yield call(fetchApi.getIndustrylist, action.param)
		data.code === '200' ? yield put({type: ACTION.GET_INDUSTRY_SUCCESS, data: data.data}) : throwError(data)
		yield put({type: ACTION.SELECT_LOAD, data: false})
		action.edit ? yield put({type: ACTION.MODAL_STATE, data: true}) : null
	})
}


function* getAreadata(){
	yield takeLatest(ACTION.GET_AREA, simpleFetchSaga, ACTION.GET_AREA_SUCCESS, fetchApi.getAreadata)
}

function* getTodayTotal(){
	yield takeLatest(ACTION.GET_TODAYTOTAL, simpleFetchSaga, ACTION.GET_TODAYTOTAL_SUCCESS, fetchApi.getTodayTotal)
}

function* getBilllist(){
	yield takeLatest(ACTION.GET_BILLLIST, function* (action){
		let data = yield call(fetchApi.getBilllist, action.param)
		data.code === '200' ? yield put({type: ACTION.GET_BILLLIST_SUCCESS, data: data.data}) : throwError(data)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* getPrimaryBill(){
	yield takeLatest(ACTION.BILL_PRIMARY_LOAD, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_BILLLIST, param: {spShopId: data.data[0] ? data.data[0].id : ''}}),
			yield put({type: ACTION.GET_TODAYTOTAL, param: {spShopId: data.data[0] ? data.data[0].id : ''}})
		) : (
			yield put({type: ACTION.CLOSE_LOADING}),
			throwError(data)
		)
	})
}

function* filterBill(){
	yield takeLatest(ACTION.FILTER_BILL, function* (action){
		yield put({type: ACTION.START_LOADING})
		yield put({type: ACTION.GET_TODAYTOTAL, param: {spShopId: action.param.spShopId}})
		yield put({type: ACTION.GET_BILLLIST, param: action.param})
	})
}

function* getBillDetail(){
	yield takeLatest(ACTION.GET_BILLDETAIL, function* (action){
		let data = yield call(fetchApi.getBillDetail, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_BILLDETAIL_SUCCESS, data: data.data}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}


function* getAllTotal(){
	yield takeLatest(ACTION.GET_ALLTOTAL, simpleFetchSaga, ACTION.GET_ALLTOTAL_SUCCESS, fetchApi.getTotal)
}

function* getDayTotal(){
	yield takeLatest(ACTION.GET_DAYTOTAL, simpleFetchSaga, ACTION.GET_DAYTOTAL_SUCCESS, fetchApi.getDateTotal)
}

function* getChartdata(){
	yield takeLatest(ACTION.GET_CHARTDATA, function* (action){
		let data = yield call(fetchApi.getChartdata, action.param)
		data.code === '200' ? yield put({type: ACTION.GET_CHARTDATA_SUCCESS, data: data.data}) : throwError(data)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}


function* getPrimaryChart(){
	yield takeLatest(ACTION.CHART_PRIMARY_LOAD, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_ALLTOTAL, param: {spShopId: data.data[0] ? data.data[0].id : ''}}),
			yield put({type: ACTION.GET_DAYTOTAL, param: {spShopId: data.data[0] ? data.data[0].id : '', dayTime: handleFullDate()}}),
			yield put({type: ACTION.GET_CHARTDATA, param: {spShopId: data.data[0] ? data.data[0].id : ''}})
		) : (
			yield put({type: ACTION.CLOSE_LOADING}),
			throwError(data)
		)
	})
}

function* filterChart(){
	yield takeLatest(ACTION.FILTER_CHART, function* (action){
		yield put({type: ACTION.GET_ALLTOTAL, param: {spShopId: action.param.spShopId}})
		yield put({type: ACTION.GET_CHARTDATA, param: {spShopId: action.param.spShopId}})
		yield put({type: ACTION.GET_DAYTOTAL, param: {spShopId: action.param.spShopId, dayTime: action.param.dayTime ? action.param.dayTime : handleFullDate()}})
	})
}


function* getPrimaryCard(){
	yield takeLatest(ACTION.CARD_PRIMARY_LOAD, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_CARDLIST, param: Object.assign({spShopId: data.data[0] ? data.data[0].id : ''}, action.param)})
		) : (
			yield put({type: ACTION.CLOSE_LOADING}),
			throwError(data)
		)
	})
}
function* cardBaseSaga(action, api, thisAction){
	yield put({type: ACTION.START_LOADING})
	let data = yield call(api, thisAction.param)
	data.code === '200' || data.code === '60012' ? yield put({type: action, data: data.code === '200' ? data.data : {list: []}}) : throwError(data)
	yield put({type: ACTION.CLOSE_LOADING})
}

function* getCardlist(){
	yield takeLatest(ACTION.GET_CARDLIST, cardBaseSaga, ACTION.GET_CARDLIST_SUCCESS, fetchApi.getCardlist)
}

function* getUsedCard(){
	yield takeLatest(ACTION.GET_USEDCARD, cardBaseSaga, ACTION.GET_CARDLIST_SUCCESS, fetchApi.getUsedCard)
}

function* getPrimaryHome(){
	yield takeLatest(ACTION.GET_PRIMARYHOME, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_TODAYTOTAL, param: {spShopId: data.data[0].id || ''}}),
			yield put({type: ACTION.GET_HOMEBALANCE, param: {id: data.data[0].id || ''}}),
			yield put({type: ACTION.GET_WITHDRAWLIST, param: {spShopId: data.data[0].id || '', page: 1, rows: 5}})
		) : (
			yield put({type: ACTION.CLOSE_LOADING}),
			throwError(data)
		)
	})
}

function* getShopBalance(){
	yield takeLatest(ACTION.GET_HOMEBALANCE, simpleFetchSaga, ACTION.GET_HOMEBALANCE_SUCCESS, fetchApi.getShopBalance)
}

function* getWithdraw(){
	yield takeLatest(ACTION.GET_WITHDRAWLIST, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getWithdrawlist, action.param)
		data.code === '200' || data.code === '60012' ? yield put({type: ACTION.GET_WITHDRAWLIST_SUCCESS, data: data.code === '200' ? data.data : {list: []}}) : throwError(data)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* filterHome(){
	yield takeLatest(ACTION.FILTER_HOMEMESS, function* (action){
		yield put({type: ACTION.START_LOADING})
		yield put({type: ACTION.GET_TODAYTOTAL, param: {spShopId: action.param.spShopId}}),
		yield put({type: ACTION.GET_HOMEBALANCE, param: {id: action.param.spShopId}}),
		yield put({type: ACTION.GET_WITHDRAWLIST, param: {spShopId: action.param.spShopId, page: 1, rows: 5}})
	})
}

function* getPrimaryWithdraw(){
	yield takeLatest(ACTION.GET_PRIMARYWITHDRAW, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getShopList)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_WITHDRAWLIST, param: Object.assign({spShopId: data.data[0] ? data.data[0].id : ''}, action.param)})
		) : (
			yield put({type: ACTION.CLOSE_LOADING}),
			throwError(data)
		)
	})
}
function* getBankcard(){
	yield takeLatest(ACTION.BANKCARD_LIST, function* (action){
		action.loading ? null : yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.getBankcardList, action.param)
		data.code === '200' ? yield put({type: ACTION.BANKCARD_LIST_SUCCESS, data: data.data}) : throwError(data)
		action.loading ? null : yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* getPrimaryBank(){
	yield takeLatest(ACTION.GET_PRIMARYBANK, function* (action){
		yield put({type: ACTION.START_LOADING})
		yield put({type: ACTION.BANKCARD_LIST, param: {}})
		let data = yield call(fetchApi.getShopList)
		data.code === '200' ? (
			yield put({type: ACTION.GET_SHOP_LIST_SUCCESS, data: data.data}),
			yield put({type: ACTION.GET_HOMEBALANCE, param: {id: data.data[0] ? data.data[0].id : ''}}),
			yield put({type: ACTION.CAN_WITHDRAW, param: {spShopId: data.data[0] ? data.data[0].id : ''}})
		) : (
			yield put({type: ACTION.CLOSE_LOADING}),
			throwError(data)
		)
	})
}

function* filterWithdrawBank(){
	yield takeLatest(ACTION.FILTER_WITHDRAWBANK, function* (action){
		yield put({type: ACTION.GET_HOMEBALANCE, param: {id: action.param.spShopId}}),
		yield put({type: ACTION.CAN_WITHDRAW, param: {spShopId: action.param.spShopId}})
	})
}

function* canWithdraw(){
	yield takeLatest(ACTION.CAN_WITHDRAW, function* (action){
		let data = yield call(fetchApi.canWithdraw, action.param)
		yield put({type: ACTION.CAN_WITHDRAW_SUCCESS, data: data.msg})
	})
}

function* getBaseUserInfo(){
	yield takeLatest(ACTION.GET_USERINFO, function* (action){
		let data = yield call(fetchApi.getUserInfo)
		data.code === '200' ? (
			yield put({type: ACTION.GET_USERINFO_SUCCESS, data: data.data}),
			yield put({type: ACTION.DOWNLOAD, param: {key: data.data.headImg}})
		) : throwError(data)
	})
}
function* getuserinfoReload(){
	location.hash == '#/login' || location.hash == '#/forget' || location.hash == '#/forgetnext' || location.hash == '#/regist' ? null : yield put({type: ACTION.GET_USERINFO})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* changeShopPrem(){
	yield takeLatest(ACTION.CHANGE_SHOPPERM, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.changeShopperm, action.param)
		data.code === '200' ? (
			message.success('操作成功'),
			yield put({type: ACTION.GET_SHOPPERM, param: {userId: action.param.userId}})
		) : (message.error('操作失败'), throwError(data))
	})
}

function* changeSaga(action, api, thisAction){
	let data = yield call(api, thisAction.param)
	data.code === '200' ? (
		message.success('修改成功'),
		yield put({type: action, param: {}})
	) : (
		message.error('修改失败'),
		throwError(data)
	)
}

function* changeShopDetail(){
	yield takeLatest(ACTION.CHANGE_SHOPDETAIL, function* (action){
		action.param.headPortrait === 'block' ? 
		yield call(uploadShopChange, action.param)
		: yield call(handleChangeShop, action.param, 'normal')
	})
}

function* uploadShopChange(param){
	let updata = yield call(fetchApi.upload, param.uploadParam)
	updata.code == '200' ? (
		yield call(handleChangeShop, param, 'upload')
	) : (message.error('上传失败'), throwError(updasg))
}

function* handleChangeShop(param, type){
	type === 'normal' ? null : param.headPortrait = param.uploadParam.key
	delete param.uploadParam
	let data = yield call(fetchApi.changeShop, param)
	data.code === '200' ? (
		message.success('操作成功'),
		yield put({type: ACTION.MODAL_STATE, data: false}),
		yield put({type: ACTION.GET_SHOP_LIST, param: {}})
	) : (
		message.error('操作失败'),
		throwError(data)
	)
}

function* changeSpAccount(){
	yield takeLatest(ACTION.CHANGE_SHOP_ACCOUNT, changeSaga, ACTION.GET_SHOP_LIST, fetchApi.changeSpaccount)
}

function* changeCard(){
	yield takeLatest(ACTION.CHANGE_CARD, function* (action){
		let data = yield call(fetchApi.saveCardChanges, action.param)
		data.code === '200' ? (
			message.success('添加成功'),
			yield put({type: action.searchParam.couponStatus === '4' ? ACTION.GET_USEDCARD : ACTION.GET_CARDLIST, param: action.searchParam})
		) : (
			message.error('添加失败'),
			throwError(data)
		)
	})
}

function* changeUserInfo(){
	yield takeLatest(ACTION.CHANGE_USERINFO, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.changeUserInfo, action.param)
		data.code === '200' ? (
			message.success('修改成功'),
			yield put({type: ACTION.GET_USERINFO, param: {}})
		) : (
			message.error('修改失败'),
			throwError(data)
		)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* getQrcode(){
	yield takeLatest(ACTION.GET_PAYSRCRET, function* (action){
		let data = yield call(fetchApi.getPaySecret, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_PAYSRCRET_SUCCESS, data: `${fetchApi.baseUrl}/api-mt/common/gen/qrcode/v1/gennerateQcode?paySecret=${data.data.paySecret}`}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* resetPassword(){
	yield takeLatest(ACTION.RESET_PASSWORD, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.resetAuthPassword, action.param)
		data.code === '200' ? message.success('修改成功') : data.code === '60009' && data.msg === 'OLD_WRONG_PASSWORD' ? message.error('旧密码错误') : (message.error('修改失败'),throwError(data))
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* withdraw(){
	yield takeLatest(ACTION.WITHDRAW, function* (action){
		let data = yield call(fetchApi.withDraw, action.param)
		data.code === '200' ? message.success('提现成功') : (message.error('提现失败'), throwError(data))
		yield put({type: ACTION.FILTER_WITHDRAWBANK, param: {spShopId: action.param.spShopId}})
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* sendModify(){
	yield takeLatest(ACTION.SEND_MODIFY, function* (action){
		let data = yield call(fetchApi.sendModify, action.param)
		data.code === '200' ? (
			message.success('已向绑定手机号发送验证码'),
			yield put({type: ACTION.TIME, data: true})
		) : (message.error('发送失败，请稍后再试'), throwError(data))
	})
}

function* changePhone(){
	yield takeLatest(ACTION.CHANGE_PHONE, function* (action){
		let data = yield call(fetchApi.changePhone, action.param)
		data.code === '200' ? message.success('修改成功') : (
			message.error(data.code === '60015' && data.msg === 'PHONE_ALREADY_REGISTERED' ? '手机号已被注册' : '修改失败'),
			throwError(data)
		)
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* excelSaga(){
	yield takeLatest(ACTION.TODO_EXCEL, function* (action){
		window.location.href = `${fetchApi.baseUrl}/api-mt/tb/excel/v1/exportXls?startTime=${action.param.startTime}&endTime=${action.param.endTime}&shopId=${action.param.shopId}`
		message.success('下载成功')
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* deleteShop(){
	yield takeLatest(ACTION.DELETE_SHOP, function* (action){
		let data = yield call(fetchApi.deleteShop, action.param)
		data.code === '200' ? (
			message.success('删除成功'),
			yield put({type: ACTION.GET_SHOP_LIST, param: {}})
		) : (message.error('删除失败'), throwError(data))
	})
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* getUploadToken(){
	yield takeLatest(ACTION.GET_UPLOADTOKEN, function* (action){
		let data = yield call(fetchApi.getUploadToken, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_UPTOKEN_COMPLETE, data: data.data}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}

function* upload(){
	yield takeLatest(ACTION.UPLOAD, function* (action){
		let data = yield call(fetchApi.upload, action.param)
		data.code == '200' ? (
			message.success('上传成功'),
			yield put({type: ACTION.DOWNLOAD, param: {key: action.param.key}}),
			yield put({type: ACTION.MODAL_STATE, data: false})
		) : (message.error('上传失败'))
	})
}

function* download(){
	yield takeLatest(ACTION.DOWNLOAD, function* (action){
		let data = yield call(fetchApi.download, action.param)
		data.code == '200' ? yield put({type: ACTION.DOWNLOAD_COMPLETE, data: {url: data.data, key: action.param.key}}) : throwError(data)
	})
}

function* handleFor(shoplist = []){
	for(let i in shoplist){
		yield put({type: ACTION.DOWN_LOADLIST, param: {key: shoplist[i].headPortrait, arrKey: i}})
	}
}

function* handleShoplist(){
	yield takeEvery(ACTION.DOWN_LOADLIST, function* (action){
		let data = yield call(fetchApi.download, {key: action.param.key})
		data.code == '200' ? yield put({type: ACTION.DOWN_LOADLIST_COMPLETE, data: {url: data.data, key: action.param.key, arrKey: action.param.arrKey}}) : throwError(data)
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* login(){
	yield takeLatest(ACTION.LOGIN, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.login, action.param)
		yield put({type: ACTION.CLOSE_LOADING})
		switch(data.code){
			case '200': 
				localStorage.setItem('token', data.data)
				yield call(judgeUserCharacter)
				break
			case '40002': 
				message.error('用户名或密码错误')
				break
			case '40003':
			case '40001': 
				message.error('请重新登录')
				break
			case '40009': 
				message.error('账号已被锁定')
				break
			case '40008': 
				message.error('账号禁止登录')
				break
			default: 
				message.error('登录失败，请稍后再试')
				break
		}
	})
}

function* judgeUserCharacter(){
	let data = yield call(fetchApi.getInitialUserInfo)
	data.code == '200' ? (
		message.success('登录成功'),
		yield put({type: ACTION.SAVE_USERCHARACTER, data: data.data || {}}),
		yield put({type: ACTION.GET_SIDEMENU, data: data.data.accountType}),
		yield put({type: ACTION.GET_USERINFO})
	) : (message.error('登录失败，请稍后再试'), throwError(data))
}

function* logout(){
	yield takeLatest(ACTION.LOGOUT, function* (action){
		let data = yield call(fetchApi.logout)
		data.code === '200' ? (
			message.success('退出成功'),
			localStorage.removeItem('token'),hashHistory.push('/login'),
			yield put({type: ACTION.RESET})
		) : (message.error('退出登录失败，请刷新重试'), throwError(data))
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* sendRegCode(){
	yield takeLatest(ACTION.SENDREGCODE, function* (action){
		let data = yield call(fetchApi.validatePhone, action.param)
		data.code === '200' ? yield call(sendCode, fetchApi.sendRegcode, action.param) : (message.error('手机号已被注册'), throwError(data))
	})
}
function* sendCode(api, param){
	let data = yield call(api, param)
	data.code === '200' ? (
		message.success('已向绑定手机号发送验证码'),
		yield put({type: ACTION.TIME, data: true})
	) : (message.error(data.msg === 'phone locked' ? '手机号已锁定' : '发送失败，请稍后再试'), throwError(data))
}

function* register(){
	yield takeLatest(ACTION.REGISTER, function* (action){
		let data = yield call(fetchApi.registerPhone, {phone: action.param.phone, code: action.param.code})
		action.param.phoneNo = action.param.phone
		delete action.param.phone
		data.code === '200' ? yield call(saveRegister, action.param) : (message.error('验证码错误'), throwError(data))
	})
}

function* saveRegister(param){
	let data = yield call(fetchApi.saveRegister, param)
	data.code === '200' ? (message.success('注册成功'), hashHistory.push('/login')) : (message.error('注册失败'), throwError(data))
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* sendForgetCode(){
	yield takeLatest(ACTION.SENDFORGETCODE, function* (action){
		yield call(sendCode, fetchApi.sendForgetcode, action.param)
	})
}

function* forgetNextstep(){
	yield takeLatest(ACTION.FORGETNEXTSTEP, function* (action){
		let data = yield call(fetchApi.forgetNextStep, action.param)
		data.code === '200' ? (yield put({type: ACTION.VALIDATEFORGETCOMPLETE, data: action.param}), hashHistory.push('/forgetnext')) : (message.error('校验验证码失败'), throwError(data))
	})
}

function* setNewpassword(){
	yield takeLatest(ACTION.SETNEWPASSWORD, function* (action){
		let data = yield call(fetchApi.setNewpassword, action.param)
		data.code === '200' ? (message.success('设置新密码成功'), hashHistory.push('/login')) : (message.error('设置新密码失败'), throwError(data))
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
	yield fork(changeShopDetail)
	yield fork(getSpAccountDetail)
	yield fork(changeSpAccount)
	yield fork(getTodayTotal)
	yield fork(getBilllist)
	yield fork(getPrimaryBill)
	yield fork(filterBill)
	yield fork(getBillDetail)
	yield fork(getPrimaryChart)
	yield fork(getChartdata)
	yield fork(getDayTotal)
	yield fork(getAllTotal)
	yield fork(filterChart)
	yield fork(getCardlist)
	yield fork(getPrimaryCard)
	yield fork(getUsedCard)
	yield fork(changeCard)
	yield fork(getPrimaryHome)
	yield fork(getShopBalance)
	yield fork(filterHome)
	yield fork(getWithdraw)
	yield fork(getPrimaryWithdraw)
	yield fork(resetPassword)
	yield fork(getBankcard)
	yield fork(getPrimaryBank)
	yield fork(filterWithdrawBank)
	yield fork(withdraw)
	yield fork(canWithdraw)
	yield fork(sendModify)
	yield fork(changePhone)
	yield fork(getBaseUserInfo)
	yield fork(changeUserInfo)
	yield fork(excelSaga)
	yield fork(getUploadToken)
	yield fork(upload)
	yield fork(download)
	yield fork(handleShoplist)
	yield fork(login)
	yield fork(logout)
	yield fork(sendRegCode)
	yield fork(register)
	yield fork(sendForgetCode)
	yield fork(forgetNextstep)
	yield fork(setNewpassword)
	yield fork(getuserinfoReload)
}