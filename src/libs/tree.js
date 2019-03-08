/**
 * @author maxiaoqu(杨正炳：maxiaoqu@vip.qq.com)
 * @since 2018-10-09
 * @description 对树组件、树菜单、树结构的处理
 */
// 得到树形结构【通用】
const getTree = (list, parentId, Boolean) => {
	let trees= {}
	let pid = parentId
    for (let i = 0; i < list.length; i++) {
		let key = list[i].pid
		if(list[i].id == parentId) pid = list[i].pid
		if (trees[key]) trees[key].push(list[i])
		else {
			trees[key] = []
			trees[key].push(list[i])
		}
	}
    return formatTree(trees, pid, Boolean)
}

// 递归格式化每个节点【通用】
const formatTree = (trees, parentId, Boolean) => {
	let tree = []
    if (!trees[parentId]) return tree
    for (let t of trees[parentId]) {
    	if(t.menuType && t.menuType == 0) t = getRouterBottom(t,trees, t.id)
    	else if(!t.menuType && t.menuType != 1) t.children = formatTree(trees, t.id)
        tree.push(t)
    }
    if(Boolean) return getRedirect(tree[0].children)
    else return tree
}

// 获取该路由下的按钮【路由】
const getRouterBottom = (t, trees, parentId) => {
	if(trees[parentId] && trees[parentId][0] && trees[parentId][0].menuType == 1){
		t.bottom = formatTree(trees, parentId)
		t.children = []
	}else{
		t.children = formatTree(trees, parentId)
	}
	return t
}

// 重定向树路由【路由】
const getRedirect = arr => {
	let Redirect = []
	let num = -1
	arr.forEach((item,index) => {
		if(item.children.length != 0 && item.menuType == 0){
			var one = item,two = item.children[0];
			if(item.component == "Main"){
				num = index
				one.redirect = '/'+one.path+'/'+two.path
				one.path = '/'+one.path
			}
			else one.redirect = one.path+'/'+two.path
			getRedirect(item.children)
		}
	})
	return arr
}

// 得到菜单的树结构【菜单】
const getMenu = arr => {
	let menu = []
	arr.forEach((item,index) => {
		let obj = {}
		if(item.menuType == 0){
			obj.id = item.id
			obj.pid = item.pid
			obj.path = item.routeName
			obj.name = item.routeName
			obj.component = item.component
			obj.menuType = item.menuType
			obj.uriId = item.uriId
			obj.meta = {}
			if(item.menuName) obj.meta.title = item.menuName
			if(item.icon) obj.meta.icon = item.icon
			if(item.show) obj.meta.hideInMenu = item.show==0 ? true:false
			if(item.cache) obj.meta.notCache = item.cache==0 ? true:false
		}else{
			obj = item
		}
		menu.push(obj)
	})
    return menu
}

// 得到菜单按钮【菜单对应的按钮】
const getButtom = (arr,btn) => {
	let btnArr = btn
	for (var item of arr) {
        if(item.bottom) btnArr[item.name] = item.bottom
        if(item.children && item.children.length != 0) getButtom(item.children,btnArr)
	}
	return btnArr
}

// 得到路由树结构【路由】
const getRouter = arr => {
	let list = []
	arr.forEach((item,index) => {
		let obj = {
			id: item.id,
            pid: item.pid,
            uriId: item.uriId,
            icon: item.icon,
            model: item.model,
            delMark: item.delMark,
            title: item.menuName,
            type: item.menuType,
            path: item.routeName,
            component: item.component,
            notCache: item.cache,
            hideInMenu: item.show,
            desc: item.menuOrder,
            createTime: item.createTime
		}
		list.push(obj)
	})
    return list
}

// 得到角色树结构【角色】
const getRole = arr => {
	let list = []
	arr.forEach((item,index) => {
		let obj = {
			id: item.id,
            pid: item.pid,
            icon: '',
            title: item.roleName,
            deptId: item.deptId,
            lineDeptId: item.lineDeptId,
            startUse: item.startUse,
            terminal: item.terminal,
            menuIds: item.menuIds,
            jobName:item.jobName,
			workType:item.workType
		}
		list.push(obj)
	})
    return list
}

// 得到组织树结构【组织】
const getDept = arr => {
	let list = []
	arr.forEach((item,index) => {
		let obj = {
			id: item.id,
            pid: item.pid,
            icon: '',
            title: item.deptName,
            createTime: item.createTime,
            grade: item.grade,
            showNameJson: item.showNameJson,
            elderIds: item.elderIds
		}
		list.push(obj)
	})
    return list
}

/**
 * @param {arr} Array 目标数组
 * @description 处理成树菜单
 * @example menuTree(arr)
 * @return  iview的路由结构
 */
// 平常树处理【通用】
export const listTree = arr => {
    let tree = getTree(arr,0)
    return tree
}

// 菜单树处理【菜单】
export const menuTree = arr => {
    let menu = getMenu(arr)
    let tree = getTree(menu,0,true)
    return tree
}

// 菜单树按钮处理【菜单对应的按钮】
export const buttomTree = arr => {
    let buttom = getButtom(arr,{})
    return buttom
}

// 路由树组件处理【路由】
export const routerTree = arr => {
	let menu = getRouter(arr)
    let tree = getTree(menu,0)
    return tree
}

// 角色树组件处理【角色】
export const roleTree = (arr,pid) => {
	if(!pid) pid = 0
	let menu = getRole(arr)
    let tree = getTree(menu,pid)
    return tree
}

