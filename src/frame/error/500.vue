<template>
    <error-content
        code="500"
        desc="Oh~~鬼知道服务器经历了什么~"
        :src="src"/>
</template>

<script>
import error500 from './images/error500.svg'
import errorContent from './errorContent.vue'
export default {
    name: 'Error500',
    components: {
        errorContent
    },
    data () {
        return {
            src: error500
        }
    }
}
</script>
