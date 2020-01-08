import { indexChild } from './enter'

// 系统的主页【勿动】
export const indexRouter = indexChild

// 公共页面
export const comRouter = [{
    path: '/index2',
    name: 'index2',
    meta: {
        title: '登录'
    },
    component: () => import("@/view/index.vue")
}]

// 用户页面
export const useRouter = [
	{
	    path: '/index3',
	    name: 'index3',
	    meta: {
	        title: '登录'
	    },
	    component: () => import("@/view/index.vue")
	},{
	    path: '/workStatus',
	    name: 'workStatus',
	    meta: {
	        title: '工作情况'
	    },
	    component: () => import("@/view/workStatus.vue")
	},{
	    path: '/detail',
	    name: 'detail',
	    meta: {
	        title: '详细情况'
	    },
	    component: () => import("@/view/detail.vue")
	},{
	    path: '/detail2',
	    name: 'detail2',
	    meta: {
	        title: '详细情况2'
	    },
	    component: () => import("@/view/detail2.vue")
	}
]

// 错误页面【勿动】
export const errorRouter = [
    {
        path: '/401',
        name: 'error401',
        meta: {
            title: '401'
        },
        component: () => import("@/frame/error/401.vue")
    },
    {
        path: '/500',
        name: 'error500',
        meta: {
            title: '500'
        },
        component: () => import("@/frame/error/500.vue")
    },
    {
        path: '*',
        name: 'error404',
        meta: {
            title: '404'
        },
        component: () => import("@/frame/error/404.vue")
    }
]