<template>
	<div id="g-warp">
		<div class="g-content">
			<div class="g-slider">
				<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="2" class="active"></li>
					</ol>
					<div class="carousel-inner">
						<div class="carousel-item" v-for="(item,index) in bannerData" :class="{'active':!index}">
							<router-link :key="item.newManageId" :to="'/ResultsWaterContent/'+item.newManageId" tag="div">
								<img class="d-block w-100" :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+item.imageFile" data-holder-rendered="true">
								<div class="carousel-caption d-md-block">
									<p>{{item.title}}</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="content-list" v-for="Results in items">
				<router-link :key="Results.newManageId" :to="'/ResultsWaterContent/'+Results.newManageId" tag="div">
					<div class="content-fl">
						<img class="oImg" :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+Results.imageFile" />
					</div>
					<div class="content-fr">
						<h6 class="title">{{Results.title}}</h6>
						<p class="text">{{Results.content}}</p>
					</div>
					<div style="clear: both;">
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				items: [],
				bannerData: []
			}
		},
		created: function() {
			let hotAPI = "newManageAction!eachJsonQueryPictureList.action?newManage.publishObject=1&type=2"
			let resultsAPI= "newManageAction!eachJsonPictureQueryList.action?newManage.newType=4&newManage.top=1&newManage.publishObject=1&rows=100&page=1"
			this.$http.get(hotAPI).then(function(response) {
				this.bannerData = response.data.rows;
			});
			this.$http.get(resultsAPI).then(function(response) {
				this.items = response.data.rows;
				for(var i = 0; i < this.items.length; i++) {
					var str = response.data.rows[i].content;
					//正则去掉内容的空格 样式 标签 符号
					str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
					str = str.replace(/^\"|\"$/g, ''); //去掉双引号
					str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
					str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
					str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
					response.data.rows[i].content = str;
				}
			});
		},
		mounted: function() {
			var $carousels = $('.carousel');
			var startX, endX;
			var offset = 50;
			$carousels.on('touchstart', function(e) {
				startX = e.originalEvent.touches[0].clientX;

			});
			$carousels.on('touchmove', function(e) {
				endX = e.originalEvent.touches[0].clientX;
			});
			$carousels.on('touchend', function(e) {
				var distance = Math.abs(startX - endX);
				if(distance > offset) {
					$(this).carousel(startX > endX ? 'next' : 'prev');
				}
			})
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#g-warp {
		padding: 0;
		height: 100%;
	}
	
	.g-content {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	
	.content-list {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #f1f1f1;
		padding: 15px;
	}
	
	.content-list .oImg {
		width: 94%;
		height: 100%;
		display: inline-block;
	}
	
	.content-list .content-fl {
		width: 50%;
		float: left;
		height: 66px;
		width: 100px;
	}
	
	.content-list .title {
		word-break: keep-all;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: #000;
	}
	
	.content-list .text {
		line-height: 22px;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 12px;
		color: #797979;
		overflow: hidden;
		margin: 0;
	}
	
	.banner {
		width: 100%;
		position: relative;
	}
	
	.titleIdex {
		position: absolute;
		bottom: 0;
		padding: 0 12px;
		color: #fff;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
	}
	
	.p_title {
		height: 35px;
		line-height: 35px;
		width: 100%;
		text-align: center;
		color: forestgreen;
		background: #f1f1f1;
	}
	
	.g-slider {
		position: relative;
		overflow: hidden;
		height: 180px;
	}
	
	.carousel-caption {
		left: 0;
		right: 0;
		padding-top: 0;
		top: 0;
	}
	
	.carousel-caption p {
		background: rgba(0, 0, 0, 0.5);
		padding: .2rem;
	}
	
	.carousel-item {
		height: 180px;
	}
</style>