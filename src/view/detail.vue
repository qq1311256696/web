<template>
	<div class="detail">
		<Head :show="show" :title="title"></Head>
		<div class="title"> 
			输变电检修工作详细信息
			<span>甘特图</span>
		</div>
		<div class="table">
			<van-row class="head">
			  	<van-col span="2">序号</van-col>
			  	<van-col span="6">工作站</van-col>
			  	<van-col span="4">开始时间</van-col>
			  	<van-col span="4">结束时间</van-col>
			  	<van-col span="4">类别</van-col>
			  	<van-col span="4">设备名</van-col>
			</van-row>
			<div class="body">
				<van-row class="tablecon" v-for="(item,index) in list" :key="index">
				  	<van-col span="2">{{item.order}}</van-col>
				  	<van-col span="6">{{item.station}}</van-col>
				  	<van-col span="4">{{item.start}}</van-col>
				  	<van-col span="4">{{item.end}}</van-col>
				  	<van-col span="4">{{item.type}}</van-col>
				  	<van-col span="4">{{item.name}}</van-col>
				</van-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { Row,Col,Button } from 'vant';
	import Head from './component/head.vue';
	export default {
		components: {
			Head,
			[Row.name]: Row,
			[Col.name]: Col,
	        [Button.name]: Button
	    },
		data(){
			return {
				show:true,
	           	title:'详细信息',
				list: [
					{order:'01',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},	
	            	{order:'02',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'03',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'04',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'05',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'06',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'07',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'08',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'09',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'10',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'},
	            	{order:'11',station:'滨海站#1',start:'01/12',end:'01/15',type:'检修',name:'母线'}
	            ]	
			}
		},
		methods:{
			back(){
	       		this.$router.push('workStatus')
	       	}
		}
	}
</script>

<style lang="less">
	.detail{
		height:100%;
		width:100%;
		background:#1B1E2A;
		.title{
			margin-top:40px;
			font-size: 14px;
		    color: #7790AF;
		    text-align: left;
		    padding: 0 10px;
		    height: 34px;
		    line-height: 34px;
		    margin-left: 20px;
		    span{
		    	margin-left: 22%;
    			background: #EB544D;
    			padding: 4px 14px;
    			color: #DAE2EB;
    			border-radius: 20px;
		    }
		}
		.table{
			height:87%;
			.head{
				font-size:14px;
				background: #222432;
	    		padding: 7px 0;
			}
			.body{
				height: 95%;
	    		overflow-y: auto;
	    		.tablecon{
					font-size: 14px;
				    padding: 18px 0;
				    border-bottom: 1px solid #2D3F61;
				    color: #DAE2EB;
				}
			}
		}
		.back{
			text-align: left;
	    	margin-left: 20px;
	    	.van-button--normal{
				font-size: 14px;
			    margin: 5px 2px;
			    width: 84px;
			    height: 24px;
			    line-height: 24px;
			    padding: 0;
			}
			.van-button--primary{
				color: #5D718C;
			    background-color: #232837;
			    border: 1px solid #2D3F61;
			}
		}
	}
</style>