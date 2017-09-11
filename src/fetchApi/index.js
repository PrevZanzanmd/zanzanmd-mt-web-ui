import fetch from 'isomorphic-fetch'

const baseUrl = 'http://192.168.1.100:8096/proxy'

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
export const getAreadata = (param = {}) => fetchApi({specPath: '/api-mt//territory/v1/tree', param: param})

//获取二维码
// export const getQrcode = (param = {}) => fetchApi({specPath: '/api-mt//common/gen/qrcode/v1/gennerateQcode', param: param})