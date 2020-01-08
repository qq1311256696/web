<template>
	<div class="workStatus">
		<Head :show="show" :title="title"></Head>
		<div class="workStatusCon">
		<div class="time" v-show="$route.query.tabNum==1">
			<van-row class="timerow">
			  	<van-field
			    	class="select_item"
			    	v-model="startDate"
	                centers
	                label="开始时间"
	                icon="arrow"
	                placeholder="请选择"
	                @click-icon="startDateShow = true"
	                disabled
	                >
	             </van-field>
	            <van-popup v-model="startDateShow" position="bottom">
			        <van-datetime-picker
			          v-model="startdatePicker"
					  type="date"
					  :min-date="minDate"
					  @change="onChangeStartDate"
				  	  @confirm="startDateShow = false"
		          	  @cancel="startDateShow = false"
					  />
			    </van-popup> 
			</van-row>
			<van-row class="timerow">
			  	<van-field
			    	class="select_item"
			    	v-model="endDate"
	                centers
	                label="终止时间"
	                icon="arrow"
	                placeholder="请选择"
	                @click-icon="endDateShow = true"
	                disabled
	                >
	             </van-field>
	            <van-popup v-model="endDateShow" position="bottom">
			        <van-datetime-picker
			          v-model="enddatePicker"
					  type="date"
					  :min-date="minDate"
					  @change="onChangeEndDate"
				  	  @confirm="endDateShow = false"
		          	  @cancel="endDateShow = false"
					  />
			    </van-popup> 
			</van-row>
			<van-row class="check">
				开始查询
			</van-row>
		</div>
		<div class="echart">
			<div class="title">全年{{query.tabTitle}}次数</div>
			<div class="con" id="myChart" @click="echartDetail">
				<!--折线图-->
			</div>
		</div>
		<div class="table">
			<div class="title">{{query.tabTitle}}次数列表</div>
			<van-row class="head">
			  	<van-col span="4">序号</van-col>
			  	<van-col span="6">电网名称</van-col>
			  	<van-col span="8">设备分类</van-col>
			  	<van-col span="6">检修次数</van-col>
			</van-row>
			<div class="body">
				<van-row class="tablecon" v-for="(item,index) in list" :key="index" >
					<div @click="detail(item)">
					  	<van-col span="4">
					  		<div class="center">{{item.order}}</div>
					  	</van-col>
					  	<van-col span="6">
					  		<div class="center">{{item.name}}</div>
					  	</van-col>
					  	<van-col span="8" >
					  		<div v-for="(equip,index) in item.equip" :key="index">
					  			{{equip.type}}
					  		</div>
					  	</van-col>
					  	<van-col span="6" >
					  		<div :class="classes(index)" v-for="(equip,index) in item.equip" :key="index">
					  			{{equip.time}}
					  		</div>
					  	</van-col>
				  	</div>
				</van-row>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import { Row,Col,Tab,Tabs,RadioGroup,Radio,Button,Field,DatetimePicker,Popup,Picker } from 'vant';
	import Head from './component/head.vue';
	export default {
		components: {
			Head,
			[Row.name]: Row,
			[Col.name]: Col,
			[Tab.name]: Tab,
	        [Tabs.name]: Tabs,
	        [RadioGroup.name]: RadioGroup,
	        [Radio.name]: Radio,
	        [Button.name]: Button,
	        [Field.name]: Field,
	        [DatetimePicker.name]: DatetimePicker,
	        [Picker.name]: Picker,
	        [Popup.name]: Popup
	    },
		data(){
			return {
				query:this.$route.query,
				year:'1',
	            startDate:'',
	           	endDate:'',
	           	startdatePicker: '',
	           	enddatePicker: '',
	           	currentDate: new Date(),
	           	startDateShow:false,
	           	endDateShow:false,
	            minDate: new Date(2018,0,1),//预计完工日期最小值
	            show:true,
	           	title:'工作情况',
				list: [
	            	{
	            		order:'01',
	            		name:'台州电网',
	            		equip:[
	            			{type:'母线',time:'60'},
	            			{type:'主变',time:'62'},
	            			{type:'线路',time:'63'}
	            		]
	            	},{
	            		order:'02',
	            		name:'温岭电网',
	            		equip:[
	            			{type:'母线',time:'60'},
	            			{type:'主变',time:'62'},
	            			{type:'线路',time:'63'}
	            		]
	            	},{
	            		order:'03',
	            		name:'台州电网',
	            		equip:[
	            			{type:'母线',time:'60'},
	            			{type:'主变',time:'62'},
	            			{type:'线路',time:'63'}
	            		]
	            	},{
	            		order:'04',
	            		name:'温岭电网',
	            		equip:[
	            			{type:'母线',time:'60'},
	            			{type:'主变',time:'62'},
	            			{type:'线路',time:'63'}
	            		]
	            	}
	            ],
				myecharts: '', //实例
	           	option: {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data:['母线','主变','电压'],
				        textStyle: {
	                        fontSize:'12px',
	                        color: '#333'
			           	}
				    },
				    grid: {
				        left: '2%',
				        right: '2%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data: ['台州', '温岭', '玉环', '天台', '三门', '天台', '台州'],
				            //设置轴线的属性
		                    axisLine:{
		                        lineStyle:{
		                            color:'#778196'
		                        }
		                    } 
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            //设置网格线颜色
						    splitLine: {
						        show: false,
						        lineStyle:{
						           color: ['#2D3F61'],
						           width: 1,
						           type: 'solid'
						      	}
						　　	},
				            //设置轴线的属性
		                    axisLine:{
		                        lineStyle:{
		                            color:'#778196'
		                        }
		                    } 	
				        }
				    ],
				    series : [
				        {
				            name:'母线',
				            type:'bar',
				            barWidth : 8,
				            data:[159, 150, 160, 120, 160, 140, 150],
							//修改柱状图颜色
				            itemStyle:{
	                            normal:{
	                                color:'#08C890'
	                            }
	                       	},
				        },
				        {
				            name:'主变',
				            type:'bar',
				            barWidth : 8,
				            data:[120, 132, 101, 134, 90, 230, 210],
				            //修改柱状图颜色
				            itemStyle:{
	                            normal:{
	                                color:'#FD4A4A'
	                            }
	                       	},
				        },
				        {
				            name:'电压',
				            type:'bar',
				            barWidth : 8,
				            data:[162, 118, 164, 126, 179, 160, 157],
				            //修改柱状图颜色
				            itemStyle:{
	                            normal:{
	                                color:'#F4BC63'
	                            }
	                       	},
				        },
				    ]
				}
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
	       	//柱状图点击
	       	echartDetail(){
	       		//this.$router.push('detail2')
	       		this.$router.push({
	       			name: 'detail2',
	       			query: this.query
	       		})
	       	},
	       	//列表点击
	       	detail(item){
	       		console.log(item)
	       		//this.$router.push('detail')
	       		this.$router.push({
	       			name: 'detail2',
	       			query: this.query
	       		})
	       	},
	       	onChangeStartDate(picker, value, index){
		   		const date = picker.getValues()[0]+"年"+picker.getValues()[1]+"月"+picker.getValues()[2]+"日";
		   		this.startDate = date
		   	},
		   	onChangeEndDate(picker, value, index){
		   		const date = picker.getValues()[0]+"年"+picker.getValues()[1]+"月"+picker.getValues()[2]+"日";
		   		this.endDate = date
		   	},
		   	//获取动态class
		   	classes(index) {
				return `eq${index}`;
			},
		},
		mounted(){
			this.drawLine();
		},
		created() {
		    this._getLess("workStatus");
		},
	}
</script>

<style lang="less">
	/*@import "../assets/style/workStatus.less";*/
</style>