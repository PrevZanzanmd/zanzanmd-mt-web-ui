import { message } from 'antd'

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
        case '中国光大银行(63030000)':
        case '光大银行': return 'guangdabank'
        case '招商银行': return 'zhaoshangbank'
        case '平安银行（借记卡）':
        case '平安银行股份有限公司':
        case '平安银行': return 'pinganbank'
        case '上海银行': return 'shanghaibank'
        case '兴业银行': return 'xingyebank'
        case '广发银行股份有限公司':
        case '广发银行': return 'guangfabank'
        case '中信银行': return 'zhongxinbank'
        case '邮政储蓄银行': return 'youzhengbank'
        case '青岛银行': return 'qingdaobank'
        case '青岛农商银行': return 'qingdaonongshangbank'
        case '华夏银行': return 'huaxiabank'
        case '浦东发展银行': return 'pufabank'
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

export const throwError = data => {
	switch(data.code){
		case '60001': message.error('修改失败');break
		case '60002': message.error('数据调取失败，请稍后再试');break
		case '60003': message.error('账号信息异常,请联系客服提交异常信息');break
		case '60005': message.error('验证码错误');break
		case '60008': message.error('实名认证失败');break
		case '60009': message.error('密码认证失败');break
		case '60010': message.error('验证码发送失败，请检查网络连接是否正常');break
		case '60011': message.error('手机未被注册');break
		case '60013': message.error('请先选择店铺');break
		case '60014': message.error('请输入商家用户');break
		case '60015': message.error('⼿机号码已被注册，请修改后再试');break
		case '60016': message.error('该店铺已存在');break
		case '60017': message.error('请添加银行卡');break
		case '60018': message.error('当日已提现，不能重复提现');break
		case '60019': message.error('不在提现时间');break
		case '60020': message.error('提现失败');break
		case '60022': message.error('今日已提现');break
		case '60023': message.error('获取数据出错，请稍后再试');break
		case '60026': message.error('持卡人信息错误，请重新核对信息');break
		case '60027': message.error('手机号错误，请输入正确的手机号');break
		case '60028': message.error('银行卡信息错误，请核对后再试');break
		case '60029': message.error('申请充值金失败');break
		case '60030': message.error('保存失败，请稍后再试');break
		case '60031': message.error('优惠券已过期，不能进行此操作');break
		case '60032': message.error('请勿重复操作');break
		case '60033': message.error('对不起，系统开小差了,请稍后再试');break
		case '60034': message.error('该身份证号已经绑定账号，请勿重复绑定');break
		case '60035': message.error('删除失败，请稍后再试');break
		case '60038': message.error('余额不足');break
		case '60039': message.error('当前交易状态⽆法退款');break
		case '60040': message.error('邀请码错误，请核对后再试');break
		case '60041': message.error('请先添加店铺');break
		case '60042': message.error('请勿修改相同手机号');break
		case '60044': message.error('退款失败');break
		case '60045': message.error('正在退款…');break
		case '60046': message.error('店铺账号不能为手机号');break
		case '40050': message.error('账号已存在');break
		case '40010': message.error('发送验证码过于频繁，请两小时后再试');break
		case '60048': message.error('新旧密码相同，请重新设置');break
		case '40001':
		case '40002':
		case '40003':
		case '40008':
		case '60012':
		case '40009': break
		default: message.error('操作失败！');break
	}
}

















