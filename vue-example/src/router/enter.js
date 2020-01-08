/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2019-01-14
 * @description 首页路由的配置参数，indexPath和indexName必须保持一致，而且与getRouter.js里的不能重复
 */

// 首页的path
export const indexPath = '/index'
// 首页的name
export const indexName = 'index'
// 首页展现在的位置
export const indexHome = 'Main'
// 首页指向的路由
export const indexChild = [
	{
	    path: indexPath,
	    name: indexName,
	    meta: {
	        title: '首页',
	        hideInMenu: true,
	        icon: 'ios-book'
	    },
	    component: () => import("@/view/index.vue")
	}
]
