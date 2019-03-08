<template>
    <error-content
        code="404"
        desc="Oh~~您的页面好像飞走了~"
        :src="src"/>
</template>

<script>
import error404 from './images/error404.svg'
import errorContent from './errorContent.vue'
export default {
    name: 'Error404',
    components: {
        errorContent
    },
    data () {
        return {
            src: error404
        }
    }
}
</script>
