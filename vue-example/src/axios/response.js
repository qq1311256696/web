import { removeAllCookie, removeAllSession, removeAllLocal } from '@/libs/cache'

// 处理用户过期
const clearUserMge = res => {
	const therouter = window.location.pathname.split("/")
    const index = (therouter.length-1)*1
    const router = therouter[index]
	if(router != "login" && res.status == "401"){
		const message = '【'+res.status+'】'+res.data
		const title = '提示';
		const content = '<p>'+message+'</p>';
		Modal.error({
	        title: title,
	        content: content,
	        onOk: () => {
	            removeAllCookie()	// 移除前段的缓存
				removeAllSession()	// 移除前段的缓存
				removeAllLocal()	// 移除前段的缓存
				window.open(window.origin+'/login','_self')
	        },
	        onCancel: () => {
	            removeAllCookie()	// 移除前段的缓存
				removeAllSession()	// 移除前段的缓存
				removeAllLocal()	// 移除前段的缓存
				window.open(window.origin+'/login','_self')
	        }
		})
	}else{
		Message.error(res.data);
	}
}

export const errorResponse = error => {
	let errorMessage = {}
		errorMessage.success = false
	let status = null
	if (error && error.response) {
		status = error.response.status
		errorMessage.status = status
		if(!error.response.data){
			errorMessage.error = 'web_message_error'
			errorMessage.data = null
		}else{
			errorMessage.error = error.response.data.error
			if(error.response.data.exception) errorMessage.data = error.response.data.exception
			if(error.response.data.message) errorMessage.message = error.response.data.message
			if(error.response.data.data) errorMessage.data = error.response.data.data
			if(error.response.data.error_description) errorMessage.data = error.response.data.error_description
		}
	}
	switch (status) {
		case 400:
		if(!errorMessage.data) errorMessage.data = '请求错误.'
		break
		
		case 401:
			errorMessage.data = '当前会话已失效,请重新登录.'
		break
		
		case 403:
		if(!errorMessage.data) errorMessage.data = '拒绝访问.'
		break

		case 404:
		if(!errorMessage.data) errorMessage.data = '请求地址出错'
		break

		case 408:
		if(!errorMessage.data) errorMessage.data = '请求超时.'
		break

		case 500:
		if(!errorMessage.data) errorMessage.data = '服务器内部错误.'
		break

		case 501:
		if(!errorMessage.data) errorMessage.data = '服务未实现.'
		break

		case 502:
		if(!errorMessage.data) errorMessage.data = '网关错误.'
		break

		case 503:
		if(!errorMessage.data) errorMessage.data = '服务不可用.'
		break

		case 504:
		if(!errorMessage.data) errorMessage.data = '网关超时.'
		break

		case 505:
		if(!errorMessage.data) errorMessage.data = 'HTTP版本不受支持.'
		break
		
		default:
		if(!errorMessage.data) errorMessage.data = '未知错误.'
		break
	}
	clearUserMge(errorMessage)
	return errorMessage
}