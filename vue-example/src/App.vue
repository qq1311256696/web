<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
html,body,#app{
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 14px;
	min-height: 100%;
	color:#92A7C4;
}
</style>
