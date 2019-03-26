<template>
	<div>
		<vue-loading id="isloadShow"></vue-loading>
	
	<div class="g-task">
		<div class="popup popup-services" id="popup">
			<div class="content-block mapIndex" @click="closeMapWithYes">您选择的位置是：{{resAddress}}</div>
			<p class="btn btn-warning mapIndexClose" @click="closeMapWithYes">关闭地图</p>
			<div class="center-img">
				<img src="static/images/icon_location.png" />
			</div>
			<div id="mapTaskBox"></div>
		</div>
		<div class="alert alert-primary" id="msgInfo" role="alert">提交成功!</div>
		<div class="g-warp" style="padding: 25px;">
			<form class="needs-validation" novalidate @submit.prevent="submit($event)" enctype="multipart/form-data" method="post">
				<input type="hidden" name="task.outWorker.employeeId" v-model="openId" />
				<input type="hidden" name="task.institution.institutionId" v-model="institutionId" />
				<input type="hidden" name="task.geoLon" v-model="latitude" />
				<input type="hidden" name="task.geoLat" id="jslongitude" v-model="longitude" />
				<div class="form-row">
					<label>发生地点<small>(点击获取当前位置)</small></label>
					<div @click="showPlace" class="btn btn-primary btn-showPlace">定位</div>
					<input v-model="resAddress" type="text" readonly="" name="task.issueAddress" class="form-control" value="" required>
					<div class="valid-feedback">
						已选择!
					</div>
					<div class="invalid-feedback">
						请选择发生地点!
					</div>
				</div>
				<div class="form-row">
					<label>选择河道<small>(定位后加载附近河段)</small></label>
					<select name="task.reach.reachId" @change="changeTheme" v-model="riverReachId" class="custom-select" id="validationCustom01" required>
						<option value="">请选择</option>
						<option v-for="item in riverNameList" :value="item.reachId">{{item.reachName}}</option>
					</select>
					<div class="valid-feedback">
						已选择!
					</div>
					<div class="invalid-feedback">
						请选择河道!
					</div>
				</div>
				<div class="form-row">
					<label>联系方式</label>
					<input type="text" placeholder="请输入电话号码" name="task.telephone" class="form-control" value="" required>
					<div class="valid-feedback">
						已选择!
					</div>
					<div class="invalid-feedback">
						请选择投诉主题!
					</div>
				</div>
				<!--<div class="form-row">
					<label>姓名<small>(可以选择匿名)</small></label>
					<div @click="toggleAnonymous" class="btn btn-success btn-anoymous">匿名上报</div>
					<input type="text" name="task.name" class="form-control" v-model="isAnonymousText" v-if="!isAnonymous" required>
					<input type="text" name="task.name" readonly class="form-control" value="匿名" v-model="isAnonymousText" v-if="isAnonymous" required>
					<input type="hidden" name="task.anonymous" id="checkAnonymousVal" value="0" v-model="isAnonymousVal" />
					<div class="valid-feedback">
						填写完成!
					</div>
					<div class="invalid-feedback">
						请填写姓名或选择匿名!
					</div>
				</div>-->
				<div class="form-row">
					<label>投诉内容</label>
					<textarea name="task.issueDetail" class="form-control" rows="" cols="" required></textarea>
					<div class="valid-feedback">
						填写完成!
					</div>
					<div class="invalid-feedback">
						请填写投诉内容!
					</div>
				</div>
				<div class="form-row">
					<label>上传图片</label>
				</div>
				<div class="custom-file">
					<input type="button" @click="choseImg" @change="tirggerFile($event)" class="custom-file-input">
					<label class="custom-file-label" for="validatedCustomFile">{{fileName}}</label>
					<div class="valid-feedback" style="display: block;">
						请尽量上传jpeg、png格式
					</div>
				</div>
				<div class="row row-img-thum">
					<img v-for="(value, key) in imagsList" :src="value" class="img-thumbnail" alt="">
				</div>
				<button class="btn btn-primary mb-2" type="submit" id="isAllowSub" disabled="disabled">提交</button>
			</form>
		</div>
	</div>
	</div>
</template>

