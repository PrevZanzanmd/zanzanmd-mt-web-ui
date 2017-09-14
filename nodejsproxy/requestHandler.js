var http = require('http')
	querystring = require('querystring')
	url = require('url')

let cookie = ''

let opt = {
	hostname: 'zanzanmd.sssvip4.natapp.cc'
}
let loginOpt = {
	hostname:'zanzanmd.sssvip4.natapp.cc',
	method:'POST',
	path: '/api-auth/auth/v1/login',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
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

exports.proxy = (res, param) => new Promise((reslove, reject) => {
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
    res.writeHead(200, {"Content-type": "text/plain"})
    res.write(body)
	res.end()
})

exports.login = (res, param) => new Promise((reslove, reject) => {
	let body = ''
	let fnParam = {username: 'admin', password: '123456'}
	// let fnParam = param.param ? JSON.parse(param.param) : {}
	let req = http.request(loginOpt, res => {
			console.log("Got response: " + res.statusCode);
			res.on('data', d => {
			  	body += d;
			}).on('end', _ => {
			  	reslove(body)
			});
		}).on('error', e => {
		  console.log("Got error: " + e.message);
		})
	req.write(querystring.stringify(fnParam))
	req.end();
})
.then(body => opt = Object.assign(opt, {headers: {'Authorization': JSON.parse(body).data}}))
.then(opt => {
	res.writeHead(302, {"Content-type": "text/plain", 'location': 'http://192.168.1.113:8096/dist/index.html'})
	res.end()
})






