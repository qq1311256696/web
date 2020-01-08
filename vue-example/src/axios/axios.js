import request from './request'
import { getCookie } from '@/libs/cache'
import baseURL from './url'
import qs from 'qs'

const axios = request

// 打包时ip配置【勿动】
const uri = baseURL.dip

// 检查普通回调的请求
const checkData = (method,params,isFile) => {
    if(method === "get" || method === "delete") params = {params: params}
    else params = qs.stringify(params)
    if(!isFile && (method === "post" ||  method === "put")) axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    else if(isFile) axios.defaults.headers['Content-Type'] = 'multipart/form-data;charset=utf-8'
    else axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return params
}

// 检查直接返回的请求
const checkConfig = (config) => {
    if(config.method === "post"){
        config.data = qs.stringify(config.data)
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }else{
        config.params = config.data
        axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return config
}
// 前端【照片、音频、视频】回显
// 案例：fileUrl(后台接口返回的路径)
export const fileUrl = (fileUri)=>{
	let imgUrl = ''
	imgUrl = uri+'/zuul/imgurl'+fileUri+'?access_token='+getCookie("token").split(' ')[1]
	return imgUrl
}

// 静态资源Json文件请求
export const getJson = (action)=>{
    return new Promise((resolve, reject) => {
        axios.get(action).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// 数据回调请求
export const callData = (action,method,params)=>{
	action = '/zuul'+ action
    params = checkData(method,params,false)
    return new Promise((resolve, reject) => {
        axios[method](action,params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// 文件回调请求
export const fileData = (action,method,params)=>{
	action = '/zuul'+ action
    //params = checkData(method,params,false)
    return new Promise((resolve, reject) => {
        axios[method](action,params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// 数据直接请求
export const apiData = (config)=>{
	config.url = '/zuul'+ config.url
    config = checkConfig(config)
    return axios.request(config)
}