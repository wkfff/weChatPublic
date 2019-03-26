<template>
	<div>
		<div class="g-warp">
			<div id="js_article" class="rich_media">
				<div class="rich_media_inner">
					<div id="page-content" class="rich_media_area_primary">
						<!--duty-->
						<div id="img-content" v-if="uname==='duty'">
							<h2 class="rich_media_title">{{items.riverHeadName}}</h2>
							<div id="meta_content" class="rich_media_meta_list">
								<span class="rich_media_meta rich_media_meta_nickname" style="color: #009eff">智慧河道平台</span>
								<em id="publish_time" class="rich_media_meta rich_media_meta_text">责任河长</em>
								<em id="publish_time" class="rich_media_meta rich_media_meta_text">{{items.entryDate | clipTime}}</em>
							</div>
							<!--<img src="upload/images/employee/${riverHead.picture}" class="rounded mx-auto d-block" alt="">-->
							<div class="rich_media_content">
								<dl class="row row-river">
									<div class="list-item">
										<dt class="col-sm-3">河长编号：</dt>
										<dd class="col-sm-9">{{items.riverHeadCode}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长级别：</dt>
										<dd class="col-sm-9">{{items.grade}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长单位：</dt>
										<dd class="col-sm-9">{{items.foreignCompany}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长职务：</dt>
										<dd class="col-sm-9">{{items.office}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">所属区划：</dt>
										<dd class="col-sm-9">{{items.institution}}</dd>
									</div>
								</dl>
							</div>
							<div class="gray-line"></div>
							<div class="rich_media_content">
								<dl class="row row-river">
									<div class="list-item">
										<dt class="col-sm-3">河长联系人：</dt>
										<dd class="col-sm-9">{{items.contacts}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">联系人职务：</dt>
										<dd class="col-sm-9">{{items.contactsOffice}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长联系部门：</dt>
										<dd class="col-sm-9">{{items.department}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河段编码：</dt>
										<dd class="col-sm-9">{{items.reach}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长职责：</dt>
									</div>
									<div class="list-item">
										<dd class="col-sm-12">
											{{items.duty}}各级河长是包干河道的第一责任人，要切实履行管、治、保“三位一体”职责。其中，乡镇（街道）、村（社）级河长要更加突出管、保责任。
										</dd>
									</div>
								</dl>
							</div>
							<div class="gray-line"></div>
							<div class="rich_media_content">
								<div class="river-title">管辖河段</div>
								<dl class="row row-river row-river-two" v-for="(item,index) in reachList">
									<div class="list-item">
										<dt class="col-sm-3">序号：</dt>
										<dd class="col-sm-9">{{index}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河段名称：</dt>
										<dd class="col-sm-9">{{item.reachName}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河段编号：</dt>
										<dd class="col-sm-9">{{item.reachCode}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河段等级</dt>
										<dd class="col-sm-9">{{item.grade}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">所属区划</dt>
										<dd class="col-sm-9">{{item.institution}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河道起点</dt>
										<dd class="col-sm-9">{{item.startName}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河道终点</dt>
										<dd class="col-sm-9">{{item.endName}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河道长度(千米)</dt>
										<dd class="col-sm-9">{{item.reachLeng}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">水质</dt>
										<dd class="col-sm-9">{{item.waterQuality}}</dd>
									</div>
								</dl>
							</div>
						</div>
						<!--folk-->
						<div id="img-content" v-if="uname==='folk'">
							<h2 class="rich_media_title">{{items.name}}</h2>
							<div id="meta_content" class="rich_media_meta_list">
								<span class="rich_media_meta rich_media_meta_nickname" style="color: #009eff">智慧河道平台</span>
								<em id="publish_time" class="rich_media_meta rich_media_meta_text">民间河长</em>
								<em id="publish_time" class="rich_media_meta rich_media_meta_text">{{items.auditTime | clipTime}}</em>
							</div>
							<div class="rich_media_content">
								<dl class="row row-river">
									<div class="list-item">
										<dt class="col-sm-3">河段名称：</dt>
										<dd class="col-sm-9">{{reachList.reachName}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">联系人职务：</dt>
										<dd class="col-sm-9">{{reachList.office}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">所属区划：</dt>
										<dd class="col-sm-9">{{reachList.institution}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河段责任河长：</dt>
										<dd class="col-sm-9">{{reachList.riverHead}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长职责：</dt>
									</div>
									<div class="list-item">
										<dd class="col-sm-12">
											“民间河长”的工作职责是负责河道水质、卫生状况的日常巡查,对违法捕鱼、采砂、涉水违法搭建等监督举报。当好河道管理的巡查员、宣传员、参谋员、联络员、示范员。
										</dd>
									</div>
								</dl>
							</div>
						</div>
						<!---->
						
						<!--警长-->
						<div id="img-content" v-if="uname==='police'">
							<h2 class="rich_media_title">{{items.sheriffName}}</h2>
							<div id="meta_content" class="rich_media_meta_list">
								<span class="rich_media_meta rich_media_meta_nickname" style="color: #009eff">智慧河道平台</span>
								<em id="publish_time" class="rich_media_meta rich_media_meta_text">{{items.role}}</em>
							</div>
							<div class="rich_media_content">
								<dl class="row row-river">
									<div class="list-item">
										<dt class="col-sm-3">河长单位：</dt>
										<dd class="col-sm-9">{{items.foreignCompany}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">河长职务：</dt>
										<dd class="col-sm-9">{{items.office}}</dd>
									</div>
									<div class="list-item">
										<dt class="col-sm-3">所属河段：</dt>
										<dd class="col-sm-9">{{items.reachName}}</dd>
									</div>
								</dl>
							</div>
						</div>
						<!---->
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
				reachList: [],
				uname:''
			}
		},
		created: function() {
			let self = this
			self.uid = this.$route.params.id;
			self.uname = this.$route.params.uname;
			let localAPI = 'commonAction!commonJsonEmployeeContent.action?employeeId='+this.$route.params.id
			this.$http.get(localAPI).then(function(response) {
				if(self.uname == "duty"){
					this.items = response.data.riverHead[0]
					this.reachList = response.data.reachList
	        	}else if(self.uname == "folk"){
	        		this.items = response.data.folkRiverHead[0]
					this.reachList = response.data.reachList[0]
	        	}else if(self.uname == "police"){
	        		this.items = response.data.sheriff[0]
	        	}else{
	        		return false;
	        	}
			}, function(response) {});
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mx-auto{width: 100px;height: 100px;}
	.list-item{width: 100%;margin: .5rem 0;display: flex;}
	.row-river{margin-top: 22px;}
	.gray-line{height: .3rem;background: #f1f1f1;width: 100%;}
	.river-title{position: relative;padding-left: 1rem;font-weight: bold;font-size: 1rem;}
	.list-item .col-sm-9{color: #000;}
	dt{font-weight: normal;}
	.river-title:before{content: '';width: .3rem;height: 100%;background: #009EFF;position: absolute;left: 0;}
	.row-river-two{padding: 0 1rem;}
	.row-river-two .list-item{border-bottom: 1px dashed #ccc;}
	@media screen and (min-width: 1024px) {
		.rich_media {
			width: 740px;
			margin-left: auto;
			margin-right: auto;
		}
	}
	
	.rich_media_area_primary {
		background-color: #fff;
	}
	
	.rich_media_title {
		font-size: 22px;
		line-height: 1.4;
		margin-bottom: 14px;
		font-weight: 400;
		padding: 1rem;margin: 0;
	}
	
	.rich_media_meta_list {
		margin-bottom: 22px;
		line-height: 20px;
		word-wrap: break-word;
		word-break: break-all;
		position: relative;
		z-index: 1;
		padding: 0 1rem;
	}
	
	.rich_media_meta_text {
		color: rgba(0, 0, 0, 0.3);
	}
	
	.rich_media_meta_nickname {
		position: relative;
	}
	
	.rich_media_meta_list em {
		font-style: normal;
	}
	
	.rich_media_meta {
		display: inline-block;
		vertical-align: middle;
		margin: 0 10px 10px 0;
		font-size: 15px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0)
	}
	
	.rich_media_content {
		overflow: hidden;
		color: #333;
		word-wrap: break-word;
		text-align: justify;
		padding: 1rem;
	}
	
	.rich_media_content p {
		clear: both;
		min-height: 1em;
	}
</style>