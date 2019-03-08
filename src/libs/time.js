/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2018-08-24
 * @description 对时间的一系列处理
 */

/**
  * @param {time} String 传入的时间戳
  * @returns {Boolean}
  */
const timeIsStamp = (time) => {
    if(!Number.isFinite(Number(time))) return false
    const timeStr = String(time)
    if(timeStr.length === 10) return Number(timeStr)*1000
    if(timeStr.length === 13) return Number(timeStr)
}

/**
  * @param {putTime} String 传入的时间戳
  * @param {nowTime} String 当前时间时间戳
  * @returns {Boolean}
  */
const timeIsEarly = (putTime, nowTime) => {
    return putTime < nowTime
}

/**
  * @param {putTime} String 传入的时间戳
  * @param {nowTime} String 当前时间时间戳
  * @returns 两个时间差
  */
const timeGetDifference = (putTime, nowTime) => {
    return Math.abs(putTime - nowTime)
}

/**
  * @param {putTime} String 传入的时间戳
  * @param {fn} function 当前时间时间戳
  * @returns 两个时间差
  */
const timeGetChecked = time => {
    if (!time || time === null || time === "") return false
    if(typeof time === 'number') return timeIsStamp(time)
    if(typeof time === 'string'){
        if(Number.isFinite(Number(time))) return timeIsStamp(time)
        if(new Date(time) == 'Invalid Date') return time
        return timeGetStamp(time)
    }
}

/**
 * @param {time} String 目标时间
 * @description 时间转化成时间戳 只支持"2014/07/10 10:21:12"、"2014-07-10 10:21:12"、"2014.07.10 10:21:12"
 * @example timeGetStamp("2014-07-10 10:21:12")
 * @return  167234234000
 */
export const timeGetStamp = time => {
    if (!time || time == null || time == "") return false
    let date = time
    date = new Date(Date.parse(date.replace(/-/g,"/",".")))
    return date.getTime()
}

/**
 * @param {time} String 目标时间
 * @param {fn} function 传的参数，时间要写成的格式
 * @description 时间转化成指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
 * @example timeGetDate(new Date(),"yyyy-MM-dd hh:mm:ss")\timeGetDate(new Date(),"yyyy年MM月dd日 hh时mm分ss秒")
 * @return  2006-07-02 08:09:04\2006年07月02日 08时09分04秒
 */
export const timeGetDate = (time, fn) => {
    /*if(timeGetChecked(time)) time = timeGetChecked(time)
    else return false*/
    if (!fn) return false
    let o = {
        "y+": time.getFullYear(),  //nian
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(),      //日
        "h+": time.getHours(),     //小时
        "m+": time.getMinutes(),   //分
        "s+": time.getSeconds(),   //秒
    }
    if(/(y+)/.test(fn)) fn = fn.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length))
    for(var k in o){
        if(new RegExp("(" + k + ")").test(fn)) fn = fn.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
    return fn;
}

/**
 * @param {time} String 目标时间
 * @description 获取当前月有几天
 * @example timeGetDay(new Date())\timeGetDay("2014-07-10 10:21:12")
 * @return  30\31
 */
export const timeGetDay = time => {
    if(timeGetChecked(time)) time = timeGetChecked(time)
    else return false
    let y = time.getFullYear()
    let m = time.getMonth()+1
    let d = new Date(y, m, 0)
    return d.getDate()
}

/**
 * @param {time} String 目标时间
 * @description 获取当前日期距离现在还有多少或超过了多少
 * @example timeGetDay(new Date())\timeGetDay("2014-07-10 10:21:12")
 * @return  拿到传入时间与当时的时差
 */
export const timeGetCountDown = time => {
    if(timeGetChecked(time)) time = timeGetChecked(time)
    else return false
    let date = {}
    let newTime = Math.floor(Date.parse(new Date()))
    let tdf = timeGetDifference(time,newTime)
    let day = Math.floor(tdf/86400000)
    let hour = Math.floor((tdf/3600000)%24)
    let min = Math.floor((tdf/60000)%60)
    let sec = Math.floor((tdf/1000)%60)
    date.isEarly = timeIsEarly(time,newTime) ? '0' : '1'
    date.day = "" + day
    date.hour = hour < 10 ? "0" + hour : "" + hour
    date.min = min < 10 ? "0" + min : "" + min
    date.sec = sec < 10 ? "0" + sec : "" + sec
    return date
}
