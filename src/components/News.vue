<template>
	<div>
		<div class="g-warp">
			<div class="g-slider">
				<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="1" class=""></li>
						<li data-target="#carouselExampleCaptions" data-slide-to="2" class=""></li>
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
					<li class="nav-item">
						<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">热点资讯</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="notice-tab" data-toggle="tab" href="#notice" role="tab" aria-controls="notice" aria-selected="false">通知公告</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="industry-tab" data-toggle="tab" href="#industry" role="tab" aria-controls="industry" aria-selected="false">行业资讯</a>
					</li>
				</ul>

				<div class="tab-content">
					<div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
						<div class="article_list" v-for="item in items">
							<router-link class="list_item" :key="item.newManageId" :to="'/newsContent/'+item.newManageId" tag="a">
								<div class="cover" v-if="item.imageFile">
									<img :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+item.imageFile" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.title}}</h2>
									<p class="desc">{{item.newType}} <span>{{item.createTime | clipTime}}</span></p>
								</div>
							</router-link>
						</div>
					</div>
					<div class="tab-pane" id="notice" role="tabpanel" aria-labelledby="notice-tab">
						<div class="article_list" v-for="item in noticeItems">
							<router-link class="list_item" :key="item.newManageId" :to="'/newsContent/'+item.newManageId" tag="a">
								<div class="cover" v-if="item.imageFile">
									<img :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+item.imageFile" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.title}}</h2>
									<p class="desc">{{item.newType}} <span>{{item.createTime | clipTime}}</span></p>
								</div>
							</router-link>
						</div>
					</div>
					<div class="tab-pane" id="industry" role="tabpanel" aria-labelledby="industry-tab">
						<div class="article_list" v-for="item in industryItems">
							<router-link class="list_item" :key="item.newManageId" :to="'/newsContent/'+item.newManageId" tag="a">
								<div class="cover" v-if="item.imageFile">
									<img :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+item.imageFile" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.title}}</h2>
									<p class="desc">{{item.newType}} <span>{{item.createTime | clipTime}}</span></p>
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
		filters: {
			clipTime(args) {
				return args==undefined?'':args.substr(0, 10)
			}
		},
		data() {
			return {
				items: [],
				noticeItems: [],
				industryItems: [],
				bannerData:[]
			}
		},
		created: function() {
			let hotAPI = "newManageAction!eachJsonQueryPictureList.action?newManage.publishObject=1&type=1"
			let localAPI = "newManageAction!eachJsonQueryAllList.action?newManage.publishObject=1&newManage.newType=2&row=100"
			let noticeAPI = "newManageAction!eachJsonQueryAllList.action?newManage.publishObject=1&newManage.newType=11&row=100"
			let industryAPI = "newManageAction!eachJsonQueryAllList.action?newManage.publishObject=1&newManage.newType=16&row=100"
			this.$http.get(hotAPI).then(function(response) {
				this.bannerData = response.data.rows;
			});
			this.$http.get(localAPI).then(function(response) {
				this.items = response.data.rows
			});
			this.$http.get(noticeAPI).then(function(response) {
				this.noticeItems = response.data.rows
			});
			this.$http.get(industryAPI).then(function(response) {
				this.industryItems = response.data.rows
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
	.nav-tabs{background: #f2f2f2;border: 0;}
	.nav-tabs .nav-link{font-size: 15px;}
	.nav-tabs .nav-item{margin-bottom: 0;}
	.g-tab {}
	.carousel-caption{left: 0;right: 0;padding-top: 0;top: 0;}
	.carousel-caption p{background: rgba(0, 0, 0, 0.5);padding: .2rem;}
	.carousel-item{height: 180px;}
	.g-tab .nav-item {
		width: 33.33%;
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
		height: 45px!important;
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
		line-height: 1.3;
		margin: 0;
	}
	.list_item .cont .desc span{float: right;}
</style>