// 组织树组件处理【组织】
export const deptTree = (arr,pid) => {
	if(!pid) pid = 0
	let menu = getDept(arr)
    let tree = getTree(menu,pid)
    return tree
}


// 级联下拉树组件处理【级联】
export const cascaderTree = (arr,arr2,params) => {
	let cascader = [],pid = 0;
	if(params.bool) cascader = [{id: '1',pid: '0',value: '0',label: '顶级分类'}]
	if(params.pid) pid = params.pid
	arr.forEach((item,index) => {
		let obj = {
			id: item.id,
            pid: item.pid,
            value: item[arr2[0]],
            label: item[arr2[1]],
            workType:item.workType,
            terminal:item.terminal,
            btnType:item.menuType
		}
		if(params.selectId == item.id) obj.disabled = true;
		if(params.disabled && item.menuType){
			if(item.menuType == params.disabled){
				obj.disabled = true;
			}
		}
		cascader.push(obj)
	})
	let cascaderTrees = getTree(cascader,pid)
	return cascaderTrees
}

// 处理级联下拉树组件回显【级联】添加
export const cascaderShow = (id,arr) => {
	let cascaderIdArr = []
//	for (var item of arr) {
//		console.log(123,item.label)
//      if(item.children && item.children.length>=1) {
//			cascaderIdArr.push(item.id)
//          cascaderShow(id,item.children)
//      }else{
//      	console.log(item.pid == id,cascaderIdArr)
//      }
//  }
	
	arr.forEach((item,index) => {
		if(item.children && item.children.length>=1){
			let arr1 = item.children
			arr1.forEach((item1,index1) => {
				if(item1.id == id) cascaderIdArr.push(item.id)
				else{
					if(item1.children.length>=1){
						let arr2 = item1.children
						arr2.forEach((item2,index2) => {
							if(item2.id == id) cascaderIdArr.push(item.id,item1.id)
							else{
								if(item2.children.length>=1){
									let arr3 = item2.children
									arr3.forEach((item3,index3) => {
										if(item3.id == id) cascaderIdArr.push(item.id,item1.id,item2.id)
										else{
											if(item3.children.length>=1){
												let arr4 = item3.children
												arr4.forEach((item4,index4) => {
													if(item4.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id)
													else{
														if(item4.children.length>=1){
															let arr5 = item4.children
															arr5.forEach((item5,index5) => {
																if(item5.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id,item4.id)
																else{
																	if(item5.children.length>=1){
																		let arr6 = item5.children
																		arr6.forEach((item6,index6) => {
																			if(item5.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id,item4.id,item5.id)
																		})
																	}
																}
															})
														}
													}
												})
											}
										}
									})
								}
							}
						})
					}
				}
			})
		}
	})
	return cascaderIdArr
}

// 处理级联下拉树组件回显【级联】
export const cascaderShowTwo = (id,arr) => {
	let cascaderIdArr = []
	arr.forEach((item,index) => {
		if(item.id == id) cascaderIdArr.push(item.id)
		else{
			if(item.children && item.children.length>=1){
				let arr1 = item.children
				arr1.forEach((item1,index1) => {
					if(item1.id == id) cascaderIdArr.push(item.id,item1.id)
					else{
						if(item1.children && item1.children.length>=1){
							let arr2 = item1.children
							arr2.forEach((item2,index2) => {
								if(item2.id == id) cascaderIdArr.push(item.id,item1.id,item2.id)
								else{
									if(item2.children && item2.children.length>=1){
										let arr3 = item2.children
										arr3.forEach((item3,index3) => {
											if(item3.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id)
											else{
												if(item3.children && item3.children.length>=1){
													let arr4 = item3.children
													arr4.forEach((item4,index4) => {
														if(item4.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id,item4.id)
														else{
															if(item4.children && item4.children.length>=1){
																let arr5 = item4.children
																arr5.forEach((item5,index5) => {
																	if(item5.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id,item4.id,item5.id)
																	else{
																		if(item5.children.length>=1){
																			let arr6 = item5.children
																			arr6.forEach((item6,index6) => {
																				if(item5.id == id) cascaderIdArr.push(item.id,item1.id,item2.id,item3.id,item4.id,item5.id,item6.id)
																			})
																		}
																	}
																})
															}
														}
													})
												}
											}
										})
									}
								}
							})
						}
					}
				})
			}	
		}
	})
	return cascaderIdArr
}

// 优化上面的
const formatCascader = (trees, parentId,arr) => {
    trees.forEach((item,index) => {
    	if(item.children && item.children.length>=1){
    		if (item.id == parentId){
    			arr.push(item.id)
    		}else{
    			formatCascader(item.children,parentId,arr)
    		}
    	}
    })
	return arr
}
export const cascaderShow2 = (id,arr) => {
	let cascaderIdArr = [],
		idArr = [];
//	arr.forEach((item,index) => {
//		if(item.children && item.children.length>=1){
//			let arr2 = item.children
//			arr2.forEach((item2,index2) => {
//				if(item2.id == id) cascaderIdArr.push(item.id)
//				else{
//					if(item2.children.length>=1){
//						let arr3 = item2.children
//						arr3.forEach((item3,index3) => {
//							if(item3.id == id) cascaderIdArr.push(item.id,item2.id)
//						})
//					}
//				}
//			})
//		}
//	})
	cascaderIdArr = formatCascader(arr,id,idArr)
	return cascaderIdArr
}