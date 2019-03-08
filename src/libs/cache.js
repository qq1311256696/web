/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2018-08-23
 * @description 对Cookies\sessionStorage\localStoragel一系列处理
 */

import Cookies from 'js-cookie'
// 检查是否操作成功并回调
const checkCache = (num,name,boll) => {
    let cache = null
    if(num===1) cache = Cookies.get(name)
    else if(num===2) cache = sessionStorage.getItem(name)
    else if(num===3) cache = localStorage.getItem(name)
    else cache = null
    if (cache) return cache
    else if (!cache && boll) return true
    else return false
}
/*
* Cookie的操作
*/
// 记录Cookie
export const setCookie = (name, data) => {
    if(!name) return false
    Cookies.set(name, data)
    return checkCache(1,name)
}
// 获取Cookie
export const getCookie = (name) => {
    if(!name) return false
    return checkCache(1,name)
}
// 移除Cookie
export const removeCookie = (name) => {
    if(!name) return false
    Cookies.remove(name)
    return checkCache(1,name,true)
}
// 移除所有Cookie
export const removeAllCookie = () => {
    const keys = document.cookie.match(/[^=;]+(?=\=)/g)
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
    return true
}

/*
* sessionStorage的操作
*/
// 记录sessionStorage
export const setSession = (name, data) => {
    if(!name) return false
    sessionStorage.setItem(name, data)
    return checkCache(2,name)
}
// 获取sessionStorage
export const getSession = (name) => {
    if(!name) return false
    return checkCache(2,name)
}
// 移除sessionStorage
export const removeSession = (name) => {
    if(!name) return false
    sessionStorage.removeItem(name)
    return checkCache(2,name,true)
}
// 移除所有的sessionStorage
export const removeAllSession = () => {
    sessionStorage.clear()
    if(sessionStorage.length===0) return true
}
/*
* localStorage的操作
*/
// 记录localStoragel
export const setLocal = (name, data) => {
    if(!name) return false
    localStorage.setItem(name, data)
    return checkCache(3,name)
}
// 获取localStorage
export const getLocal = (name) => {
    if(!name) return false
    return checkCache(3,name,true)
}
// 移除localStorage
export const removeLocal = (name) => {
    if(!name) return false
    localStorage.removeItem(name)
    return checkCache(3,name,true)
}
// 移除所有的localStorage
export const removeAllLocal = () => {
    localStorage.clear()
    if(localStorage.length===0) return true
}
