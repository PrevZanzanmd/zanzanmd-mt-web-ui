export const handleTime = time => {
	let D = new Date(time),
		Y = D.getFullYear(),
		M = D.getMonth() + 1,
		Day = D.getDate(),
		H = D.getHours(),
		Minute = D.getMinutes(),
		S = D.getSeconds(),
		handleTimenum = num => num < 10 ? `0${num}` : num
	return `${Y}-${handleTimenum(M)}-${handleTimenum(Day)} ${handleTimenum(H)}:${handleTimenum(Minute)}:${handleTimenum(S)}`
}

export const handleFullDate = _ => {
	let D = new Date(),
		Y = D.getFullYear(),
		M = D.getMonth() + 1,
		Day = D.getDate(),
		H = D.getHours(),
		Minute = D.getMinutes(),
		S = D.getSeconds(),
		handleTimenum = num => num < 10 ? `0${num}` : num
	return `${Y}-${handleTimenum(M)}-${handleTimenum(Day)} ${handleTimenum(H)}:${handleTimenum(Minute)}:${handleTimenum(S)}`
}

export const judgeWithDrawState = state => {
	switch(state){
		case '0': return '提现失败'
		case '1': return '提现成功'
		case '2': return '审核中'
		default: return
	}
}

export const getBankType = name => {
	switch(name){
        case '中国银行': return 'zhongguobank'
        case '交通银行': return 'jiaotongbank'
        case '农业银行': return 'nongyebank'
        case '建设银行': return 'jianshebank'
        case '工商银行': return 'gongshangbank'
        case '民生银行': return 'minshengbank'
        case '光大银行': return 'guangdabank'
        case '招商银行': return 'zhaoshangbank'
        case '平安银行': return 'pinganbank'
        case '上海银行': return 'shanghaibank'
        case '兴业银行': return 'xingyebank'
        case '广发银行': return 'guangfabank'
        case '中信银行': return 'zhongxinbank'
        case '邮政银行': return 'youzhengbank'
        case '青岛银行': return 'qingdaobank'
        case '青岛农商银行': return 'qingdaonongshangbank'
        default: return 'banklogo'
	}
}

export const trim = s => s.replace(/(^\s*)|(\s*$)/g, "")

export const fmoney = (s = s || '0', n = 2) => {  
	n = n > 0 && n <= 20 ? n : 2;  
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	let l = s.split(".")[0].split("").reverse()
	let r = s.split(".")[1];  
	let t = "";  
	for (let i = 0; i < l.length; i++) {  
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	}  
	return t.split("").reverse().join("") + "." + r;  
} 