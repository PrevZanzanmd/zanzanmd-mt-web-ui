import { takeLatest, takeEvery } from 'redux-saga'
import { put, fork, call } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { message } from 'antd'
import * as ACTION from '../Actions'
import * as fetchApi from '../../fetchApi'
import { handleFullDate } from '../../fetchApi/commonApi'

const throwError = data => {
	switch(data.code){
		case '60001': message.error('修改失败');break
		case '60002': message.error('数据调取失败，请稍后再试');break
		case '60003': message.error('账号信息异常,请联系客服提交异常信息');break
		case '60005': message.error('验证码错误');break
		case '60008': message.error('实名认证失败');break
		case '60009': message.error('密码认证失败');break
		case '60010': message.error('验证码发送失败，请检查网络连接是否正常');break
		case '60011': message.error('手机未被注册');break
		case '60013': message.error('请先选择店铺');break
		case '60014': message.error('请输入商家用户');break
		case '60015': message.error('⼿机号码已被注册，请修改后再试');break
		case '60016': message.error('该店铺已存在');break
		case '60017': message.error('请添加银行卡');break
		case '60018': message.error('当日已提现，不能重复提现');break
		case '60019': message.error('不在提现时间');break
		case '60020': message.error('提现失败');break
		case '60022': message.error('今日已提现');break
		case '60023': message.error('获取数据出错，请稍后再试');break
		case '60026': message.error('持卡人信息错误，请重新核对信息');break
		case '60027': message.error('手机号错误，请输入正确的手机号');break
		case '60028': message.error('银行卡信息错误，请核对后再试');break
		case '60029': message.error('申请充值金失败');break
		case '60030': message.error('保存失败，请稍后再试');break
		case '60031': message.error('优惠券已过期，不能进行此操作');break
		case '60032': message.error('请勿重复操作');break
		case '60033': message.error('对不起，系统开小差了,请稍后再试');break
		case '60034': message.error('该身份证号已经绑定账号，请勿重复绑定');break
		case '60035': message.error('删除失败，请稍后再试');break
		case '60038': message.error('余额不足');break
		case '60039': message.error('当前交易状态⽆法退款');break
		case '60040': message.error('邀请码错误，请核对后再试');break
		case '60041': message.error('请先添加店铺');break
		case '60042': message.error('请勿修改相同手机号');break
		case '60044': message.error('退款失败');break
		case '60045': message.error('正在退款…');break
		case '60046': message.error('店铺账号不能为手机号');break
		case '40050': message.error('账号已存在');break
		case '40001':
		case '40002':
		case '40003':
		case '40008':
		case '60012':
		case '40009': break
		default: message.error('操作失败！');break
	}
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
		data.code === '200' ? yield put({type: ACTION.GET_BILLLIST_SUCCESS, data: data.data}) : data.code == '60012' ? yield put({type: ACTION.GET_BILLLIST_SUCCESS, data: {transactionLists: []} }) : throwError(data)
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
		yield put({type: ACTION.GET_TODAYTOTAL, param: action.param.spShopId ? {spShopId: action.param.spShopId} : {} })
		yield put({type: ACTION.GET_BILLLIST, param: action.param})
	})
}

function* filterChart(){
	yield takeLatest(ACTION.FILTER_CHART, function* (action){
		yield put({type: ACTION.GET_ALLTOTAL, param: action.param.spShopId ? {spShopId: action.param.spShopId} : {}})
		yield put({type: ACTION.GET_CHARTDATA, param: action.param.spShopId ? {spShopId: action.param.spShopId} : {}})
		yield put({type: ACTION.GET_DAYTOTAL, param: Object.assign({}, {dayTime: action.param.dayTime ? action.param.dayTime : handleFullDate()}, action.param.spShopId ? {spShopId: action.param.spShopId} : {}) })
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
		) : throwError(data)
	})
}

function* changeSaga(action, api, thisAction){
	let data = yield call(api, thisAction.param)
	data.code === '200' ? (
		message.success('修改成功'),
		yield put({type: action, param: {}}),
		yield put({type: ACTION.MODAL_STATE, data: false})
	) : throwError(data)
}

function* changeShopDetail(){
	yield takeLatest(ACTION.CHANGE_SHOPDETAIL, function* (action){
		yield put({type: ACTION.START_LOADING})
		action.param.headPortrait === 'block' ? 
		yield call(uploadShopChange, action.param)
		: yield call(handleChangeShop, action.param, 'normal')
	})
}

function* uploadShopChange(param){
	console.log(param)
	let updata = yield call(fetchApi.upload, param.uploadParam)
	updata.code == '200' ? (
		yield call(handleChangeShop, param, 'upload')
	) : throwError(updasg)
}

function* handleChangeShop(param, type){
	type === 'normal' ? null : param.headPortrait = param.uploadParam.key
	delete param.uploadParam
	let data = yield call(fetchApi.changeShop, param)
	data.code === '200' ? (
		message.success('操作成功'),
		yield put({type: ACTION.CHANGE_SHOP_COMPLETE, data: true}),
		yield put({type: ACTION.MODAL_STATE, data: false}),
		yield put({type: ACTION.GET_SHOP_LIST, param: {}})
	) : throwError(data)
	yield put({type: ACTION.CLOSE_LOADING})
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
		) : throwError(data)
	})
}

