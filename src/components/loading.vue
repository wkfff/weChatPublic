<template>
	<div class="vue-loading">
	  	<div class="mask-bg">
	  		<div class="loading_2">
	            <i class="l1"></i>
	            <i class="l2"></i>
	            <i class="l3"></i>
	            <i class="l4"></i>
	        </div>
	  	</div>
	  </div>
</template>

<script>
export default {
  name: 'vue-loading'
}
</script>

<style scoped>
.vue-loading {
  margin: 0;padding: 0;width: 100%;height: 100%;z-index: 999;position: fixed;display: none;
}
.loading_2{position: absolute;left: 49%;top: 35%;}
.mask-bg{background: rgba(0, 0, 0, 0.18);width: 100%;height: 100%;box-sizing: border-box;align-items:center;justify-content: center;}
@-webkit-keyframes loading_2 {
    0% { transform: scaleY(1);-webkit-transform: scaleY(1)}
    50% { transform: scaleY(0.4);-webkit-transform: scaleY(0.4)}
    100% { transform: scaleY(1);-webkit-transform: scaleY(1)}
}
@keyframes loading_2 {
    0% { transform: scaleY(1);-webkit-transform: scaleY(1)}
    50% { transform: scaleY(0.4);-webkit-transform: scaleY(0.4)}
    100% { transform: scaleY(1);-webkit-transform: scaleY(1)}
}
.loading_2 i { width:4px; border-radius:2px; height:35px; margin:0 2px; display:inline-block; background:#333;}
.loading_2 i.l1 { animation: loading_2 .8s linear 0.1s infinite;-webkit-animation: loading_2 .8s linear 0.1s infinite;}
.loading_2 i.l2 { animation: loading_2 .8s linear 0.2s infinite;-webkit-animation: loading_2 .8s linear 0.2s infinite;}
.loading_2 i.l3 { animation: loading_2 .8s linear 0.3s infinite;-webkit-animation: loading_2 .8s linear 0.3s infinite;}
.loading_2 i.l4 { animation: loading_2 .8s linear 0.4s infinite;-webkit-animation: loading_2 .8s linear 0.4s infinite;}

</style>