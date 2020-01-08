import router from './routers'
import { indexName } from './enter'
import { comRouter, indexRouter, useRouter, errorRouter } from './getRouter'

// 添加参数，避免多次循环导致的错误
var getRouters
// 当前路由的标题
const routersTitle = title => {
	title = title || '输电线路数字化APP';
    window.document.title = title
}
// 合并当前所有的路由
const newRouters = (to, next, getrouter) => {
    const routerArr = comRouter.concat(getRouters).concat(indexRouter).concat(errorRouter)
    router.addRoutes(routerArr) //动态添加路由
    global.antRouter = routerArr //将路由数据传递给全局变量，做侧边栏菜单渲染工作
    next({ ...to,
        replace: true
    })
}

// 路由跳转之前
router.beforeEach((to, from, next) => {
	if(!getRouters){
        getRouters = useRouter
        newRouters(to, next)
    }
	routersTitle(to.meta.title)
    if (to.path === '' || to.path === '/') {
        next({
            path: indexName
        })
        return
    }else {
        next()
        return
    }
})
// 路由跳转之后
router.afterEach((to, from) => {
    window.scrollTo(0, 0)
})

export default router