var http = require('http')
	querystring = require('querystring')
	url = require('url')

let cookie = ''

const opt = {
	hostname: 'zanzanmd.sssvip4.natapp.cc',
	headers: {
		'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MDQ5MjI5MTY3ODIsImV4cCI6MTUwNTAwOTMxNn0.yZjAFOirbdQTqXtB9M8FCmKsStZaDfHudo1lG1qAUaTHa7OM-60GXLhxhAr_kEjxiTIfQ0ySy1gwlu87lpBUXg'
	}
}
const loginOpt = {
	hostname:'192.168.1.109',
	port: '8099',
	method:'GET',
	path: '/customLogin'
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

exports.proxy = (res, param) => {
	new Promise((reslove, reject) => {
		let body = ''
		let fnParam = param.param ? JSON.parse(param.param) : {}
		let req = http.request(Object.assign({}, opt, {
				method: param.method,
				path: param.type === 'normal' ? param.method === 'GET' ? `${param.path}${getParamHandler(fnParam)}` : param.path : `${param.path}${postParamHandler(fnParam)}`
			}, param.method === 'POST' ? {
				headers: Object.assign({}, opt.headers, {'Content-Type': 'application/x-www-form-urlencoded'})
			} : {}), res => {
				console.log(param.path)
				console.log("Got response: " + res.statusCode);
				res.on('data', d => {
				  	body += d;
				}).on('end', _ => {
				  	reslove(body)
				});
			}).on('error', e => {
			  console.log("Got error: " + e.message);
			})

		param.method === 'POST' && param.type === 'normal' ? req.write(querystring.stringify(fnParam)) : null

		req.end();
	}).then(body => {
	    res.writeHead(200, {"Content-type": "text/plain"});
	    res.write(body);
	    res.end();
	})
}