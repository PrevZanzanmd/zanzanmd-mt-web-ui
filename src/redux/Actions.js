export const START_LOADING = 'START_LOADING'
export const CLOSE_LOADING = 'CLOSE_LOADING'

export const GET_SIDEMENU = 'GET_SIDEMENU'
export const SIDEMENU_COMPLETE = 'SIDEMENU_COMPLETE'

export const MODAL_STATE = 'MODAL_STATE'
export const SELECT_LOAD = 'SELECT_MODAL'

//店铺列表
export const GET_SHOP_LIST = 'GET_SHOP_LIST'
export const GET_SHOP_LIST_SUCCESS = 'GET_SHOP_LIST_SUCCESS'
//店铺详情
export const GET_SHOP_DETAIL = 'GET_SHOP_DETAIL'
export const GET_SHOP_DETAIL_SUCCESS = 'GET_SHOP_DETAIL_SUCCESS'
//获取支付密钥
export const GET_PAYSRCRET = 'GET_PAYSRCRET'
export const GET_PAYSRCRET_SUCCESS = 'GET_PAYSRCRET_SUCCESS'
//删除店铺
export const DELETE_SHOP = 'DELETE_SHOP'
//店铺权限
export const GET_SHOPPERM = 'GET_SHOPPERM'
export const GET_SHOPPERM_SUCCESS = 'GET_SHOPPERM_SUCCESS'
//修改店铺权限
export const CHANGE_SHOPPERM = 'CHANGE_SHOPPERM'
//获取行业列表
export const GET_INDUSTRY = 'GET_INDUSTRY'
export const GET_INDUSTRY_SUCCESS = 'GET_INDUSTRY_SUCCESS'
//地区
export const GET_AREA = 'GET_AREA'
export const GET_AREA_SUCCESS = 'GET_AREA_SUCCESS'
//修改店铺
export const CHANGE_SHOPDETAIL = 'CHANGE_SHOPDETAIL'
//店铺账号详情
export const GET_ACCOUNT_DETAIL = 'GET_ACCOUNT_DETAIL'
export const GET_ACCOUNT_DETAIL_SUCCESS = 'GET_ACCOUNT_DETAIL_SUCCESS'
//修改店铺账号
export const CHANGE_SHOP_ACCOUNT = 'CHANGE_SHOP_ACCOUNT'
//初次加载账单页面
export const BILL_PRIMARY_LOAD = 'BILL_PRIMARY_LOAD'
//获取账单列表
export const GET_BILLLIST = 'GET_BILLLIST'
export const GET_BILLLIST_SUCCESS = 'GET_BILLLIST_SUCCESS'
//获取今日交易金额和笔数
export const GET_TODAYTOTAL = 'GET_TODAYTOTAL'
export const GET_TODAYTOTAL_SUCCESS = 'GET_TODAYTOTAL_SUCCESS'
//筛选账单
export const FILTER_BILL = 'FILTER_BILL'
//账单详情
export const GET_BILLDETAIL = 'GET_BILLDETAIL'
export const GET_BILLDETAIL_SUCCESS = 'GET_BILLDETAIL_SUCCESS'
//初次加载报表
export const CHART_PRIMARY_LOAD = 'CHART_PRIMARY_LOAD'
//加载统计数据
export const GET_ALLTOTAL = 'GET_ALLTOTAL'
export const GET_ALLTOTAL_SUCCESS = 'GET_ALLTOTAL_SUCCESS'
//加载报表数据
export const GET_CHARTDATA = 'GET_CHARTDATA'
export const GET_CHARTDATA_SUCCESS = 'GET_CHARTDATA_SUCCESS'
//根据日期查询统计信息
export const GET_DAYTOTAL = 'GET_DAYTOTAL'
export const GET_DAYTOTAL_SUCCESS = 'GET_DAYTOTAL_SUCCESS'
//报表筛选
export const FILTER_CHART = 'FILTER_CHART'
//获取卡券列表
export const GET_CARDLIST = 'GET_CARDLIST'
export const GET_CARDLIST_SUCCESS = 'GET_CARDLIST_SUCCESS'
//初次加载卡包
export const CARD_PRIMARY_LOAD = 'CARD_PRIMARY_LOAD'
//获取已使用卡券
export const GET_USEDCARD = 'GET_USEDCARD'
//修改卡券
export const CHANGE_CARD = 'CHANGE_CARD'
//初次加载首页
export const GET_PRIMARYHOME = 'GET_PRIMARYHOME'
//获取首页店铺余额
export const GET_HOMEBALANCE = 'GET_HOMEBALANCE'
export const GET_HOMEBALANCE_SUCCESS = 'GET_HOMEBALANCE_SUCCESS'
//筛选首页信息
export const FILTER_HOMEMESS = 'FILTER_HOMEMESS'
//提现列表
export const GET_WITHDRAWLIST = 'GET_WITHDRAWLIST'
export const GET_WITHDRAWLIST_SUCCESS = 'GET_WITHDRAWLIST_SUCCESS'
//初次加载提现列表
export const GET_PRIMARYWITHDRAW = 'GET_PRIMARYWITHDRAW'
//重置登录密码
export const RESET_PASSWORD = 'RESET_PASSWORD'

