/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2018-08-24
 * @description 对数组\对象、字符串等的一系列处理
 */
/**
   * @param {arr} Array 目标数组
   * @param {fn} funtion 目标数组是从大到小、从小到大
   * @description 遍历循环数组
   * @return  遍历循环数组结果以及这个数组
   */
export const arrForEach = (arr, fn) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

/**
  * @param {arr1} Array 目标数组
  * @param {arr2} Array 需要查询的数组
  * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
  * @return  bool
  */
export const arrHasOneOf = (arr1, arr2) => {
    return arr1.some(_ => arr2.indexOf(_) > -1)
}

/**
 * @param {arr} Array 目标数组
 * @description 得到目标数组的String的数字转成Number,目标数组的元素为 Number 或 String
 * @example arrNumber([111,'222','03','afsd'])
 * @return  [111,222,3,'afsd']
 */
export const arrNumber = arr => {
    if (!arr.length) return false
    arr.forEach((item,index) => {
        if(Number.isFinite(Number(item))) arr[index] = Number(item)
        else arr[index] = item
    })
    return arr
}

/**
 * @param {arr1} Array 目标数组1
 * @param {arr2} Array 目标数组2
 * @description 得到目标数组的组成的对象,目标数组的元素为 Number 或 String,且两个目标数组长度一样
 * @example forEach([k1,k2,k3,k4],[v1,v2,v3,v4])
 * @return  {k1:v1,k2:v2,k3:v3,k4:v4}
 */
export const arrObject = (arr1, arr2) => {
    if (!arr1.length || !arr2.length || (arr1.length !== arr2.length)) return false
    let obj = {}
    arr1.forEach((item,index) => {
        obj[item] = arr2[index]
    })
    return obj
}

/**
 * @param {arr} Array 目标数组
 * @param {fn} function 目标数组是从大到小、从小到大
 * @description 得到目标数组排序,目标数组的元素为 Number
 * @example arrSort([111,'222','03'],(a, b) => a - b)\arrSort([111,'222','03'],(a, b) => a - b)
 * @return  [3,111,222]\[222,111,3]
 */
export const arrSort = (arr,fn) => {
    if (!arr.length || !fn) return false
    for (let i = arr.length - 1; i > 0; i--) {
        if(!Number.isFinite(Number(arr[i]))) return false
        for (let j = 0; j < i; j++) {
            if (fn(arr[j], arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

/**
 * @param {arr} Array 目标数组
 * @param {space1} Bool 目标数组去首尾的空格符 默认：false
 * @param {space2} Bool 目标数组去所有的空格符 默认：false
 * @description 得到目标数组去空格键结果,目标数组的元素为 Number 或 String
 * @example forEach(['  111  ','   22  22  ','3  33  '],true,true)
 * @return  [111,2222,333]
 */
export const arrSpace = (arr, space1, space2) => {
    if (!arr.length) return false
    if(space1)  arr = arr.replace(/^\s*|\s*$/g,"")   // 去首尾的空格符
    if(space2)  arr = arr.replace(/\s*/g,"")         // 去所有的空格符
    return arr
}

/**
 * @param {arr1} Array 目标数组1
 * @param {arr2} Array 目标数组2
 * @description 得到两个数组的交集(共同拥有的), 两个数组的元素为数值或字符串
 * @example arrObject(['1','k2','k3','v1'],['v1','v2','1','v3','v4'])
 * @return  ['1','v1']
 */
export const arrIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}

/**
 * @param {arr1} Array 目标数组1
 * @param {arr2} Array 目标数组2
 * @description 得到两个数组的共同交集(两个数组拼接后去重), 两个数组的元素为数值或字符串
 * @example arrObject(['1','k2','k3','v1'],['v1','v2','1','v3','v4'])
 * @return  ['1','k2','k3','v1','v2','v3','v4']
 */
export const arrUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {arr} Array 目标数组
 * @param {number} Bool �目标数组中的 String 的数字转成 Number 默认：false
 * @param {repeat} Bool 目标数组去去重 默认：false
 * @param {sortar} Bool 目标数组去排序 默认：false
 * @param {fn} function 目标数组是从大到小、从小到大 默认：从小到大
 * @description 得到目标数组的转型、去重、排序的结果,目标数组的元素为 Number 或 String
 * @example forEach([1,2,3],true,true,true,(a, b) => a - b)
 */
export const arrDeal = (arr, number, repeat, sortar, fn) => {
    if (!arr.length) return false
    if(number)  arr = arrNumber(arr)                       // 将 String的数字转成 Number
    if(repeat)  arr = Array.from(new Set(arr))               // 去重
    if(sortar && !fn)  arr = arrSort(arr,(a, b) => a - b)  // 默认排序：从小到大
    if(sortar && fn)  arr = arrSort(arr,fn)                // 排序
    return arr
}

// Object的操作
/**
  * @param {obj1} Array 目标对象1
  * @param {obj2} Array 需要对象2
  * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
  * @return  bool
  */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
  * @param {obj1} Array 目标对象1
  * @param {obj2} Array 需要对象2
  * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
  * @return  bool
  */
export const objCheck = obj => {
	if(!obj) return false
	else if(Object.keys(obj).length>0) return obj
	else return false
}

/**
  * @param {obj1} Array 目标对象1
  * @param {obj2} Array 需要对象2
  * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
  * @return  bool
  */
export const objAssign = (obj1,obj2) => {
	if(objCheck(obj1) && objCheck(obj2)) return Object.assign(obj1,obj2)
	else if(objCheck(obj1)) return obj1
	else if(objCheck(obj2)) return obj2
	else return {}
}