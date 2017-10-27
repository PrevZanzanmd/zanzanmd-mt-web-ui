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

export const getTime = _ => {
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay(); //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();
	//格式化日期：yyyy-MM-dd
	function formatDate(date) {
	    var myyear = date.getFullYear();
	    var mymonth = date.getMonth() + 1;
	    var myweekday = date.getDate();
	    if (mymonth < 10) {
	        mymonth = "0" + mymonth;
	    }
	    if (myweekday < 10) {
	        myweekday = "0" + myweekday;
	    }
	    return (myyear + "-" + mymonth + "-" + myweekday);
	}
	//获得某月的天数
	function getMonthDays(myMonth) {
	    var monthStartDate = new Date(nowYear, myMonth, 1);
	    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	    return days;
	}
	//获得本季度的开始月份
	function getQuarterStartMonth() {
	    var quarterStartMonth = 0;
	    if (nowMonth < 3) {
	        quarterStartMonth = 0;
	    }
	    if (2 < nowMonth && nowMonth < 6) {
	        quarterStartMonth = 3;
	    }
	    if (5 < nowMonth && nowMonth < 9) {
	        quarterStartMonth = 6;
	    }
	    if (nowMonth > 8) {
	        quarterStartMonth = 9;
	    }
	    return quarterStartMonth;
	}

	//获得本周的开始日期
	function getWeekStartDate() {
	    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	    return formatDate(weekStartDate);
	}
	//获得本周的结束日期
	function getWeekEndDate() {
	    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	    return formatDate(weekEndDate);
	}
	//获得上周的开始日期
	function getLastWeekStartDate() {
	    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
	    return formatDate(weekStartDate);
	}
	//获得上周的结束日期
	function getLastWeekEndDate() {
	    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	    return formatDate(weekEndDate);
	}
	//获得本月的开始日期
	function getMonthStartDate() {
	    var monthStartDate = new Date(nowYear, nowMonth, 1);
	    return formatDate(monthStartDate);
	}
	//获得本月的结束日期
	function getMonthEndDate() {
	    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	    return formatDate(monthEndDate);
	}
	//获得上月开始时间
	function getLastMonthStartDate() {
	    var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	    return formatDate(lastMonthStartDate);
	}
	//获得上月结束时间
	function getLastMonthEndDate() {
	    var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	    return formatDate(lastMonthEndDate);
	}
	//获得本季度的开始日期
	function getQuarterStartDate() {
	    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
	    return formatDate(quarterStartDate);
	}
	//或的本季度的结束日期
	function getQuarterEndDate() {
	    var quarterEndMonth = getQuarterStartMonth() + 2;
	    var quarterStartDate = new Date(nowYear, quarterEndMonth,
	            getMonthDays(quarterEndMonth));
	    return formatDate(quarterStartDate);
	}

	return {
		Ws: getLastWeekStartDate(),
		We: getLastWeekEndDate(),
		Ms: getLastMonthStartDate(),
		Me: getLastMonthEndDate(),
		Y: formatDate(new Date(now.setTime(now.getTime()- 24 * 60 * 60 * 1000)))
	}

}

export const handleThreeMonthBill = sD => {
	let D = new Date(),
	Y = D.getFullYear(),
	M = D.getMonth() - 2,
	Day = D.getDate(),
	H = D.getHours(),
	Minute = D.getMinutes(),
	S = D.getSeconds(),
	handleTimenum = num => num < 10 ? `0${num}` : num,
	tD =  new Date(`${Y}-${handleTimenum(M)}-${handleTimenum(Day)} ${handleTimenum(H)}:${handleTimenum(Minute)}:${handleTimenum(S)}`)
	return new Date(sD) - tD < 0 ? false : true
}

















