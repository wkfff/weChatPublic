<template>
	<div class="g-warp">
		<ul class="list-group list-group-flush">
			<li class="list-group-item" v-if="items.reachName"><span>河段名称:</span><span>{{items.reachName}}</span></li>
			<li class="list-group-item"><span>投诉主题:</span><span>{{items.taskType}}</span></li>
			<li class="list-group-item" v-if="items.outWorker"><span>上报人员:</span><span>{{items.outWorker}}</span></li>
			<li class="list-group-item" v-if="items.telePhone"><span>联系电话:</span><span>{{items.telePhone}}</span></li>
			<li class="list-group-item"><span>上报时间:</span><span>{{items.issueTime}}</span></li>
			<li class="list-group-item"><span>上报来源:</span><span>{{items.issueType}}</span></li>
			<li class="list-group-item"><span>问题描述:</span><span>{{items.issueDetail}}</span></li>
			<li class="list-group-item" v-if="items.issueAddress" @click="showMap1">
				<div class="card-icon card-icon-position"></div>
				<div class="e-over" :data-lon="items.geoLonGCJ" :data-lat="items.geoLatGCJ">{{items.issueAddress}}</div>
			</li>
			<li class="list-group-item card-content section__cont_img">
				<img :preview="items.taskId" v-for="itemImg in imageList" :src="'upload/images/task/'+itemImg" class="rounded imgList">
			</li>
		</ul>
		<div class="do-status">
			<div class="txt">受理状态:{{items.taskStatus}}</div>
			<hr />
			<div v-if="items.outAccepter">受理人:{{items.outAccepter}}</div>
		</div>
		<div v-if="rate_value">
			<h6 style="text-align: center;margin: 15px;">投诉人评价</h6>
			<div class="do-status">
				<div class="m-rate"><el-rate disabled="true" v-model="rate_value" show-text></el-rate></div>
				<hr />
				<div v-if="items.outAccepter">投诉人留言:{{items.outAccepter}}</div>
			</div>
		</div>
		<div class="mapModal1" id="mapBox1">
			<div class="map-close1">
				<button @click="returnPostion1" type="button" class="btn btn-outline-primary btn-sm" style="float: left;">返回位置</button>
				<span>位置信息</span>
				<button @click="closeMapFun1" type="button" class="btn btn-outline-primary btn-sm">关闭</button>
			</div>
			<div class="map-info1">
				{{riverAddr1}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				items: [],lon1:'',lat1:'',marker1:null,
				mapContainer1:null,riverAddr1:'',
				geocoder1:null,imageList:[],
				imgList:'',rate_value:''
			}
		},
		created: function() {
			var that = this;
			let localAPI = "taskAction!eachJsonQueryOneForBrowse.action?task.taskId=" + this.$route.params.id
			this.$http.get(localAPI).then(function(response) {
				that.items = response.data.task;
				that.rate_value = response.data.task.score;
				that.imageList = that.items.issueImageOne.split(',');
				that.$previewRefresh();
			}, function(response) {});

		},
		
		mounted(){
			var that = this;
			that.$previewRefresh();
			//高德地图初始化
			this.mapContainer1 = new AMap.Map('mapBox1', {
		        resizeEnable: true,
		        zoom:16,
		        center:[120.25869520399397,30.181276041667]
		   });
		    // 构造点标记
			this.marker1 = new AMap.Marker({
			    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
			    position: [120.25869520399397,30.181276041667]
			});
		    //地图加载完成后 绑定拖动地图事件
	        this.mapContainer1.on('complete', function() {
				that.mapContainer1.on('dragend', that.showInfoDragend1);
		    });
		    //注册精细定位插件
			this.reMapCenter1();
		},
		methods: {
			closeMapFun1:function(){
				$('#mapBox1').hide();
			},
			showMap1:function(e){
				$('#mapBox1').show();
				this.lon1 = e.target.dataset.lon;
				this.lat1 = e.target.dataset.lat;
				this.returnPostion1();
			},
			returnPostion1:function(e){
				var that = this;
				this.getAddress1(that.lon1,that.lat1);
				this.mapContainer1.remove(that.marker1);
			    this.marker1 = new AMap.Marker({
				    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
				    position: [that.lon1,that.lat1]
				});
				this.mapContainer1.add(that.marker1);
			},
			getAddress1:function(v1,v2){
				var This = this;
			    if(!This.geocoder1){
		            This.geocoder1 = new AMap.Geocoder();
		        }
		    	this.mapContainer1.setCenter([v1, v2]);
		        This.geocoder1.getAddress(This.mapContainer1.getCenter(), function(status, result) {
		            if (status === 'complete'&&result.regeocode) {
		                This.riverAddr1 = result.regeocode.formattedAddress;
		            }else{
		            	//alert(JSON.stringify(result))
		            }
		        });
			},
			onComplete1: function(data) {
				this.mapContainer1.setCenter([data.position.lng, data.position.lat]);
				//根据经纬度获取地址
				this.getAddress();
			},
			onError1: function(data) {
				//alert("定位失败，请手输地址。");
			},
			reMapCenter1: function(){
				var that = this;
				var geolocation;
				this.mapContainer1.plugin('AMap.Geolocation', function () {
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
				    AMap.event.addListener(geolocation, 'complete', that.onComplete1);//返回定位信息
				    AMap.event.addListener(geolocation, 'error', that.onError1);      //返回定位出错信息
				});
			}
		}

	}
</script>
<style scoped>
	.do-status,.table-box{background: #fff;}
	.g-warp{background: #efefef;font-size: 16px;}
	.do-status{padding: 10px;text-align: center;}
	.do-status .txt{background: #5998cb;padding: 5px 30px;width: 90%;margin: 0 auto;color: #fff;}
	.table td, .table th{padding: 5px;}
	.m-rate{}
	.list-group-item{display: flex;flex-direction: row;}
	.list-group-item span:first-child{word-break: keep-all;}
	.list-group-item span:last-child{padding: 0 10px;}
	.card-icon-position{background-image: url('../../static/images/point.png');width: 30px;height: 20px;position: absolute;left: 15px;top: 12px;
	background-size:contain;background-repeat: no-repeat;}
	.e-over{padding-left: 20px;}
	.mapModal1{position: fixed;top: 0;left: 0;background: #fff;width: 100vw;height: 100vh;z-index: 997;display: none;}
	.map-close1{position: absolute;top: 0;width: 100%;background: #fff;z-index: 998;height: 39px;line-height: 39px;padding: 0 5px;text-align: center;font-size: 16px;}
	.map-close1 button{float: right;padding: 5px 30px;margin-top: 3px;}
	.map-info1{position: absolute;bottom: 0;width: 100%;background: #fff;z-index: 998;min-height: 20px;line-height: 20px;padding: 6px 15px;}
	.section__cont_img {display: flex;display: flex;flex-wrap:wrap;flex-grow:3;}
	.section__cont_img .imgList{width: 28%;height: 80px;margin: 8px;}
</style>