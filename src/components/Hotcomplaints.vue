<template>
	<div class="el-container">
		<div class="el-main">
			<!--mescroll滚动区域的基本结构-->
		    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
		      <!--内容...-->
		    	<div class="cont_task_list" v-for="(item,index) in dataList">
					<router-link tag="div" :key="item.taskId" :to="'/HotcomplaintsContent/'+item.taskId" class="card-content card-content-title">{{item.taskType}}</router-link>
					<div class="card-content card-content-icon">
						<div class="card-icon"></div>{{item.issueType}} <div class="card-status">{{item.taskStatus}}</div>
					</div>
					<div class="card-content card-content-detail" v-if="item.issueDetail">{{item.issueDetail}}</div>
					<div class="card-content section__cont_img">
						<img v-for="itemImg in item.image" :preview="item.taskId" :imgurl="'/upload/images/task/'+itemImg" src="../../static/images/loading9.gif" class="rounded imgList">
					</div>
					<div class="card-content card-content-icon" v-if="item.issueAddress" @click="showMap">
						<div class="card-icon card-icon-position"></div>
						<div class="e-over" :data-lon="item.geoLonGCJ" :data-lat="item.geoLatGCJ">{{item.issueAddress}}</div>
					</div>
					<div class="card-content facebook-date-time">{{item.issueTime}}</div>
				</div>
		    </mescroll-vue>
		</div>
		
		<div class="m-select">
			<el-select v-model="taskStatus" size="mini" placeholder="请选择" @change="taskStatusChange">
			    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="issueTypes" size="mini" placeholder="请选择" @change="taskStatusChange">
			    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		<router-link class="new-task" :to="'/Task/'"></router-link>
		<div class="mapModal" id="mapBox">
			<div class="map-close">
				<button @click="returnPostion" type="button" class="btn btn-outline-primary btn-sm" style="float: left;">返回位置</button>
				<span>位置信息</span>
				<button @click="closeMapFun" type="button" class="btn btn-outline-primary btn-sm">关闭</button>
			</div>
			<div class="map-info">
				{{riverAddr}}
			</div>
		</div>
	</div>
