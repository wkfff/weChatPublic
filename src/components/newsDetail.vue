<template>
	<div id="g-warp">
		 <div>
		   <h5>{{items.title}}</h5>
		   <p>
		   	<span>{{items.applicant}}</span>
		   	<span>{{items.times}}</span></p>
		    <div>
		   	  <img class="oImg img-responsive center-block" :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+items.imageFile" />		
		   	</div>
		   <div v-html="items.content"></div>
		 </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				items:[],
					
			}
		},
		created:function(){
//			var newsID=this.$route.query.id;
//			let Results = "./static/newsDetail.json?newManageId="+newsID
			this.uid = this.$route.params.id;
			let localAPI = "newManageAction!eachJsonQueryAllList.action?newManage.newManageId="+this.$route.params.id
			this.$http.get(Results).then(function(response) {
				this.items = response.data.rows[0];
      		}, function(response) {
				alert("请求错误")
			});
		
		}

	}
</script>
<style scoped>
	#g-warp{padding:20px;}
	#g-warp .oImg{width:100%;vertical-align: baseline;}
</style>