import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
 import { mapState, mapGetters, mapMutations } from 'vuex'

Vue.prototype.$echarts = echarts

Vue.use(iView)
Vue.config.productionTip = false
//this.$store.getters.token
Vue.mixin({
    computed: {
		...mapGetters([
			'templates',
			'isLoadTemp'
		]),
    },
		created() {// 进入页面
			if (!this.$store) {
				return;
			}
    	if (!this.$store.getters.isLoadTemp) {
    		var theme = localStorage.theme;// 从缓存拿到皮肤的设置
			if(theme) {
				console.log(1)
	            this.templatesMu(theme);// 如果有的话， 设置皮肤
	            this.isLoadTempMu(true);// 如果有的话， 设置皮肤
			}
    	}
	},
    methods: {
        ...mapMutations([
			'templatesMu',
			'isLoadTempMu'
        ]),
        //每一个页面通过这个方法取得less文件，templates为设置的皮肤
        _getLess(filename) {
        	// 用require取到的样式文件只能刷新页面才能生效
			return require("./assets/style" + this.templates +  "/" + filename + ".less");
		},
    },
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')