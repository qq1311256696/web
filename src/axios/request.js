import Axios from 'axios'
import { errorResponse } from './response'
import { getCookie } from '@/libs/cache'
const request = Axios

// 添加请求拦截器
request.interceptors.request.use((config) => {
    if (!config.url.includes('/login')){
        config.headers['author'] = "maxiaoqu";
        config.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
        // TODO: 服务走网关时请求认证
        config.headers['Authorization'] = getCookie('token');
    }
    if (config.url.includes('.json')) config.baseURL = ''
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(res => {
    let { data } = res
    if (data.data === '') return {success: false, data: "暂无数据"}
    if (res.status !== 200) return false
    return data;
},error => {
	let errorMessage = {}
		errorMessage = errorResponse(error)
	return Promise.reject(errorMessage);
});

export default request