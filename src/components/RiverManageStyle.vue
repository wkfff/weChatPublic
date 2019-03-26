<template>
	<div>
		<div class="g-warp">
			<div class="g-slider">
				
			</div>
			<div class="g-tab">
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item">
						<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">责任河长</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="notice-tab" data-toggle="tab" href="#notice" role="tab" aria-controls="notice" aria-selected="false">民间河长</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="police-tab" data-toggle="tab" href="#police" role="tab" aria-controls="police" aria-selected="false">警长</a>
					</li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
						<div class="article_list" v-for="item in dutyItems">
							<router-link class="list_item" :key="item.riverHeadId" :to="{name:'RiverManageContent',params:{id:item.riverHeadId,uname:'duty'}}" tag="a">
								<div class="cover" v-if="item.picture">
									<img :src="'http://www.zhihuihedao.cn/upload/images/employee/'+item.picture" />
								</div>
								<div class="cover" v-else>
									<img src="static/images/404manage.png" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.riverHeadName}}</h2>
									<p class="desc">{{item.office}}</p>
								</div>
							</router-link>
						</div>
					</div>
					<div class="tab-pane" id="notice" role="tabpanel" aria-labelledby="notice-tab">
						<div class="article_list" v-for="item in folkItems">
							<router-link class="list_item" :key="item.riverHeadId" :to="{name:'RiverManageContent',params:{id:item.folkRiverHeadId,uname:'folk'}}" tag="a">
								<div class="cover" v-if="item.imageFile">
									<img :src="'http://www.zhihuihedao.cn/upload/images/employee/'+item.picture" />
								</div>
								<div class="cover" v-else>
									<img src="static/images/404manage.png" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.employee}}</h2>
									<p class="desc">{{item.reach}}</p>
								</div>
							</router-link>
						</div>
					</div>
					<div class="tab-pane" id="police" role="tabpanel" aria-labelledby="police-tab">
						<div class="article_list" v-for="item in policeItems">
							<router-link class="list_item" :key="item.riverHeadId" :to="{name:'RiverManageContent',params:{id:item.riverHeadId,uname:'police'}}" tag="a">
								<div class="cover" v-if="item.imageFile">
									<img :src="'http://www.zhihuihedao.cn/upload/images/employee/'+item.picture" />
								</div>
								<div class="cover" v-else>
									<img src="static/images/404manage.png" />
								</div>
								<div class="cont">
									<h2 class="title">{{item.riverHeadName}}</h2>
									<p class="desc">{{item.office}}</p>
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
				dutyItems: [],
				folkItems: [],
				policeItems:[]
			}
		},
		created: function() {
			/*let dutyAPI = "static/duty.json"
			let folkAPI = "static/folk.json"
			let policeAPI = "static/police.json"*/
			
			let dutyAPI = "riverHeadAction!eachJsonQueryList.action?riverHead.institution.institutionId=287&type=1"
			let folkAPI = "folkRiverHeadAction!eachJsonQueryList.action?folkRiverHead.reach.institution.institutionId=287&type=7"
			let policeAPI = "riverHeadAction!eachJsonQueryList.action?type=4&riverHead.institution.institutionId=287"
			this.$http.get(dutyAPI).then(function(response) {
				this.dutyItems = response.data.rows
			}, function(response) {
//				alert("请求错误")
			});
			this.$http.get(folkAPI).then(function(response) {
				this.folkItems = response.data.rows
			}, function(response) {
//				alert("请求错误")
			});
			this.$http.get(policeAPI).then(function(response) {
				this.policeItems = response.data.rows
			}, function(response) {
//				alert("请求错误")
			});
		}
	}
</script>
<style scoped>
	a {color: #000;}
	.g-slider {
		position: relative;
		overflow: hidden;
		height: 180px;
		background: url('../../static/images/bg_river_manage.jpg') 0 0 no-repeat;background-size: cover;
	}
	.tab-content{background: #efefef;}
	.nav-tabs{background: #fff;border-bottom: 3px solid #dee2e6;}
	.nav-tabs .nav-link{font-size: 15px;border: 0;font-size: 1rem;font-weight: bold;}
	.nav-tabs .nav-link.active{border-bottom: 3px solid #009eff;}
	.nav-tabs .nav-item{margin-bottom: -3px;}
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
		margin-top: 2px;
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
		width: 58px!important;
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