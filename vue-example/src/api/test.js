import { apiData } from '@/axios/axios'

// 得到菜单树
export const getRouter = param => {
    const config = {
        url: '/userCenter/CmMenu/listCmMenu',
        data: param,
        method: 'get'
    }
    return apiData(config)
}

// 得到权限菜单树
export const getUserRouter = param => {
    const config = {
        url: '/userCenter/CmRole/menuPermissionList',
//		url: '/userCenter/CmMenu/listCmMenu',
        data: param,
        method: 'get'
    }
    return apiData(config)
}

// 得到角色树
export const getRole = param => {
    const config = {
        url: '/userCenter/CmRole/listCmRole',
        data: param,
        method: 'get'
    }
    return apiData(config)
}

// 得到组织树
export const getDept = param => {
    const config = {
        url: '/userCenter/CmDept/listCmDept',
        data: param,
        method: 'get'
    }
    return apiData(config)
}
