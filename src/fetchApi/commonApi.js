export const handleTime = time => {
	let DateTime = new Date(time)
	return `${DateTime.getFullYear()}-${DateTime.getMonth() < 10 ? `0${DateTime.getMonth()}` : DateTime.getMonth()}-${DateTime.getDate() < 10 ? `0${DateTime.getDate()}` : DateTime.getDate()}`
}

export const handleFullDate = _ => {
	let date = new Date()
	return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
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
        default: ''
	}
}

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