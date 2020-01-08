export default {
    state: {
    	templates: "1",	
    	isLoadTemp: false
    },
    getters: {
        templates(state) {
            return state.templates;
          },
          isLoadTemp(state) {
          	return state.isLoadTemp;
          }
    },
    mutations: {
//  	commit(state) {
//  		this.state = state
//  	},
		isLoadTempMu(state, val) {
			if (val) {
              state.isLoadTemp = val;
            }
		},
        templatesMu(state, val) {
            if (val) {
              state.templates = val;// 改变vuex中的templates为设置的皮肤
            }
        },
    },
    actions: {
    
    }
}