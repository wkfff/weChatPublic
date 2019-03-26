<template>
	<div>
		<div class="g-warp">
			<div class="g-slider">
				<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#carouselExampleCaptions" data-slide-to="0" class=""></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="2" class="active"></li>
					</ol>
					<div class="carousel-inner">
						<div class="carousel-item" v-for="(item,index) in bannerData" :class="{'active':!index}">
							<router-link :key="item.newManageId" :to="'/newsContent/'+item.newManageId" tag="div">
								<img class="d-block w-100" :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+item.imageFile" data-holder-rendered="true">
								<div class="carousel-caption d-md-block">
									<p>{{item.title}}</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="g-tab">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<div class="s-title">水质常识</div>
				</ul>

				<div class="tab-content">
					<div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
						<div class="article_list" v-for="item in items">
							<router-link class="list_item" :key="item.newManageId" :to="'/WaterKnowContent/'+item.newManageId" tag="a">
								<div class="cover" v-if="item.imageFile">
									<img :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+item.imageFile" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.title}}</h2>
									<p class="desc" v-if="item.introduction == ''">{{item.introduction}}</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				bannerData:[]
			}
		},
		created: function() {
			let hotAPI = "newManageAction!eachJsonQueryPictureList.action?newManage.publishObject=1&type=3"
			let localAPI = "newManageAction!eachJsonQueryAllList.action?newManage.publishObject=1&newManage.newType=15&row=100"
			this.$http.get(hotAPI).then(function(response) {
				this.bannerData = response.data.rows;
			});
			this.$http.get(localAPI).then(function(response) {
				this.items = response.data.rows
			});
		},
		mounted: function() {
			// 获取手指在轮播图元素上的一个滑动方向（左右）
			// 获取界面上轮播图容器
			var $carousels = $('.carousel');
			var startX, endX;
			// 在滑动的一定范围内，才切换图片
			var offset = 50;
			// 注册滑动事件
			$carousels.on('touchstart', function(e) {
				// 手指触摸开始时记录一下手指所在的坐标x
				startX = e.originalEvent.touches[0].clientX;

			});
			$carousels.on('touchmove', function(e) {
				// 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
				endX = e.originalEvent.touches[0].clientX;
			});
			$carousels.on('touchend', function(e) {
				//console.log(endX);
				//结束触摸一瞬间记录手指最后所在坐标x的位置 endX
				//比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
				var distance = Math.abs(startX - endX);
				if(distance > offset) {
					//说明有方向的变化
					//根据获得的方向 判断是上一张还是下一张出现
					$(this).carousel(startX > endX ? 'next' : 'prev');
				}
			})
		}
	}
</script>
<style scoped>
	a {
		color: #000;
	}
	
	a.active {
		color: #21b100!important;
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
	.s-title{line-height: 2.5rem;text-align: center;width: 100%;color: #21b100!important;font-size: 15px;}
	.nav-tabs{background: #f2f2f2;border: 0;}
	.nav-tabs .nav-link{font-size: 15px;}
	.nav-tabs .nav-item{margin-bottom: 0;}
	.g-tab {}
	.carousel-caption{left: 0;right: 0;padding-top: 0;top: 0;}
	.carousel-caption p{background: rgba(0, 0, 0, 0.5);padding: .2rem;}
	.carousel-item{height: 180px;}
	.g-tab .nav-item {
		width: 50%;
		text-align: center;
	}
	
	.article_list {
		background: #fff;
		margin-top: 5px;
	}
	
	.cover img {
		display: block;
		width: 80px;
		height: 60px;
	}
	
	.article_list {
		background-color: #fff
	}
	
	.list_item {
		display: block;
		padding: 15px 15px 10px 10px;
		overflow: hidden;
		position: relative;
		text-decoration: none;
		-webkit-tap-highlight-color: transparent
	}
	
	.list_item:active {
		background-color: rgba(0, 0, 0, .1)
	}
	
	.list_item:after {
		content: " ";
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 1px;
		border-bottom: 1px solid #e2e2e2;
		-webkit-transform-origin: 0 100%;
		-ms-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(.5);
		-ms-transform: scaleY(.5);
		transform: scaleY(.5);
		left: 10px
	}
	
	.list_item:last-child:after {
		border: 0
	}
	
	.list_item .cover {
		float: left;
		margin-right: 10px
	}
	
	.list_item .cover img {
		display: block;
		width: 80px!important;
		height: 60px!important;
	}
	
	.list_item .cont {
		overflow: hidden
	}
	
	.list_item .cont .title {
		font-weight: 400;
		font-size: 16px;
		color: #000;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal
	}
	
	.list_item .cont .desc {
		font-size: 13px;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.3
	}
	.list_item .cont .desc span{float: right;}
</style>