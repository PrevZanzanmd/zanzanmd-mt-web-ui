import fetch from 'isomorphic-fetch'

const baseUrl = 'http://192.168.1.104:8096/proxy'

const handleUrl = ({path = baseUrl, param, specPath, method = 'GET', paramType = 'normal'}) => `${path}?method=${method}&type=${paramType}&path=${specPath}&param=${JSON.stringify(param)}`

const fetchApi = Obj => fetch(handleUrl(Obj)).then(res => res.json())

//店铺列表
export const getShopList = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/list', param: param})

//店铺详情
export const getShopDetail = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/view', param: param})

//获取支付密钥
export const getPaySecret = (param = {}) => fetchApi({specPath: '/api-mt/qr/v1/getPaySecret', method: 'POST', param: param})

//删除店铺
export const deleteShop = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/delete', paramType: 'url', param: param})

//查看店铺权限
export const checckShopPermission = (param = {}) => fetchApi({specPath: '/api-account/permission/v1/find', method: 'POST', param: param})

//修改店铺权限
export const changeShopperm = (param = {}) => fetchApi({specPath: '/api-account/permission/v1/update', method: 'POST', param: param})

//行业分类
export const getIndustrylist = (param = {}) => fetchApi({specPath: '/api-mt/industry/v1/list', param: param})

//区域信息
export const getAreadata = (param = {}) => fetchApi({specPath: '/api-mt/territory/v1/tree', param: param})

//修改店铺
export const changeShop = (param = {}) => fetchApi({specPath: '/api-mt/shop/v1/updateOrAdd', method: 'POST', param: param})

//获取店铺账号详情
export const getShopAccountDetail = (param = {}) => fetchApi({specPath: '/api-account/sm/v1/infos', paramType: 'url', param: param})

//修改店铺账号
export const changeSpaccount = (param = {}) => fetchApi({specPath: '/api-account/sm/v1/update', method: 'POST', param: param})

//获取今日交易金额和笔数
export const getTodayTotal = (param = {}) => fetchApi({specPath: '/api-mt/bill/v1/todayTotal', param: param})

//获取账单列表
export const getBilllist = (param = {}) => fetchApi({specPath: '/api-mt/bill/v1/list', method: 'POST', param: param})

//账单详情
export const getBillDetail = (param = {}) => fetchApi({specPath: '/api-mt/bill/v1/detail', paramType: 'url', param: param})

//报表总计信息
export const getTotal = (param = {}) => fetchApi({specPath: '/api-mt/report/v1/findTotal', param: param})

//报表数据
export const getChartdata = (param = {}) => fetchApi({specPath: '/api-mt/report/v1/findDataForMoney', param: param})

//根据日期查询统计信息
export const getDateTotal = (param = {}) => fetchApi({specPath: '/api-mt/report/v1/findTotalForDate', param: param})

//获取卡券列表
export const getCardlist = (param = {}) => fetchApi({specPath: '/api-mt/coupon/v1/list', param: param})

//获取已使用卡券
export const getUsedCard = (param = {}) => fetchApi({specPath: '/api-mt/couponReceive/v1/list', param: param})

//修改卡券
export const saveCardChanges = (param = {}) => fetchApi({specPath: '/api-mt/coupon/v1/save', method: 'POST', param: param})

//获取二维码
// export const getQrcode = (param = {}) => fetchApi({specPath: '/api-mt//common/gen/qrcode/v1/gennerateQcode', param: param})