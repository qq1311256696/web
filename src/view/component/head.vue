<template>
    <div class="header">
        <div class="header_l" @click="isClick">
        	<img v-if="show" src="../../assets/img/back.png" alt="">
        </div>
        <div class="header_c">
        	<span>{{title}}</span>
        </div>
        <ThemeSwitch></ThemeSwitch>
        <div class="header_r">杭州</div>
    </div>
</template>

<script>
	import ThemeSwitch from "./theme-switch.vue";
    export default {
    	name:'heade',
    	components: {
		    ThemeSwitch
		},
        data() {
            return {
                
            }
        },
        props: {
            show: {
                required: true,
                type: Boolean
            },
            title: {
                required: true,
                type: String
            }
        },
        methods: {
            isClick() {
                if (this.show) {
                    this.$router.go(-1)
                } else {
                    return false
                }
            }
        },
        mounted() {
            
        },
        created() {
		    this._getLess("head");
		},
    }
</script>

<style lang="less">
	/*@import "../../assets/style/head.less";*/
</style>