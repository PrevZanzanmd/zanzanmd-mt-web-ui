import fetch from 'isomorphic-fetch'
import { hashHistory } from 'react-router'

export const baseUrl = 'http://mt.qdxiao2.com'
export const proxybaseUrl = 'http://192.168.1.104:8096/proxy'

const getParamHandler = param => {
	let baseStr = '?'
	for(let i in param){
		baseStr += `${i}=${param[i]}&`
	}
	return param === {} ? '' : baseStr.substring(0, baseStr.length - 1)
}
const postParamHandler = param => {
	let baseStr = ''
	for(let i in param){
		baseStr += `/${param[i]}`
	}
	return baseStr
}

const fetchApi = Obj => fetch(...handleUrl(Obj)).then(res => res.json()).then(data => {
	data.code === '40003' || data.code === '40001' ? (hashHistory.push({
		pathname: '/login',
		state: 'LOSE_EFFECTIVENESS'
	}), data = {code: data.code}) : null
	return data
})



const handleUrl = ({path = proxybaseUrl, param, specPath, method = 'GET', paramType = 'normal'}) => [`${path}?method=${method}&type=${paramType}&path=${specPath}&param=${JSON.stringify(param)}`,
specPath === '/api-auth/auth/v1/login' 
|| specPath === '/api-mt/user/v1/checkPhone' 
|| specPath === '/api-mt/user/v1/getVerificationCode' ? {} : 
{
	headers: {
		"Authorization": localStorage.getItem('token')
	}
}]

// const handleUrl = ({path = baseUrl, param, specPath, method = 'GET', paramType = 'normal'}) => [`${path}${specPath}${paramType === 'url' ? postParamHandler(param) : method === 'GET' ? getParamHandler(param) : ''}`, Object.assign({
// 	method
// }, {
// 	headers: Object.assign({}, paramType === 'normal' && method === 'POST' ? {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"} : {}, specPath === '/api-auth/auth/v1/login' 
// 	|| specPath === '/api-mt/user/v1/checkPhone' 
// 	|| specPath === '/api-mt/user/v1/getVerificationCode' ? {} : {"Authorization": localStorage.getItem('token')})
// }, method === 'POST' && paramType === 'normal' ? {
// 	body: getParamHandler(param).substring(1, getParamHandler(param).length)
// } : {})]



//获取用户信息判断角色
export const getInitialUserInfo = (param = {}) => fetchApi({specPath: '/api-auth/user/v1/userinfo', method: 'POST', param})

//店铺列表
export const getShopList = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/list', param})

//店铺详情
export const getShopDetail = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/view', param})

//获取支付密钥
export const getPaySecret = (param = {}) => fetchApi({specPath: '/api-mt/qr/v1/getPaySecret', method: 'POST', param})

//删除店铺
export const deleteShop = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/delete', paramType: 'url', param})

//查看店铺权限
export const checckShopPermission = (param = {}) => fetchApi({specPath: '/api-account/permission/v1/find', method: 'POST', param})

//修改店铺权限
export const changeShopperm = (param = {}) => fetchApi({specPath: '/api-account/permission/v1/update', method: 'POST', param})

//行业分类
export const getIndustrylist = (param = {}) => fetchApi({specPath: '/api-mt/industry/v1/list', param})

//区域信息
export const getAreadata = (param = {}) => fetchApi({specPath: '/api-mt/territory/v1/tree', param})

//修改店铺
export const changeShop = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/updateOrAdd', method: 'POST', param})

//获取店铺账号详情
export const getShopAccountDetail = (param = {}) => fetchApi({specPath: '/api-account/sm/v1/infos', paramType: 'url', param})

//修改店铺账号
export const changeSpaccount = (param = {}) => fetchApi({specPath: '/api-account/sm/v1/update', method: 'POST', param})

//获取今日交易金额和笔数
export const getTodayTotal = (param = {}) => fetchApi({specPath: '/api-mt/bill/v1/todayTotal', param})

//获取账单列表
export const getBilllist = (param = {}) => fetchApi({specPath: '/api-mt/bill/v1/list', method: 'POST', param})

//账单详情
export const getBillDetail = (param = {}) => fetchApi({specPath: '/api-mt/bill/v1/detail', paramType: 'url', param})

//报表总计信息
export const getTotal = (param = {}) => fetchApi({specPath: '/api-mt/report/v1/findTotal', param})

//报表数据
export const getChartdata = (param = {}) => fetchApi({specPath: '/api-mt/report/v1/findDataForMoney', param})

//根据日期查询统计信息
export const getDateTotal = (param = {}) => fetchApi({specPath: '/api-mt/report/v1/findTotalForDate', param})

