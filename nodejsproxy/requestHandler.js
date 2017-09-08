var http = require('http')
	querystring = require('querystring')
	url = require('url')

let cookie = ''

const opt = {
	hostname: '192.168.1.109',
	path: '/'
}
const loginOpt = {
	hostname:'192.168.1.109',
	port: '8099',
	method:'GET',
	path: '/customLogin'
}

const pathList = {
	'user': '/sys/user/v1/list',
	'deleteUser': '/sys/user/v1/delete',
	'userInfo': '/sys/user/v1/info',
	'qrcode': '/qr/code/v1/list',
	'gennerateQcode': '/common/gen/qrcode/v1/gennerateQcode',
	'balance': '/wd/audit/v1/list',
	'addQrcode': '/qr/code/v1/addTen',
	'shoplist': '/sp/info/v1/list',
	'industry': '/sp/industry/v1/list',
	'changeShopLinestate': '/sp/info/v1/line',
	'addShopCount': '/sp/info/v1/topUp',
	'changeBalanceState': '/wd/audit/v1/auditAction',
	'billlist': '/tb/bill/v1/list',
	'handleExcel': '/tb/bill/v1/exportXls',
	'cardlist': '/cp/coupon/v1/list',
	'usedCard': '/cp/coupon/v1/receivelist',
	'recharge': '/jc/recharge/v1/list',
	'changeRechargeState': '/jc/recharge/v1/audit',
	'cardReviewlist': '/cp/audit/v1/list',
	'changeCardState': '/cp/audit/v1/audit',
	'banklist': '/bc/bankcard/v1/list',
	'officelist': '/sys/office/v1/list',
	'officeTree': '/sys/office/v1/tree',
	'characterlist': '/sys/role/v1/list',
	'saveCharacter': '/sys/role/v1/save',
	'deleteCharacter': '/sys/role/v1/delete',
	'saveUserInfo': '/personalPanel/v1/save',
	'validateOldPassword': '/personalPanel/v1//valid/password',
	'getUserInfo': '/personalPanel/v1/info',
	'getFeelist': '/jc/fee/v1/list',
	'saveFeeChange': '/jc/fee/v1/save',
	'deleteFee': '/jc/fee/v1/delete',
	'getSingleFee': '/jc/fee/v1/info',
	'getArealist': '/jc/territory/v1/list',
	'getSingleCharacter': '/sys/role/v1/info/',
	'saveUserChanges': '/sys/user/v1/save',
	'deleteOrganization': '/sys/office/v1/delete',
	'saveOffice': '/sys/office/v1/save',
	'getSingleOffice': '/sys/office/v1/info',
	'getAreaTree': '/jc/territory/v1/tree',
	'selectAreaData': '/jc/territory/v1/select',
	'getMenulist': '/sys/menu/v1/list',
	'saveMenuChanges': '/sys/menu/v1/save',
	'getSingleMenudata': '/sys/menu/v1/info',
	'deleteMenu': '/sys/menu/v1/delete',
	'getMenuTree': '/sys/menu/v1/tree',
	'mtUserManage': '/mt/muser/v1/list',
	'singleMtUser': '/mt/muser/v1/getPermission',
	'permissionState': '/mt/muser/v1/set',
	'dictionaryList': '/sys/dict/v1/list',
	'deleteDictionary': '/sys/dict/v1/delete',
	'getSingleDic': '/sys/dict/v1/info',
	'saveDicChanges': '/sys/dict/v1/save'
}

const getParamHandler = param => {
	let baseStr = '?'
	for(let i in param){
		baseStr += `${i}=${param[i]}&`
	}
	return param === {} ? '' : baseStr
}
const postParamHandler = param => {
	let baseStr = ''
	for(let i in param){
		baseStr += `/${param[i]}`
	}
	return baseStr
}

const setPort = path => path.indexOf('mt') === 1 || path.indexOf('sys') === 1 || path.indexOf('personalPanel') === 1 ? 
	path === '/sys/dict/v1/list' || path === '/sys/dict/v1/delete' || path === '/sys/dict/v1/info' || path === '/sys/dict/v1/save' ? '8095' : '8099' : '8095'

exports.proxy = (res, param) => {
	new Promise((reslove, reject) => {
		let body = ''
		let fnParam = param.params ? JSON.parse(param.params) : {}
		let req = http.request(Object.assign({
				port: setPort(pathList[param.path])
			}, opt, param.path ? {
				path: param.type === 'url' ? `${pathList[param.path]}${postParamHandler(fnParam)}` : param.method === 'GET' ?`${pathList[param.path]}${getParamHandler(fnParam)}` : pathList[param.path],
				method: param.method ? param.method : 'GET',
				headers: {
					'Cookie': cookie
				}
			} : {}, param.method === 'POST' && param.type === 'normal' ? {
				headers:{
                  	'Content-Type': param.path === 'saveDicChanges' ? 'application/json' : 'application/x-www-form-urlencoded',
					'Cookie': cookie
				}
			} : {}), res => {
				console.log(param.path)
				console.log(setPort(pathList[param.path]))
				console.log("Got response: " + res.statusCode);
				res.on('data', d => {
				  	body += d;
				}).on('end', _ => {
				  	reslove(body)
				});
			}).on('error', e => {
			  console.log("Got error: " + e.message);
			})

		param.method === 'POST' && param.type === 'normal' ? req.write(param.path === 'saveDicChanges' ? JSON.stringify(fnParam) : querystring.stringify(fnParam)) : null

		req.end();
	}).then(body => {
	    res.writeHead(200, {"Content-type": "text/plain"});
	    res.write(body);
	    res.end();
	})
}

exports.login = (res, param) => 
	new Promise((reslove, reject) => {
		var body = ''
		var fnParam = getParamHandler(JSON.parse(param.params))
		console.log(`${loginOpt.path}${fnParam}`)
		var req = http.request(Object.assign({}, loginOpt, {
			path: `${loginOpt.path}${fnParam}`
		}), res => {
			console.log("Got response: " + res.statusCode);

			res.on('data', d => {
			  	body += d;
			}).on('end', _ => {
			  	reslove(body)
			});

		}).on('error', e => {
		 	console.log("Got error: " + e.message);
		})
		req.end();
	})
	.then(body => 
		new Promise((reslove, reject) => {
			console.log(body)
			var redirectBody = ''
			var urlObj = url.parse(JSON.parse(body).data)
			var option = {
				hostname: urlObj.hostname,
				port: urlObj.port,
				method:'GET',
				path: urlObj.path
			}
			var redirectReq = http.request(option, res => {
				console.log(res.headers['set-cookie'])
				cookie = res.headers['set-cookie'][0].split(';')[0]
				cookie && cookie != '' ? reslove(cookie) : reject()
			}).on('error', e => {
			 	console.log("Got error: " + e.message);
			})
			redirectReq.end();
		}))
	.then(cookie => {
		res.writeHead(302, {"Content-type": "text/plain", "location": 'http://192.168.1.104:8098/dist/index.html', 'set-cookie': `${cookie};path=/`});
	    res.end();
	})