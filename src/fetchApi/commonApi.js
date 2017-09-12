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