//获取卡券列表
export const getCardlist = (param = {}) => fetchApi({specPath: '/api-mt/coupon/v1/list', param})

//获取已使用卡券
export const getUsedCard = (param = {}) => fetchApi({specPath: '/api-mt/couponReceive/v1/list', param})

//修改卡券
export const saveCardChanges = (param = {}) => fetchApi({specPath: '/api-mt/coupon/v1/save', method: 'POST', param})

//获取首页店铺余额
export const getShopBalance = (param = {}) => fetchApi({specPath: '/api-mt/personalCenter/v1/query', param})

//获取提现记录
export const getWithdrawlist = (param = {}) => fetchApi({specPath: '/api-mt/withdrawal/v1/list', method: 'POST', param})

//重置登录密码
export const resetAuthPassword = (param = {}) => fetchApi({specPath: '/api-account/personal/v1/updatePassword', method: 'POST', param})

//修改手机发送验证码
export const sendModify = (param = {}) => fetchApi({specPath: '/api-account/personal/v1/sendModifyP', method: 'POST', param})

//修改手机号
export const changePhone = (param = {}) => fetchApi({specPath: '/api-account/personal/v1/modifyP', method: 'POST', param})

//查看银行卡列表
export const getBankcardList = (param = {}) => fetchApi({specPath: '/api-mt/bankcard/v1/list', param})

//提现
export const withDraw = (param = {}) => fetchApi({specPath: '/api-mt/dowithdrawal/v1/dowithdrawal', method: 'POST', param})

//判断是否能提现
export const canWithdraw = (param = {}) => fetchApi({specPath: '/api-mt/dowithdrawal/v1/wdtoday', method: 'POST', param})

//获取个人信息
export const getUserInfo = (param = {}) => fetchApi({specPath: '/api-account/personal/v1/getPersonal', param})

//修改个人信息
export const changeUserInfo = (param = {}) => fetchApi({specPath: '/api-account/personal/v1/updatePersonal', method: 'POST', param})

//获取上传文件token
export const getUploadToken = (param = {}) => fetchApi({specPath: '/api-mt/upload/v1/token', param})

//上传文件
export const upload = (param = {}) => fetch(param.url, {
    method: 'POST',
    body: param.formData
}).then(res => res.json())

//下载文件
export const download = (param = {}) => fetchApi({specPath: '/api-mt/upload/v1/download', param})

//登录
export const login = (param = {}) => fetchApi({specPath: '/api-auth/auth/v1/login', method: 'POST', param})

//退出登录
export const logout = (param = {}) => fetchApi({specPath: '/api-auth/auth/v1/logout', method: 'POST', param})

//验证手机号是否被注册
export const validatePhone = (param = {}) => fetchApi({specPath: '/api-account/user/v1/checkPhone', method: 'POST', param})

//发送验证码
export const sendRegcode = (param = {}) => fetchApi({specPath: '/api-account/user/v1/getVerificationCode', method: 'POST', param})

//注册手机号
export const registerPhone = (param = {}) => fetchApi({specPath: '/api-account/user/v1/check', method: 'POST', param})

//保存注册信息
export const saveRegister = (param = {}) => fetchApi({specPath: '/api-account/user/v1/register', method: 'POST', param})

//忘记密码发送验证码
export const sendForgetcode = (param = {}) => fetchApi({specPath: '/api-account/user/v1/send', method: 'POST', param})

//校验忘记密码验证码
export const forgetNextStep = (param = {}) => fetchApi({specPath: '/api-account/user/v1/forget', method: 'POST', param})

//忘记密码设置新密码
export const setNewpassword = (param = {}) => fetchApi({specPath: '/api-account/user/v1/newPassword', method: 'POST', param})

//收银员列表
export const getCashierList = (param = {}) => fetchApi({specPath: '/api-account/cm/v1/list', param})

//删除收银员
export const deleteCashier = (param = {}) => fetchApi({specPath: '/api-account/cm/v1/del/', param, paramType: 'url'})

//收银员详情
export const cashierDetail = (param = {}) => fetchApi({specPath: '/api-account/cm/v1/infos', param, paramType: 'url'})

//修改收银员
export const updateCashier = (param = {}) => fetchApi({specPath: '/api-account/cm/v1/update', param, method: 'POST'})

//添加收银员
export const addCashier = (param = {}) => fetchApi({specPath: '/api-account/cm/v1/add', param, method: 'POST'})

//获取提现手续费
export const getWithdrawFee = (param = {}) => fetchApi({specPath: '/api-account/personal/v1/getCommission', param, method: 'GET'})

//获取二维码
// export const getQrcode = (param = {}) => fetchApi({specPath: '/api-mt//common/gen/qrcode/v1/gennerateQcode', param})