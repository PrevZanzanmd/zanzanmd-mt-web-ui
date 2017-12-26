var http = require('http')
	querystring = require('querystring')
	url = require('url')
	qs = require('qs')

let cookie = ''

let opt = {
	hostname: 'mt.qdxiao2.com'
	// hostname: 'm.zanzanmd.cn'
}



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

exports.proxy = (res, param, header) => new Promise((reslove, reject) => {
	let body = ''
	header.authorization ? opt.headers = {
		'Authorization': header.authorization
	} : null

	let fnParam = param.param ? JSON.parse(param.param) : {}
console.log(param.json == 'false' ? true : false)
	let req = http.request(Object.assign({}, opt, {
			method: param.method,
			path: param.type === 'normal' ? param.method === 'GET' ? `${param.path}${getParamHandler(fnParam)}` : param.path : `${param.path}${postParamHandler(fnParam)}`
		}, param.method === 'POST' ? {
			headers: Object.assign({}, opt.headers ? opt.headers : {}, param.json == 'true' ? {'Content-Type': 'application/json'} : {'Content-Type': 'application/x-www-form-urlencoded'})
		} : opt.headers ? {headers: opt.headers} : {}), res => {
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

	param.method === 'POST' && param.type === 'normal' ? req.write(param.json == 'true' ? JSON.stringify(fnParam) : querystring.stringify(fnParam)) : null

	req.end();
}).then(body => {
    res.writeHead(200, {"Content-type": "text/plain"})
    res.write(body)
	res.end()
})