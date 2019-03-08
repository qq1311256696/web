/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2018-08-27
 * @description 对数组的一系列处理
 */
import { arrForEach, objEqual } from "./datatype"
import { indexName } from './router'

export const showTitle = (item, vm) => {
    return item.meta.title
}

/**
 * @param {routers} Array 目标数组---路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
        let item = routers[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children)
            if (res.name) return res
        } else {
            if (item.name === indexName) homeRoute = item
        }
    }
    return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
}

/**
 * @param {item} Array 目标数组---路由列表数组
 * @description 判断路由中是否存在子菜单
 */
export const hasChild = item => {
    return item.children && item.children.length !== 0
}

/**
 * @param {list} Array 目标数组---路由列表数组
 * @description 通过路由列表得到菜单列表
 */
export const getMenuByRouter = list => {
    let res = []
    arrForEach(list, item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if (hasChild(item)) {
                obj.children = getMenuByRouter(item.children)
            }
            if (item.meta && item.meta.href) obj.href = item.meta.href
            res.push(obj)
        }
    })
    return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array} 当前路由的书签
 */
export const getBreadCrumbList = (route, homeRoute) => {
	let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
	let routeMetched = route
	if (routeMetched && routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
	let res = routeMetched.filter(item => {
		return item.meta === undefined || !item.meta.hideInBar
	}).map(item => {
		let meta = { ...item.meta }
		if (meta.title && typeof meta.title === 'function') {
			meta.__titleIsFunction__ = true
			meta.title = meta.title(route)
		}
		let obj = {
			icon: (item.meta && item.meta.icon) || '',
			name: item.name,
			meta: meta
		}
		return obj
	})
	res = res.filter(item => {
		return !item.meta.hideInMenu
	})
	return [{ ...homeItem, to: homeRoute.path }, ...res]
}

/**
 * @param {Array} list 路由数组
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
}

/**
 * @description 每个元素只包含路由原信息中的name, path, meta三项
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
        callback(i)
    }
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
    let res = {}
    if (list.length === 2) {
        res = getHomeRoute(list)
    } else {
        const index = list.findIndex(item => routeEqual(item, route))
        if (index === list.length - 1) res = list[list.length - 2]
        else res = list[index + 1]
    }
    return res
}

/**
 * @description 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
        if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
}

/**
 * @description 处理二级以下的路由
 */
export const getRouterFormatObj = (formatRouter) => {
	let roterObj = {}
	formatRouter.forEach((item,index) => {
		let children = item.children
		if(children && children.length>0){
			children.forEach((child,index2) => {
				let grandson = child.children
				if(grandson && grandson.length>0) roterObj[child.name] = grandson
			})
		}
	})
	return roterObj
}
