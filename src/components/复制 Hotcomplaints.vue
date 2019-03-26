<template>
	<div id="g-warp">
		<div class="g-content">
			<div class="g-slider">
				<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
					</ol>
					<div class="carousel-inner">
						<div class="carousel-item" v-for="(item,index) in bannerData" :class="{'active':!index}">
							<router-link :key="item.newManageId" :to="'/HotcomplaintsContent/'+item.taskId" tag="div">
								<img class="d-block w-100" :src="'http://www.zhihuihedao.cn/upload/images/task/'+item.issueImageTwo" data-holder-rendered="true">
								<div class="carousel-caption d-md-block">
									<p>{{item.taskType}}</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<p class="p_title">热门投诉</p>
			<div class="content-list" v-for="Results in items">
				<router-link :key="Results.taskId" :to="'/HotcomplaintsContent/'+Results.taskId" tag="a">
					<div class="content-fl">
						<img class="oImg" :src="'http://www.zhihuihedao.cn/upload/images/task/'+Results.issueImageTwo" v-if="Results.issueImageTwo" />
						<img class="oImg" src="http://www.zhihuihedao.cn/common/public/images/error.png" v-if="!Results.issueImageTwo" />
					</div>
					<div class="content-fr">
						<h6 class="title">{{Results.taskType}}</h6>
						<p class="text">{{Results.issueDetail}}</p>
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
				title: "热门投诉",
				bannerData:[]
			}
		},
		created: function() {
			let hotAPI = "/ypt/taskAction!eachJsonQueryTimesList.action"
			let taskAPI = "/ypt/taskAction!eachJsonQueryWXPublicList.action?task.issueTypes=1,5,10,11,13,14"
			this.$http.get(hotAPI).then(function(response) {
				this.bannerData = response.data.rows;
			});
			this.$http.get(taskAPI).then(function(response) {
				console.log(response);
				this.items = response.data.rows;
				/*for(let j=0;j<this.items.length;j++){
					if(this.items[j].issueImageOne){
						let arr = this.items[j].issueImageOne.split(',');
						if(arr.length>1){
							this.items[j].issueImage = arr[0]
						}
					}
				}*/
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
		text-decoration: none;
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
	.g-slider {
		position: relative;
		overflow: hidden;
		height: 180px;
	}
	.tab-content{background: #F2F2F2;}
	.g-slider .carousel {
		height: 180px;
	}
	.g-tab {}
	.carousel-caption{left: 0;right: 0;padding-top: 0;top: 0;}
	.carousel-caption p{background: rgba(0, 0, 0, 0.5);padding: .2rem;}
	.carousel-item{height: 180px;}
	.p_title{height:35px;line-height:35px;width: 100%;text-align: center;color: forestgreen;background: #f1f1f1;}
</style>