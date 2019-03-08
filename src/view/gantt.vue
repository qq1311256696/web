<template>
	<div class="gantt">
		<div class="name">输变电工作甘特图</div>
		<div class="ganttcon" ref="gantt"></div>
		<div class="finish">
			<van-button type="default" @click="cancel">关闭</van-button>
		</div>
	</div>
</template>

<script>
	import { Row,Col,Button } from 'vant';
	import 'dhtmlx-gantt';
	export default {
		name: 'gantt',
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
	        [Button.name]: Button
	    },
	    props: {
		    tasks: {
		      type: Object,
		      default () {
		        return {data: [], links: []}
		      }
		    },
		    unit: {
		    	type: String
		    }
		},
		data(){
			return {
				
			}
		},
		methods:{
	       	cancel(){
	       		this.$emit('cancel');
	       	},
	       	initGantt() {
		  		this.initConfig();
		  		gantt.init(this.$refs.gantt)
		   		gantt.parse(this.$props.tasks)
		  	},
		  	// 初始化配置
		  	initConfig() {
		  		this.commonConfig();
		  		this.unitConfig();	
		  	},
		  	// 公共配置
		  	commonConfig() {
		  		// gantt列配置
				gantt.config.columns=[
				    {name:"text",       label:"厂站",  tree:false, width:'100'},
//				    {name:"start_date", label:"开始时间", align: "center" },
//				    {name:"duration",   label:"时长",   align: "center" },
//				    {name:"add",        label:"" }
				];
				//隐藏表格
				gantt.config.show_grid = true;
				//只读模式
				gantt.config.readonly=true;
		  	},
		  	// 获取当前是月的第几周
		  	getWeek(weekNum){
		  		let y = (weekNum-1)%4;
		  		if(y) {
		  			return y;
		  		} else {
		  			return 4;
		  		}
		  	},
		  	// 根据传入的unit配置 week|month|year
		  	unitConfig(){
		  		const _this = this;
				if(this.unit=='day'){
					gantt.config.scale_unit = "day";//设置x轴的日期格式
					gantt.config.step = 1;
					gantt.config.date_scale = "%d";//设置x轴的日期格式
					gantt.config.subscales = [
						{unit: "year", step: 1, date: "%Y"},
						{unit: "month", step: 1, date: "%M"}
					];
					gantt.config.scale_height = 70;
					gantt.templates.date_scale = null;
				}else if(this.unit=='week'){
					var weekScaleTemplate = function (date) {
						var dateToStr = gantt.date.date_to_str("%m月%d"); 
						var month = gantt.date.date_to_str("%m"); 
		       	 		var weekNum = gantt.date.date_to_str("%w"); 
		        		var endDate = gantt.date.add(gantt.date.add(date,1,"week"), - 1,"day");
						var week = _this.getWeek(weekNum(date));
		        		return `${month(date)}月第${week}周`;
					};
					gantt.config.scale_unit = "week";
					gantt.config.step = 1;
					gantt.templates.date_scale = weekScaleTemplate;
					gantt.config.subscales = [
						//{unit:"month",step:1,date:"%F,%Y"},
						{unit:"week",step:1,template: weekScaleTemplate }
					];
					gantt.config.min_column_width = 100;
					gantt.config.scale_height = 70;
				}else if(this.unit=='month'){
					gantt.config.scale_unit = "month";
					gantt.config.date_scale = "%Y, %F";
					gantt.config.step = 1;
					gantt.config.subscales = [
						{unit: "week", step: 1, date: "%W"}
					];
					gantt.config.scale_height = 70;
					gantt.templates.date_scale = null;
				}else if(this.unit=='year'){
					gantt.config.scale_unit = "year";
					gantt.config.step = 1;
					gantt.config.date_scale = "%Y";
					gantt.config.min_column_width = 50;
					gantt.config.scale_height = 70;
					gantt.templates.date_scale = null;
					gantt.config.subscales = [
						{unit: "month", step: 1, date: "%M"}
					];
				}
			}
		},
		mounted() {
		  	// 初始化gant
		  	this.initGantt();
		},
		created() {
		    this._getLess("gantt");
		},
	}
</script>
<style lang="less">
	@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
	/*@import "../assets/style/gantt.less";*/
</style>