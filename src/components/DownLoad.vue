<template>
	<div>
		<div class="m-auto g-warp">
	        <div class="g-top">
	        	<div class="down-box">
	        		<a :href="android"></a>
	        		<a href="https://itunes.apple.com/cn/app/智慧河道云平台/id1335849937?mt=8"></a>
	        	</div>
	        	<img src="static/images/下载页_h_02.png" class="img-pos">
	        	<img src="static/images/下载页_h_01.jpg" class="img-box">
	        </div>
	        <div class="g-bottom">
	        	<img src="static/images/下载页_h_02.jpg" style="width:100%;">
	        </div>
	    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				android:'' 
			}
		},
		mounted() {
			let localAPI = "appUpdateAction!eachJsonQueryOneForBrowse.action"
			this.$http.get(localAPI).then(function(response) {
				let items = response.data.appUpdate.url
				this.android = location.protocol+"//"+document.domain+"/"+items;
			});
		}
	}
</script>
<style scoped>
	.g-warp {
	  position:relative;
	  width:100%;
	}
	.down-box{position: absolute;top: 41%;width: 100%;height: 8%;}
	.down-box a{display: inline-block;width: 50%;height: 100%;float: left;}
	@media (min-width: 1200px) {
	  .m-auto.g-warp {
	    width:750px;
	    margin:0 auto;
	  }
	}
	
	.g-top {
	  position:relative;
	}
	
	.img-box {
	  width:100%;
	}
	
	.img-pos {
	  position:absolute;
	  width:100%;
	  bottom:0;
	  left:0;
	  z-index:1;
	}
	
	.g-bottom {
	  width:100%;
	  position:relative;
	  z-index:2;
	}


</style>