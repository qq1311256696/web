<template>
	<div class="index">
		<Head :show="show" :title="title"></Head>
		<div class="back" >返回</div>
		<van-tabs v-model="tab" @click="onClick" :line-width="105">
			<van-tab title="输变电检修工作"></van-tab>
			<van-tab title="输变电检修计划"></van-tab>
			<van-tab title="发电设备检修"></van-tab>
			<indexCon :tabTitle="tabTitle" :tabNum="tabNum" @workStatus='workStatus' :data="data"></indexCon>
		</van-tabs>
	</div>
</template>

<script>
	import { Row,Col,Tab,Tabs,RadioGroup,Radio } from 'vant';
	import Head from './component/head.vue';
	import indexCon from './component/indexCon.vue';
	export default {
		components: {
			Head,
			indexCon,
			[Row.name]: Row,
			[Col.name]: Col,
			[Tab.name]: Tab,
	        [Tabs.name]: Tabs,
	        [RadioGroup.name]: RadioGroup,
	        [Radio.name]: Radio
	    },
		data(){
			return {
				tab: '输变电检修工作',
	           	tabTitle:'输变电检修工作',
	           	tabNum:0,
	           	data: {},
	           	show:false,
	           	socket: null,
	           	title:'检修管理'
			}
		},
		methods:{
			output(message) {
				console.log(message)
			},
			onClick(index, title) {
		    	//console.log(index,title)
		    	this.tabNum = index;
		    	this.tabTitle = title;
		  	},
			workStatus(){
				this.$router.push('workStatus')
			}
		},
		created() {// 在页面created的时候去调用_getLess方法，require动态获取less，如果在项目内改变了皮肤，此时less已经加载完了，所以不会生效
		    this._getLess("index");
		},
	}
</script>
<style lang="less">
	/*@import "../assets/style/index.less";*/
	.back{
		color: white;
	    position: absolute;
	    top: 10px;
	    left: 15px;
	    z-index: 99999;
	}
</style>