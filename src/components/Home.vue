<template>
	<div class="g-warp">
		<div class="my-3 p-3 bg-white rounded box-shadow g-job-content">
			<div class="media text-muted pt-3" v-for="item in items">
				<router-link class="media-intro" :key="item.recruitId" :to="'/jobcontent/'+item.recruitId" tag="div">
					<img src="static/images/job/icon_man.png">
					<p class="media-body pb-3 mb-0 small lh-125">
						<strong class="d-block text-gray-dark m-title">{{item.position}}</strong> {{item.seniority}} | 招聘人数：{{item.age}} | <span class="c-red">{{item.salary}}元/月</span>
					</p>
				</router-link>
				<div class="collapse" :id="'collapseItem'+item.recruitId">
					<div class="card card-body">
						<ul class="list-group list-group-flush">
							<li class="list-group-item">岗位职责: {{item.content}}</li>
							<li class="list-group-item">任职资格: {{item.education}}</li>
							<li class="list-group-item" style="margin: 1rem 0;">
								<router-link :key="item.recruitId" class="btn btn-primary-two btn-choose-job" :to="'/JobForm/'+item.recruitId" tag="div"> 申 请 </router-link>
								<span class="float-right">
									<router-link :key="item.recruitId" :to="'/jobcontent/'+item.recruitId" tag="a">查看详情 > </router-link>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<button class="btn btn-warning dropdown-toggle media-collapse-btn" type="button" data-toggle="collapse" :data-target="'#collapseItem'+item.recruitId" aria-expanded="false" :aria-controls="'collapseItem'+item.recruitId">
				</button>
			</div>
			<hr />
			<div class="card-center">
				<img src="static/images/job/icon_welfare.png"/>
				<p>专业培训、带薪年假、车辆补贴、节日福利、年中+年终奖金、全勤奖</p>
			</div>
		</div>
		<div class="g-bottom">
			<img src="static/images/job/bg_bottom.gif"/>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [],

			}
		},
		created: function() {
	      	let localAPI = "recruitAction!eachJsonQueryList.action"
//	      	let localAPI = "static/goods.json"
			this.$http.get(localAPI).then(function(response) {
				this.items = response.data.rows
			}, function(response) {
			});
		}
	}
</script>
<style>
	.g-warp{overflow: hidden;}
	.text-white-50 {
		position: relative;
	}
	.btn-choose-job{padding: .1rem .5rem!important;;font-size: .8rem!important;;}
	.media-intro {
		width: 100%;
		position: relative;
	}
	.media{display: block!important;}
	.media-intro>img {
		position: absolute;
		left: 0;height: 42px;
	}
	.btn.media-collapse-btn {
		padding: .02rem .4rem;
		position: absolute;
		right: 0;
		top: .5rem;
	}
	
	.media.text-muted {
		position: relative;
		border-top: 1px solid #0fa4ff;
	}
	.pb-3 {
		display: inline-block;
		width: 100%;
		padding-left: 3.5rem;
	}
	
	.text-white-50>h3 {
		width: 100%;
		position: relative;
		color: #2C3E50!important;
	}
	
	.text-white-50>small {
		position: absolute;
		right: 0;
	}
	
	.c-red {
		color: #ffbc44!important;
	}
	
	.col-xs {
		width: 33%;
		text-align: center;
	}
	
	.row {
		margin: 0;
		padding: .3rem;
	}
	.card-body .list-group-item{padding: .25rem .5rem;}
</style>
<style scoped="scoped">
	.g-warp{background: url('../../static/images/job/bg_head.jpg') 0 0 no-repeat;background-size:100%}
	.card-center{margin-top: 5rem;text-align: center;}
	.card-center p{font-size: .9rem;color: #009eff;width: 80%;display: block;margin: 0 auto;padding: 1rem;}
	.g-bottom{width: 100%;}
	.g-bottom img{width: 100%;}
	footer{display: none!important;}
	.card-center img{vertical-align: middle;width: 40%;display: block;margin: 0 auto;}
	.m-title{color: #009eff;font-size: 1rem;}
	.g-job-content{margin-top: 56%!important;}
	.g-job-content hr{border-top: 1px solid #0fa4ff;}
	.btn-warning{background-color: #fff;border-color: #009eff;}
	.dropdown-toggle::after{color: #009eff;}
	.btn-warning:not(:disabled):not(.disabled).active, .btn-warning:not(:disabled):not(.disabled):active, .show>.btn-warning.dropdown-toggle{
		box-shadow:none;background-color:#fff;border-color: #009eff;}
	.btn-warning::after{border-bottom: 0;border-top: .3em solid;}
	.btn-warning:focus::after{border-bottom: .3em solid;border-top: 0;}
	.pb-3{font-size: .9rem;padding-bottom:.6rem!important}
	.card,.list-group-item{border: 0;}
	.card-body{padding-left: 3rem;padding: 0 .25rem!important;}
	.card .list-group-item{display: -webkit-box;-webkit-box-orient: vertical!important;-webkit-line-clamp: 3!important;overflow: hidden;line-height: 1.6rem;}
	.btn-primary-two{background-color: #009eff;border-color: #009eff;color: #fff;}
</style>