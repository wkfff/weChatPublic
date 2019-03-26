<template>
	<div id="app">
		<router-view v-if="isRouterAlive"></router-view>
		<footer class="text-muted text-center text-small">
			<p class="mb-1">©2018 杭州九问数字科技有限公司</p>
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data () {
			return {
		    	isRouterAlive: true
			}
		},
		methods: {
			reload () {
		    	this.isRouterAlive = false
		    	this.$nextTick(function(){
		    		this.isRouterAlive = true
		    	})
			}   
		}
	}
</script>

<style>
	footer{margin-bottom: 100px;margin-top: 30px;}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		font-size: .8rem;word-break:break-all;
	}
	
	.jobs-icon-blue-dots {
		width: 8px;
		height: 8px;
		margin: 1px 4px;
		border-radius: 6px;
		display: inline-block;
		background-color: #00a1d6;
	}
	
	label:not(.custom-file-label) {
		margin-top: .5rem;
	}
	
	.custom-file-label {
		overflow: hidden;
		word-break: keep-all;
	}
	
	.custom-file-label::after {
		content: "选择文件"!important;
	}
	
	.alert-primary {
		position: fixed!important;
		top: 34%;
		left: 47%;
		z-index: 999;
	}
	.carousel-indicators li{width: 8px!important;height: 8px!important;border-radius: 50%!important;background-color: rgba(9, 114, 154, 0.54)!important;}
	.carousel-indicators .active{background-color: rgb(17, 182, 245)!important;}
</style>