<script>
	import vueLoading from '@/components/loading.vue'
	export default {
		data() {
			return {
				openId:'',
				riverCover:null,
				institutionId:'',
				fileName: '选择图片...',
				items: [],
				imagsList: [],
				latitude: 0,
				longitude: 0,
				isAnonymous: false,
				isAnonymousText: '',
				isAnonymousVal: 0,
				chooseItem: '',
				riverReachId: '',
				riverNameList: [],
				riverThemeList: ['无主题', '水体水岸有漂浮垃圾、废弃物、病死动物', '河底淤泥堆积或河岸有障碍物', '水体气味或颜色异常', '有新增排污口',
					'排污口排出水体颜色异常，有异味', '排污口标示缺失', '随意倾倒垃圾、固废垃圾；河道违规采砂，电鱼，毒鱼', '堤坝、水闸设施杂乱；损毁，开裂',
					'河长公示牌、宣传牌、里程碑、界桩等标识标牌破损、缺失', '其他'
				],
				map: null,
				compressData: [],
				resAddress: '',
				geocode: null,
				lnglat: null,
				marker: null
			}
		},
		components: {
			vueLoading
		},
		methods: {
			onLoad: function() {
				let that = this
				that.longitude = 120.27967
				that.latitude = 30.2043
				that.map = new T.Map('mapTaskBox');
				that.lnglat = new T.LngLat(that.longitude, that.latitude);
				that.map.centerAndZoom(that.lnglat, 17);
				that.marker = new T.Marker(that.lnglat);
				//向地图上添加标注
				that.map.addOverLay(that.marker);

				that.geocode = new T.Geocoder();
				that.geocode.getLocation(that.lnglat, this.searchResult);

				//滑动事件
				that.map.addEventListener("touchend", function(e) {
					that.geocode.getLocation(e.lnglat, that.searchResult);
				});
//				let riverListAPI = "reachAction!commonJsonQueryListNear.action?lon="+that.longitude+"&lat="+that.latitude+"&length="+0.2
				/*
				 * 绘制面
				 */
				let pointDatas = that.riverCover;
				for(let i=0;i<pointDatas.length;i++){
					let sDatastr = pointDatas[i].sdata.substr(16).split(')))')[0].split(', ');
					let points = [];
					let reachName = pointDatas[i].reachName;
					console.log(pointDatas[i].reachName+"1111");
					for(var j = 0; j < sDatastr.length; j++) {
						var xy = sDatastr[j].split(' ');
						points.push(new T.LngLat(xy[0], xy[1]))
						if(j == 50){
							that.map.addOverLay(new T.Label({
						        text: reachName,
						        position: new T.LngLat(xy[0], xy[1]),
						        offset: new T.Point(-40, 0)
						    }))
						}
					}
					//向地图上添加河道面
					that.map.addOverLay(new T.Polygon(points, {
						color: "#fd7e14",
						weight: 1,
						opacity: 1,
						fillColor: "#dc3545",
						fillOpacity: 1
					}));
					/*let lgn=new T.LngLat(points[0].lng, points[points.length/2].lat);
					that.map.addOverLay(new T.Label({
				        text: pointDatas[i].reachName,
				        position: lgn,
				        offset: new T.Point(-40, 0)
				    }))*/
				}
			},
			searchResult: function(result) {
				let that = this
				if(result.getStatus() == 0) {
					that.resAddress = result.getAddressComponent().address;
				}
			},
			tirggerFile: function(event) {
				let file = event.target.files;
				this.fileName = "已选择"+file.length+"个";
			},
			choseImg:function(){
				var that = this
				/*wx.chooseImage({
					count: 9, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						that.imagsList = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					}
				});*/
			},
			toggleAnonymous: function() {
				this.isAnonymous = !this.isAnonymous
				if(this.isAnonymous){
					this.isAnonymousText = '匿名'
					this.isAnonymousVal = 1
				}else{
					this.isAnonymousVal = 0
					this.isAnonymousText = ''
				}
			},
			closeMapWithYes: function() {
				document.querySelector('#isloadShow').style.display = "block"
				document.getElementById("popup").style.left = '200%'
				this.latitude = this.map.getCenter().getLat();
				this.longitude = this.map.getCenter().getLng();
				let that = this
				let riverNameListAPI = "reachAction!commonJsonQueryListNear.action?length=5&lon=" + this.longitude + "&lat=" + this.latitude
				this.$http.get(riverNameListAPI).then(function(response) {
					document.querySelector('#isloadShow').style.display = "none"
					that.riverNameList = response.data.rows
				});
			},
			showPlace: function() {
				document.getElementById("popup").style.left = 0;
				let that = this;
				that.onLoad()
				/*wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function (res) {
						that.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						that.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						that.onLoad()
					}
				});*/
			},
			changeTheme: function() {
//				this.riverReachId
			},
			submit: function(event) {
				document.querySelector('#isloadShow').style.display = "block"
				let formData = new FormData(document.querySelector('form'));
				let that = this;
				var i = 0, length = that.imagsList.length;
			    var serverId = [];
			    function upload() {
			      /*wx.uploadImage({
			        localId: that.imagsList[i],
			        success: function (res) {
			          i++;
//			          alert('已上传：' + i + '/' + length);
			          serverId.push(res.serverId);
			          if (i < length) {
			            upload();
			          }else{
			          	formData.append("task.weixinCode", serverId);
									that.$http.post('taskAction!eachJsonInsert.action?task.issueType=10', formData, {
										'Content-Type': 'Multipart/form-data'
									}).then(function(res) {
										if(res.data.result == 'success') {
											document.querySelector('#msgInfo').style.display = "block"
											let t
											clearTimeout(t)
											t = setTimeout(function() {
												document.location.reload(true);
											}, 3000);
										}
									})
			          }
			        },
			        fail: function (res) {
			          alert("上传图片失败");
			        }
			      });*/
			    }
			    upload();
			}
		},
		created: function() {
			
			let riverListAPI = "static/riverPlan.json"
			this.$http.get(riverListAPI).then(function(response) {
				this.riverCover = response.data.rows
			});
//			let configAPI = "commonAction!commonJsonForWeixinJSSDK.action?url=" + window.location.href
			/*
			 * 微信jsSDK配置
			 */
			/*this.$http.get(configAPI).then(function(response) {
				wx.config({
					debug: false,
					appId: response.data.appId,
					timestamp: response.data.timestamp,
					nonceStr: response.data.nonceStr,
					signature: response.data.signature,
					jsApiList: ['getLocation', 'chooseImage', 'uploadImage']
				});
			});*/
		},
		mounted() {
			let that = this
			/*let employeeIdAPI = "commonAction!commonJsonForWeixinMiniProgramCheck.action?openId="+sessionStorage.getItem("openId")
			this.$http.get(employeeIdAPI).then(function(response) {
				that.openId = response.data.employeeId
				that.institutionId = response.data.institution
			});*/
			var forms = document.getElementsByClassName('needs-validation');
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('change', function(event) {
					form.classList.add('was-validated');
					let isAllowSub = document.getElementById("isAllowSub")
					if(form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
						isAllowSub.setAttribute("disabled", "true");
					}
					if(form.checkValidity() === true) {
						isAllowSub.removeAttribute('disabled');
					}
				}, false);
			});
		}
	}
