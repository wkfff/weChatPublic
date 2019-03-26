<template id="content-tpl">
	<div id="this_height">
		<div class="g-warp">
			<div class="m-top">
				<div class="d-flex align-items-center text-white-50">
					<h3 style="color: #009eff!important;">{{items.position}}<p style="float: right;font-size: .9rem;color: rgb(129, 129, 129);">{{items.uploadDate | clipTime}}</p></h3>
				</div>
				<div class="p-money">
					{{items.salary}}元
				</div>
				<div>
					地点：{{items.seniority}} | 招聘人数：{{items.age}}
				</div>
			</div>
			<div class="m-content">
				<div class="row">
					<div class="location block">
						<div class="title"><i class="jobs-icon-blue-dots"></i> 岗位职责</div>
						<div class="duty_text" v-html="items.duty"></div>
					</div>
				</div>
				<div class="row">
					<div class="location block">
						<div class="title"><i class="jobs-icon-blue-dots"></i> 任职资格</div>
						<div class="demand_text" v-html="items.educations"></div>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<div class="p-fixed-bottom" id="this_fixed">
			<router-link class="btn btn-primary" :to="'/JobForm/'+uid" tag="button" type="button" style="padding: .375rem 5.75rem;">申请职位</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		filters: {
			join(args) {
				var str = '';
				for(let i = 0; i < args.length; i++) {
					str += args[i]
				}
				return str
			},
			clipTime(args) {
				return args==undefined?'':args.substr(0, 10)
			}
		},
		data() {
			return {
				items: [],
				uid: 0
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		methods:{
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop>300){
					document.getElementById("this_fixed").style.position = "static"
					document.getElementById("this_fixed").style.bottom = ""
				}else{
					document.getElementById("this_fixed").style.position = "fixed"
					document.getElementById("this_fixed").style.bottom = "0"
				}
			}
		},
		created: function() {
			this.uid = this.$route.params.id;
			let localAPI = "recruitAction!eachJsonQueryList.action?recruit.recruitId="+this.uid
			this.$http.get(localAPI).then(function(response) {
				this.items = response.data.rows[0]
				let str = '';
				let str1 = '';
				for(let i = 0; i < this.items.contents.length; i++) {
					str += '<p class="text">' + this.items.contents[i] + '。</p>'
				}
				for(let i = 0; i < this.items.educations.length; i++) {
					str1 += '<p class="text">' + this.items.educations[i] + '。</p>'
				}
				this.items.duty = str;
				this.items.educations = str1;
			});
		}
	}
</script>

<style scoped>
	.g-warp {
		font-size: 1rem;
		color: #64666b;
		background: #f2f2f2;
	}
	.m-content {
		background: #fff;
	}
	
	.m-top {
		margin-bottom: .5rem;
		background: #fff;
		padding: .875rem 1rem;
	}
	
	.text-white-50 h3 {
		display: block;
		width: 100%;
	}
	
	.text-white-50 p {
		line-height: 2.1rem;
		margin: 0;
	}
	
	.p-fixed-bottom {
		text-align: center;
		width: 100%;
		position: fixed;
		padding: 1rem 0;
		background: #fff;
		bottom: 0;
	}
	
	.text-white-50 {
		width: 100%;
		position: relative;
		color: #2C3E50!important;
		margin-bottom: 1rem;
	}
	
	.text-white-50>small {
		position: absolute;
		right: 0;
	}
	
	.col-xs {
		width: 33%;
		text-align: center;
	}
	
	.row {
		margin: 0;
		padding: .3rem;
	}
	
	.title {
		margin-bottom: 14px;
		font-size: 1.3rem;
		color: #313539;
	}
	
	.jobs-icon-blue-dots {
		margin: 4px;
	}
	
	.location {
		padding: 0 .6rem;
	}
	
	.p-money {
		font-size: 1.2em;
		color: #ffbc44;
	}
</style>