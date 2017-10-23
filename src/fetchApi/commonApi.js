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

export const getBankType = code => {
	switch(code){
		case '622760': return 'zhongguobank'
        case '458123': return 'jiaotongbank'
        case '552599': return 'nongyebank'
        case '436742': return 'jianshebank'
        case '622230': return 'gongshangbank'
        case '528948': return 'minshengbank'
        case '406254': return 'guangdabank'
        case '545947': return 'zhaoshangbank'
        case '622848': return 'nongyebank'
        default: return 'defaultBank'
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