</script>

<style scoped>
	.g-task{overflow: hidden;position: relative;width: 100%;height: 100%;background: url('../../static/images/bg_task.jpg') 0 0 no-repeat;
	background-size: 100% auto;padding-top: 40%;}
	.g-warp{background: #fff;}
	.mb-2 {
		margin-top: 2rem;
		width: 100%;
		margin-bottom: 5rem;
	}
	
	.cover-heading {
		text-align: center;
		text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, .5);
		margin-bottom: 2rem;
	}
	
	.form-row {
		justify-content: space-between;
	}
	
	.custom-file-label::after {
		line-height: 2;
		content: "选择图片"!important;
	}
	
	.custom-file-label {
		line-height: 2;
	}
	
	.btn-showPlace {
		padding: 0 2rem;
		font-size: 12px;
		height: 26px;
		line-height: 26px;
		margin-top: .3rem;
		margin-left: 3rem;
	}
	
	.popup {
		position: absolute;
		left: 200%;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 800;
		background: #fff;
	}
	
	#mapTaskBox {
		width: 100%;
		height: 100%
	}
	.row-img-thum img{mx-width: 50%;height: 12rem;margin: 1rem;}
	.mapIndex {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 999999;
		height: 2rem;
		background: #0951be;
		width: 100%;
		margin: 0;
		color: #fff;
		line-height: 2rem;
		padding: 0 .7rem;
		overflow: hidden;
	}
	
	.mapIndexClose {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		height: 2rem;
		background: #f6383a;
		width: 100%;
		margin: 0;
		border: none;
		color: #fff;
		border-radius: 0;
		line-height: 1.3rem;
		text-align: center;
		font-size: .8rem;
	}
	
	.icon-refresh:before {
		padding-right: .2rem;
	}
	
	.center-img {
		position: relative;
		top: 50%;
		left: 50%;
		width: 40px;
		margin-left: -20px;
		margin-top: -15px;
		z-index: 9999;
	}
	
	.center-img img {
		position: absolute;
		top: -30px;
		left: 1px;
		width: 40px;
	}
	
	.btn-anoymous {
		padding: 0 2rem;
		font-size: 12px;
		height: 26px;
		margin-top: .3rem;
		margin-left: 3rem;
		line-height: 1.5rem;
	}
	
	.alert-primary {
		z-index: 9999;
		display: none;
	}
</style>