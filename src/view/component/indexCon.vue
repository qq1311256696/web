<template>
	<div class="indexCon">
		<van-row class="tools">
		  	<van-col span="24">
		  		<van-radio-group v-model="rate">
				  	<van-radio name="1" :class="[rate==1?active:inActive]">全年</van-radio>
				  	<van-radio name="2" :class="[rate==2?active:inActive]">上月</van-radio>
				  	<van-radio name="3" :class="[rate==3?active:inActive]">本月</van-radio>
				  	<van-radio name="4" :class="[rate==4?active:inActive]">上周</van-radio>
				  	<van-radio name="5" :class="[rate==5?active:inActive]">本周</van-radio>
				</van-radio-group>
		  	</van-col>
		</van-row>
		<div class="echart">
			<div class="title">各地区{{tabTitle}}次数(次)</div>
			<div class="con" id="myChart">
				<!--折线图-->
			</div>
		</div>
		<div class="table">
			<div class="title">全年{{tabTitle}}次数</div>
			<van-row class="head">
			  	<van-col span="8">序号</van-col>
			  	<van-col span="8">电网名称</van-col>
			  	<van-col span="8">检修次数</van-col>
			</van-row>
			<div class="body">
				<van-row class="tablecon" v-for="(item,index) in list" :key="index">
				  	<van-col span="8">{{item.order}}</van-col>
				  	<van-col span="8">{{item.name}}</van-col>
				  	<van-col span="8">{{item.time}}</van-col>
				</van-row>
			</div>
		</div>
		<van-row class="btn">
		  	<van-col span="24">
		  		<div @click="workStatus">工作情况{{tabNum}}</div>
		  	</van-col>
		</van-row>
	</div>
</template>

<script>
	import { Row,Col,RadioGroup,Radio,Button  } from 'vant';
	export default {
		name:'indexCon',
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[RadioGroup.name]: RadioGroup,
	        [Radio.name]: Radio,
	        [Button.name]: Button
	    },
	    props: {
		    tabTitle: String,
		    tabNum:Number
		},
		data(){
			return {
				rate:'1',
				inActive:'inActive',
	           	active:'active',
	           	myecharts: '', //实例
	           	option: {
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['台州', '温岭', '玉环', '天台', '三门', '天台', '台州'],
				        //设置轴线的属性
	                    axisLine:{
	                        lineStyle:{
	                            color:'#778196'
	                        }
	                    } 
				    },
				    yAxis: {
				        type: 'value',
				        splitLine:{show: false},//去除网格线
				        //设置轴线的属性
	                    axisLine:{
	                        lineStyle:{
	                            color:'#778196'
	                        }
	                    } 
				    },
				    series: [{
				        data: [150, 120, 100, 150, 120, 100,100],
				        type: 'line',
				        itemStyle : {
							normal : {
								color:'#07C790',
								lineStyle:{
									color:'#07C790'
								}
							}
						},
				        areaStyle: {
				        	color: {
							    type: 'linear',
							    x: 0,
							    y: 0,
							    x2: 0,
							    y2: 1,
							    colorStops: [{
							        offset: 0, color: '#07C790' // 0% 处的颜色
							    }, {
							        offset: 1, color: '#009369' // 100% 处的颜色
							    }],
							    global: false // 缺省为 false
							}
				        }
				    }]
				},
				list: [
	            	{order:'01',name:'台州电网',time:'63'},
	            	{order:'02',name:'温岭电网',time:'60'},
	            	{order:'03',name:'台州电网',time:'62'},
	            	{order:'04',name:'台州电网',time:'65'},
	            	{order:'05',name:'台州电网',time:'63'},
	            ]
			}
		},
		methods:{
			drawLine(){
	        	this.myecharts = this.$echarts.init(document.getElementById('myChart'))
				this.myecharts.setOption(this.option)
				const that = this
				window.addEventListener('resize', function() {
				   that.myecharts.resize()
				})
	       },
	       workStatus(){
	       		//this.$emit('workStatus');
	       		//this.$router.push('workStatus')
	       		this.$router.push({
	       			name: 'workStatus',
	       			query: {tabNum: this.$props.tabNum,tabTitle:this.$props.tabTitle}
	       		})
	       }
		},
		mounted(){
			this.drawLine();
		},
		created() {
		    this._getLess("indexCon");
		},
	}
</script>

<style lang="less">
	/*@import "../../assets/style/indexCon.less";*/
</style>