//发送验证码
export const SEND_MODIFY = 'SEND_MODIFY'
//修改手机号
export const CHANGE_PHONE = 'CHANGE_PHONE'
//倒计时开始
export const TIME = 'TIME'

//银行卡列表
export const BANKCARD_LIST = 'BANKCARD_LIST'
export const BANKCARD_LIST_SUCCESS = 'BANKCARD_LIST_SUCCESS'
//初次加载提现
export const GET_PRIMARYBANK = 'GET_PRIMARYBANK'
//提现选择店铺
export const FILTER_WITHDRAWBANK = 'FILTER_WITHDRAWBANK'
//提现
export const WITHDRAW = 'WITHDRAW'
//判断是否能提现
export const CAN_WITHDRAW = 'CAN_WITHDRAW'
export const CAN_WITHDRAW_SUCCESS = 'CAN_WITHDRAW_SUCCESS'

//获取个人信息
export const GET_USERINFO = 'GET_USERINFO'
export const GET_USERINFO_SUCCESS = 'GET_USERINFO_SUCCESS'
//修改个人信息
export const CHANGE_USERINFO = 'CHANGE_USERINFO'

//导出excel
export const TODO_EXCEL = 'TODO_EXCEL'

//获取上传信息
export const GET_UPLOADTOKEN = 'GET_UPLOADTOKEN'
export const GET_UPTOKEN_COMPLETE = 'GET_UPTOKEN_COMPLETE'
//上传
export const UPLOAD = 'UPLOAD'
//下载
export const DOWNLOAD = 'DOWNLOAD'
export const DOWNLOAD_COMPLETE = 'DOWNLOAD_COMPLETE'
//
export const DOWN_LOADLIST = 'DOWN_LOADLIST'
export const DOWN_LOADLIST_COMPLETE = 'DOWN_LOADLIST_COMPLETE'
//登录
export const LOGIN = 'LOGIN'
export const LOGIN_COMPLETE = 'LOGIN_COMPLETE'
//退出登录
export const LOGOUT = 'LOGOUT'
//发送注册验证码
export const SENDREGCODE = 'SENDREGCODE'
//注册
export const REGISTER = 'REGISTER'
//忘记密码发送验证码
export const SENDFORGETCODE = 'SENDFORGETCODE'
//忘记密码下一步
export const FORGETNEXTSTEP = 'FORGETNEXTSTEP'
export const VALIDATEFORGETCOMPLETE = 'VALIDATEFORGETCOMPLETE'
//设置新密码
export const SETNEWPASSWORD = 'SETNEWPASSWORD'
//reset all data
export const RESET = 'RESET'

//保存判断用户类型用户信息
export const SAVE_USERCHARACTER = 'SAVE_USERCHARACTER'


//--------------------------SHOP ACCOUNT----------------------------------//
export const S_GET_SHOPDETAIL = 'S_GET_SHOPDETAIL'

export const S_BILL_PRIMARY_LOAD = 'S_BILL_PRIMARY_LOAD'

export const S_CHART_PRIMARY_LOAD = 'S_CHART_PRIMARY_LOAD'

export const S_CARD_PRIMARY_LOAD = 'S_CARD_PRIMARY_LOAD'









