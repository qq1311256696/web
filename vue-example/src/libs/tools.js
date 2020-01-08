/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2018-08-27
 * @description 对数组的一系列处理
 */

/**
 * @param {arr} Array 目标数组
 * @param {fn} function 目标数组处理后回调
 * @param {sort} Bool 目标数组从0->length还是从length->0 默认：false
 * @description 得到目标数组的遍历结果,目标数组的元素为 Number 或 String
 * @example forEach([111,222],(item,index,array)=>){})
 * @return  111,0,[111,222]、222,1,[111,222]
 */