function* changeUserInfo(){
	yield takeLatest(ACTION.CHANGE_USERINFO, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.changeUserInfo, action.param)
		data.code === '200' ? (
			message.success('修改成功'),
			yield put({type: ACTION.GET_USERINFO, param: {}})
		) : throwError(data)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function* getQrcode(){
	yield takeLatest(ACTION.GET_PAYSRCRET, function* (action){
		let data = yield call(fetchApi.getPaySecret, action.param)
		data.code === '200' ? (
			yield put({type: ACTION.GET_PAYSRCRET_SUCCESS, data: `${fetchApi.baseUrl}/api-mt/common/gen/qrcode/v1/gennerateQcode?paySecret=${data.data.paySecret}&codeNo=${data.data.codeNo}`}),
			yield put({type: ACTION.MODAL_STATE, data: true})
		) : throwError(data)
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* resetPassword(){
	yield takeLatest(ACTION.RESET_PASSWORD, function* (action){
		yield put({type: ACTION.START_LOADING})
		let data = yield call(fetchApi.resetAuthPassword, action.param)
		data.code === '200' ? message.success('修改成功') : throwError(data)
		yield put({type: ACTION.CLOSE_LOADING})
	})
}

function* withdraw(){
	yield takeLatest(ACTION.WITHDRAW, function* (action){
		let data = yield call(fetchApi.withDraw, action.param)
		data.code === '200' ? message.success('提现成功') : throwError(data)
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
		) : throwError(data)
	})
}

function* changePhone(){
	yield takeLatest(ACTION.CHANGE_PHONE, function* (action){
		let data = yield call(fetchApi.changePhone, action.param)
		data.code === '200' ? message.success('修改成功') : throwError(data)
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
		) : throwError(data)
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
		if(action.param.key){
			let data = yield call(fetchApi.download, action.param)
			data.code == '200' ? yield put({type: ACTION.DOWNLOAD_COMPLETE, data: {url: data.data, key: action.param.key}}) : throwError(data)
		}else{
			yield put({type: ACTION.DOWNLOAD_COMPLETE, data: {url: undefined, key: action.param.key}})
		}
	})
}

function* handleFor(shoplist = []){
	for(let i in shoplist){
		yield put({type: ACTION.DOWN_LOADLIST, param: {key: shoplist[i].headPortrait, arrKey: i}})
	}
}

function* handleShoplist(){
	yield takeEvery(ACTION.DOWN_LOADLIST, function* (action){
		if(action.param.key){
			let data = yield call(fetchApi.download, {key: action.param.key})
			data.code == '200' ? yield put({type: ACTION.DOWN_LOADLIST_COMPLETE, data: {url: data.data, key: action.param.key, arrKey: action.param.arrKey}}) : throwError(data)
		}
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
	) : message.error('登录失败，请稍后再试')
}

function* logout(){
	yield takeLatest(ACTION.LOGOUT, function* (action){
		let data = yield call(fetchApi.logout)
		data.code === '200' ? (
			message.success('退出成功'),
			localStorage.removeItem('token'),hashHistory.push('/login'),
			yield put({type: ACTION.RESET})
		) : message.error('退出登录失败，请刷新重试')
	})
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function* sendRegCode(){
	yield takeLatest(ACTION.SENDREGCODE, function* (action){
		let data = yield call(fetchApi.validatePhone, action.param)
		data.code === '200' ? yield call(sendCode, fetchApi.sendRegcode, action.param) : throwError(data)
	})
}
function* sendCode(api, param){
	let data = yield call(api, param)
	data.code === '200' ? (
		message.success('已向绑定手机号发送验证码'),
		yield put({type: ACTION.TIME, data: true})
	) : throwError(data)
}

function* register(){
	yield takeLatest(ACTION.REGISTER, function* (action){
		let data = yield call(fetchApi.registerPhone, {phone: action.param.phone, code: action.param.code})
		action.param.phoneNo = action.param.phone
		delete action.param.phone
		data.code === '200' ? yield call(saveRegister, action.param) : throwError(data)
	})
}

function* saveRegister(param){
	let data = yield call(fetchApi.saveRegister, param)
	data.code === '200' ? (message.success('注册成功'), hashHistory.push('/login')) : throwError(data)
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
		data.code === '200' ? (yield put({type: ACTION.VALIDATEFORGETCOMPLETE, data: action.param}), hashHistory.push('/forgetnext')) : throwError(data)
	})
}

function* setNewpassword(){
	yield takeLatest(ACTION.SETNEWPASSWORD, function* (action){
		let data = yield call(fetchApi.setNewpassword, action.param)
		data.code === '200' ? (message.success('设置新密码成功'), hashHistory.push('/login')) : throwError(data)
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