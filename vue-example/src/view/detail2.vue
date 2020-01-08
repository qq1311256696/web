<template>
	<div class="detail2">
		<Head :show="show" :title="title"></Head>
		<div class="tool">
			<van-row class="row">
			  	<van-col span="4">类别</van-col>
			  	<van-col span="20">
			  		<van-radio-group v-model="type">
		  				<van-radio name="0" :class="[type==0?active:inActive]">全部</van-radio>
					  	<van-radio name="1" :class="[type==1?active:inActive]">技修</van-radio>
					  	<van-radio name="2" :class="[type==2?active:inActive]">检修</van-radio>
					</van-radio-group>
			  	</van-col>
			</van-row>
			<van-row class="row" v-show="$route.query.tabNum!=2">
			  	<van-col span="5">设备类型</van-col>
			  	<van-col span="19">
			  		<van-radio-group v-model="deviceType">
		  				<van-radio name="0" :class="[deviceType==0?active:inActive]">全部</van-radio>
					  	<van-radio name="1" :class="[deviceType==1?active:inActive]">主变</van-radio>
					  	<van-radio name="2" :class="[deviceType==2?active:inActive]">母线</van-radio>
					  	<van-radio name="3" :class="[deviceType==3?active:inActive]">线路</van-radio>
					</van-radio-group>
			  	</van-col>
			</van-row>
			<van-row class="row" v-show="$route.query.tabNum==0">
			  	<van-col span="5">关键字</van-col>
			  	<van-col span="19">
					<van-search class="search-input" placeholder="请输入关键字"  v-model="keyword" />
			  	</van-col>
			</van-row>
			<div class="time" v-show="$route.query.tabNum!=0">
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
		</div>
		<div class="title"> 
			输变电工作详细信息
			<span @click="gantt">甘特图</span>
		</div>
		<div class="table">
			<van-row class="head">
			  	<van-col span="6">工作站</van-col>
			  	<van-col span="6">检修状态</van-col>
			  	<van-col span="6">开始时间</van-col>
			  	<van-col span="6">结束时间</van-col>
			</van-row>
			<div class="body">
				<van-row class="tablecon" v-for="(item,index) in list" :key="index">
				  	<van-col span="6">{{item.station}}</van-col>
				  	<van-col span="6">{{item.status}}</van-col>
				  	<van-col span="6">{{item.start}}</van-col>
				  	<van-col span="6">{{item.end}}</van-col>
				</van-row>
			</div>
		</div>
		
		<van-popup v-model="ganttShow" position="left">
		  	<gantt :tasks="tasks" :unit="unit" @cancel='cancel'></gantt>
		</van-popup>
	</div>
</template>

<script>
	import { Row,Col,Button,Search,RadioGroup,Radio,Popup,Field,DatetimePicker,Picker } from 'vant';
	import gantt from './gantt.vue';
	import Head from './component/head.vue';
	export default {
		components: {
			gantt,
			Head,
			[Row.name]: Row,
			[Col.name]: Col,
	        [Button.name]: Button,
	        [Search.name]: Search,
	        [RadioGroup.name]: RadioGroup,
	        [Radio.name]: Radio,
	        [Popup.name]: Popup,
	        [Field.name]: Field,
	        [DatetimePicker.name]: DatetimePicker,
	        [Picker.name]: Picker
	    },
		data(){
			return {
				query:this.$route.query,
				type:'0',//类别
				deviceType:'0',//设备类型
				inActive:'inActive',
	       		active:'active',
	       		keyword:'',//关键字
	       		ganttShow:false,//弹出框默认关闭
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
	           	title:'详细信息',
				list: [
					{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},	
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},	
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'},
	            	{status:'已开始',station:'滨海站#1',start:'01/12',end:'01/15'}
	            ],
	            tasks: {
			        data: [
						{
							id: 1,//任务id
							text: '#2机组C2检修',//任务名
							start_date: '05-04-2018',//开始时间
							duration: 6,//任务时长，从start_date开始计算
							progress: 0.6 //任务完成情况，进度
						},
						{id: 2, text: '#2机组C2检修',start_date: '07-04-2018', duration: 7,progress: 0.4},
						{id: 3, text: '#2机组C2检修', start_date: '08-04-2018', duration: 6, progress: 0.2},
						{id: 4, text: '#2机组C2检修', start_date: '10-04-2018', duration: 5,progress: 0.3},
			        ],
			        links: [ //links为任务之间连接的线，source根源 target目标 也就是从id为1的指向id为2的
			          //{id: 1, source: 1, target: 2, type: '0'}
			        ]
			 	},
			  	unit:'week'//传入插件的展示格式
			}
		},
		methods:{
	       	gantt(){
	       		this.ganttShow = true;
	       	},
		   	cancel(){
		   		this.ganttShow = false;
		   	},
		   	onChangeStartDate(picker, value, index){
		   		const date = picker.getValues()[0]+"年"+picker.getValues()[1]+"月"+picker.getValues()[2]+"日";
		   		this.startDate = date
		   	},
		   	onChangeEndDate(picker, value, index){
		   		const date = picker.getValues()[0]+"年"+picker.getValues()[1]+"月"+picker.getValues()[2]+"日";
		   		this.endDate = date
		   	},
		},
		created() {
		    this._getLess("detail");
		},
	}
</script>

<style lang="less">
	/*@import "../assets/style/detail.less";*/
</style>