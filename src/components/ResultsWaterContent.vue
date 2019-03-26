<template>
	<div id="g-warp">
		 <div class="ResultsWaterContent">
		   <h5>{{items.title}}</h5>
		   <p>
		   	<span>{{items.applicant}}</span>
		   	<span>{{items.createTime | clipTime}}</span></p>
		    <div>
		   	  <img class="oImg img-responsive center-block" :src="'http://www.zhihuihedao.cn/upload/images/newManage/'+items.imageFile" />		
		   	</div>
		   <div v-html="items.content"></div>
		 </div>
	</div>
</template>
<script>
	export default{
		filters: {
			clipTime(args) {
				return args==undefined?'':args.substr(0, 10)
			}
		},
		data(){
			return{
				items:[],
			}
		},
		created:function(){
			let Results = "newManageAction!eachJsonQueryAllList.action?newManage.newManageId="+this.$route.params.id
			this.$http.get(Results).then(function(response) {
				this.items = response.data.rows[0];
				var str= this.items.content;
				    //正则去掉内容的空格 样式 标签 符号
			        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
			        str = str.replace(/^\"|\"$/g,'');   //去掉双引号
			        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
			        str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
			        str = str.replace(/&nbsp;/ig,'');//去掉&nbsp;
		            this.items.content=str;
      		}, function(response) {
				alert("请求错误")
			});
   },
}
</script>
<style scoped>
	#g-warp{padding:20px;}
	#g-warp .oImg{width:100%;vertical-align: baseline;}
	.ResultsWaterContent{font-size: 1rem;}
</style>