</template>
<script>
	/*
	 * commonAction!commonJsonQueryTaskList.action?task.taskStatus&task.issueType 
	 * task.issueTypes=1,8,10,11,13
	 * 
	 * 0河长巡查 1随手拍 2上级督查 3公众建议 4民间河长巡查 5公众投诉
	 * 6四平台上报 7智慧萧山巡查 8智慧萧山上报 9河道管理单位 10智慧河道云平台微信公众号上报
	 * 11五水共治微信公众号上报 12水质报警 13钉钉 14浙里办上报
	 * 
	 * taskStatus 5处理中 3已处理
	 */
	
	import MescrollVue from 'mescroll.js/mescroll.vue'
	export default {
		components: {
			MescrollVue
		},
		data() {
			return {
				options: [
					{value: '0',label: '全部'}, 
					{value: '5',label: '处理中'}, 
					{value: '3',label: '已处理'}
				],
				options2: [
					{value: '1,8,10,11,13',label: '全部'}, 
					{value: '1',label: '随手拍'}, 
					{value: '8',label: '智慧萧山上报'}, 
					{value: '10',label: '微信公众号上报'}, 
					{value: '11',label: '五水共治上报'}, 
					{ value: '13',label: '钉钉上报'}
				],
	            taskStatus: '0',
	            issueTypes: '1,8,10,11,13',
				title: "热门投诉",
				mescroll: null,lon:'',lat:'',marker:null,
				mapContainer:null,riverAddr:'',
				geocoder:null,
            	dataList: [],
			    mescrollDown:{},
			    mescrollUp: { callback: this.upCallback ,lazyLoad: {use: true}}
			}
		},
		mounted(){
			var that = this;
			//高德地图初始化
			this.mapContainer = new AMap.Map('mapBox', {
		        resizeEnable: true,
		        zoom:16,
		        center:[120.25869520399397,30.181276041667]
		   });
		    // 构造点标记
			this.marker = new AMap.Marker({
			    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
			    position: [120.25869520399397,30.181276041667]
			});
		    //地图加载完成后 绑定拖动地图事件
	        this.mapContainer.on('complete', function() {
				that.mapContainer.on('dragend', that.showInfoDragend);
		    });
		    //注册精细定位插件
			this.reMapCenter();
		},
		methods: {
			closeMapFun:function(){
				$('#mapBox').hide();
			},
			showMap:function(e){
				$('#mapBox').show();
				this.lon = e.target.dataset.lon;
				this.lat = e.target.dataset.lat;
				this.returnPostion();
			},
			returnPostion:function(e){
				var that = this;
				this.getAddress(that.lon,that.lat);
				this.mapContainer.remove(that.marker);
			    this.marker = new AMap.Marker({
				    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
				    position: [that.lon,that.lat]
				});
				this.mapContainer.add(that.marker);
			},
			getAddress:function(v1,v2){
				var This = this;
			    if(!This.geocoder){
		            This.geocoder = new AMap.Geocoder();
		        }
		    	this.mapContainer.setCenter([v1, v2]);
		        This.geocoder.getAddress(This.mapContainer.getCenter(), function(status, result) {
		            if (status === 'complete'&&result.regeocode) {
		                This.riverAddr = result.regeocode.formattedAddress;
		            }else{
		            	//alert(JSON.stringify(result))
		            }
		        });
			},
			onComplete: function(data) {
				this.mapContainer.setCenter([data.position.lng, data.position.lat]);
				//根据经纬度获取地址
				this.getAddress();
			},
			onError: function(data) {
				//alert("定位失败，请手输地址。");
			},
			reMapCenter: function(){
				var that = this;
				var geolocation;
				this.mapContainer.plugin('AMap.Geolocation', function () {
				    geolocation = new AMap.Geolocation({
				        enableHighAccuracy: true,//是否使用高精度定位，默认:true
				        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				        showButton: true,        //显示定位按钮，默认：true
				        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
				        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
				        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
				        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
				        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				    });
				    geolocation.getCurrentPosition();
				    AMap.event.addListener(geolocation, 'complete', that.onComplete);//返回定位信息
				    AMap.event.addListener(geolocation, 'error', that.onError);      //返回定位出错信息
				});
			},
			taskStatusChange(){
				var that = this;
				//重置数据
				this.mescroll.resetUpScroll( that.isShowLoading );
			},
		    upCallback(page,mescroll){
		    	var that=this,taskStatus;
		    	if(that.taskStatus == '0'){
		    		taskStatus = ''
		    	}else{
		    		taskStatus = that.taskStatus;
		    	}
		    	this.$http.get("commonAction!commonJsonQueryTaskList.action?task.taskStatus="+taskStatus+"&task.issueTypes="+that.issueTypes, {
			        params: {
			        	page: page.num, 
			        	rows: page.size
			        }
		    	}).then((response) => {
			        let arr = response.body.rows;
			        if (page.num === 1) this.dataList = []
			        this.dataList = this.dataList.concat(arr)
			        this.$nextTick(() => {
			          mescroll.endSuccess(arr.length)
			        })
			        
					that.$previewRefresh();
		    	}).catch((e) => {
		       		mescroll.endErr()
		    	})
			},
	        mescrollInit (mescroll) {
		    	this.mescroll = mescroll;
		    }
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.m-select{height: 30px;position: fixed;bottom: 0;display: flex;background: #fff;flex-direction: row;flex-grow:2;width: 100%;}
	.m-select .el-select{width: 50%;margin-top: 1px;}
	#g-warp {height: 100%;}
	.text-muted{display: none;}
	.mescroll{position: fixed;top: 0;bottom: 0;height: auto;padding: 15px;}
	.el-main{padding: 0;height: 100vh;}
	.card-content{margin-bottom: 10px;}
	.cont_task_list{border-bottom: 1px solid #efefef;margin-top: 15px;}
	.card-content-title{font-size: 16px;font-weight: bold;color: #2d86cc;}
	.card-content-icon{padding-left: 28px;position: relative;height: 26px;line-height: 26px;color: #7d7d7d;}
	.card-icon{background-image: url('../../static/images/zhixiang.png');width: 30px;height: 20px;position: absolute;left: 0;top: 2px;background-size:contain;background-repeat: no-repeat;}
	.card-status{background: #ead9ad;border-radius: 3px;position: absolute;right: 0;top: 0;padding: 0 10px;color: #c78010;}
	.section__cont_img {display: flex;display: flex;flex-wrap:wrap;flex-grow:3;}
	.section__cont_img .imgList{width: 28%;height: 80px;margin: 8px;}
	.card-icon-position{background-image: url('../../static/images/point.png');}
	.facebook-date-time{color: #7d7d7d;padding: 10px;}
	.e-over{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.card-content-detail{font-size: 14px;padding: 5px;color: #000;font-size: 16px;}
	.mapModal{position: fixed;top: 0;left: 0;background: #fff;width: 100vw;height: 100vh;z-index: 997;display: none;}
	.map-close{position: absolute;top: 0;width: 100%;background: #fff;z-index: 998;height: 39px;line-height: 39px;padding: 0 5px;text-align: center;font-size: 16px;}
	.map-close button{float: right;padding: 5px 30px;margin-top: 3px;}
	.map-info{position: absolute;bottom: 0;width: 100%;background: #fff;z-index: 998;min-height: 20px;line-height: 20px;padding: 6px 15px;}
	.new-task{background: #2d7ab5 url('../../static/images/add-task.png') 12px 12px no-repeat;position: fixed;right: 10px;bottom: 50px;width: 40px;height: 40px;border-radius: 50%;cursor: pointer;}
</style>