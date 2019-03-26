<template>
	<div>
		<div class="g-warp">
			<div id="js_article" class="rich_media">
				<div class="rich_media_inner">
					<div id="page-content" class="rich_media_area_primary">
						<div id="img-content">
							<h2 class="rich_media_title">{{items.title}}</h2>
							<div id="meta_content" class="rich_media_meta_list">
								<span class="rich_media_meta rich_media_meta_text">{{items.newType}}</span>
								<span class="rich_media_meta rich_media_meta_nickname">智慧河道云</span>
								<em id="publish_time" class="rich_media_meta rich_media_meta_text">{{items.createTimeDay}}</em>
							</div>
							<img v-if="items.imageFile" :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+items.imageFile" style="margin-bottom: 1rem;" width="100%" />
							<div class="rich_media_content " v-html="items.content">
							</div>
							<div class="rich_media_footer">
								<p v-if="items.code">来源：{{items.code}}</p>
								<p v-if="items.code">作者：{{items.author}}</p>
								<p class="text">申明:本站转载此文、仅为传递更多信息为目的、文章版权归原作者所有。</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        data(){
        	return{
        		items:[]
        	}
        },
        created:function(){
        	this.uid = this.$route.params.id;
			let localAPI = "newManageAction!eachJsonQueryAllList.action?newManage.newManageId="+this.$route.params.id
        	this.$http.get(localAPI).then(function(response){
			    this.items = response.data.rows[0]
			});
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@media screen and (min-width: 1024px) {
		.rich_media{width: 740px;margin-left: auto;margin-right: auto;}
	}
	.rich_media_area_primary{padding: 20px 16px 12px;background-color: #fff;}
	.rich_media_title{font-size: 22px;line-height: 1.4;margin-bottom: 14px;font-weight: 400;}
	.rich_media_meta_list{margin-bottom: 22px;line-height: 20px;word-wrap: break-word;word-break: break-all;position: relative;z-index: 1;}
	.rich_media_meta_text{color: rgba(0,0,0,0.3);}
	.rich_media_meta_nickname{position: relative;}
	.rich_media_meta_list em{font-style: normal;}
	.rich_media_meta{display: inline-block;vertical-align: middle;margin: 0 10px 10px 0;font-size: 15px;-webkit-tap-highlight-color:rgba(0,0,0,0)}
	.rich_media_content {overflow: hidden;color: #333;font-size: 17px;word-wrap: break-word;text-align: justify;}
	.rich_media_content p{clear: both;min-height: 1em;}
	.rich_media_footer{margin-top: 1rem;}
	.rich_media_footer .text{color: #ccc;}
</style>