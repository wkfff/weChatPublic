<template>
	<div style="font-size: 14px;">
		<vue-loading id="isloadShow"></vue-loading>
		<div class="alert alert-primary" id="msgInfo" role="alert">
			<strong>提示!</strong><span class="msg_cont"></span>
			<button type="button" class="close" @click="hideMsg">
				<span>&times;</span>
			</button>
		</div>
		<div class="alert alert-warning " id="msgBoxCont" role="alert">
			<strong>提示!</strong><span class="msg_cont"></span>
		</div>
		<div class="mapModal" id="mapBox">
			<div class="markerCenter"></div>
			<div class="map-close">
				<span>选择定位点</span><button @click="closeMapFun" type="button" class="btn btn-outline-primary btn-sm">确定</button>
			</div>
			<div class="map-info">
				您当前的定位位置为：{{riverAddr}}
			</div>
		</div>
		<div class="g-task" v-show="isActive == '0'">
			<div class="g-warp" style="padding: 25px;">
				<form class="needs-validation" novalidate @submit.prevent="submit($event)" enctype="multipart/form-data" method="post">
					<input type="hidden" name="task.issueType" id="task.issueType" value="10" />
					<input type="hidden" name="task.geoLon" id="geoLon" value="" />
					<input type="hidden" name="task.geoLat" id="geoLat" value="" />
					<!--<div class="form-row">
						<label>搜索河名 (可不填)</label>
						<div class="input-group mb-3">
							<input type="text" v-model="riverName" class="form-control" placeholder="输入河名" aria-describedby="basic-addon2">
							<div class="input-group-append" @click="showPlace">
								<span class="btn btn-primary input-group-text" id="basic-addon2">搜索</span>
							</div>
						</div>
					</div>
					<div style="display: none;" id="triggerName"></div>
					<div class="form-row">
						<input type="hidden" class="form-control" name="task.reach.reachId" v-model="riverReachId" />
					</div>-->
					<div class="form-row">
						<label class="s_title">地址 (必填)</label>
						<div class="input-group mb-3">
							<textarea name="task.issueAddress" style="width: 100%;min-height: 40px;" v-model="riverAddr" class="form-control" rows="" cols="" required></textarea>
							<!--<input v-if="cantPosition = false" type="button" name="task.issueAddress" v-model="riverAddr" class="form-control" placeholder="详细地址" required>-->
							<!--<input v-if="cantPosition = true" style="width: 100%" type="text" name="task.issueAddress" v-model="riverAddr" class="form-control" placeholder="详细地址" required>-->
							<button style="margin-top: 5px;" @click="showMap" type="button" class="form-control btn-primary">打开地图查看位置</button>
							<div class="valid-feedback" id="validationReach-va">
								已填写!
							</div>
							<div class="invalid-feedback" id="validationReach-in">
								请选择地址!
							</div>
						</div>
					</div>
					<!--<input type="hidden" name="task.issueAddress" v-model="riverAddr" class="form-control">-->
					<div class="form-row">
						<label class="s_title">联系方式 (必填)</label>
						<input type="text" name="employee.loginName" v-model="loginName" class="form-control" id="telephone" placeholder="请填写手机号码" value="" required>
						<div class="valid-feedback" id="telephone-feedback">
							填写正确!
						</div>
						<div class="invalid-feedback" id="telephone-feedback-va">
							请填写正确格式的手机号!
						</div>
					</div>
					<div class="form-row">
						<label class="s_title">问题主题</label>
					</div>
					<div class="form-row">
							<div class="s-title">水体水岸</div>
							<input type="hidden" name="task.taskType" v-model="taskTypeVal" value="" />
							<div class="col-50">
								<div class="list-check" style="width: 70%;">
									<input type="checkbox" id="checkbox1" value="漂浮垃圾、废弃物、病死动物" /> <label for="checkbox1">漂浮垃圾 废弃物 病死动物</label>
								</div>
								<div class="list-check" style="width: 30%;">
									<input type="checkbox" id="checkbox2" value="河底淤积" /> <label for="checkbox2">河底淤积</label>
								</div>
							</div>
							<div class="col-50">
								<div class="list-check" style="width: 70%;">
									<input type="checkbox" id="checkbox4" value="水体气味或颜色异常" />
									<label for="checkbox4">水体气味或颜色异常</label>
								</div>
								<div class="list-check" style="width: 30%;">
									<input type="checkbox" id="checkbox3" value="障碍物" /> <label for="checkbox3">障碍物</label>
								</div>
							</div>
							<div class="s-title">排污口</div>
							<div class="col-50">
								<div class="list-check">
									<input type="checkbox" id="checkbox11" value="新增入河排污口" />
									<label for="checkbox11">新增入河排污口</label>
								</div>
								<div class="list-check">
									<input type="checkbox" id="checkbox41" value="排污口标识缺失" />
									<label for="checkbox41">排污口标识缺失</label>
								</div>
							</div>
							<div class="col-50">
								<div class="list-check" style="width: 100%;">
									<input type="checkbox" id="checkbox21" value="排出水体颜色异常、异味" />
									<label for="checkbox21">排出水体颜色异常、异味</label>
								</div>
							</div>
							<div class="s-title">涉水活动</div>
							<div class="col-50">
								<div class="list-check">
									<input type="checkbox" id="checkbox12" value="侵占水域" /> <label for="checkbox12">侵占水域</label>
								</div>
								<div class="list-check">
									<input type="checkbox" id="checkbox22" value="倾倒渣土、固废垃圾" />
									<label for="checkbox22">倾倒渣土、固废垃圾</label>
								</div>
							</div>
							<div class="col-50">
								<div class="list-check">
									<input type="checkbox" id="checkbox42" value="河道采砂" /> <label for="checkbox42">河道采砂</label>
								</div>
								<div class="list-check">
									<input type="checkbox" id="checkbox32" value="河道采砂" /> <label for="checkbox32">河道采砂</label>
								</div>
							</div>
							<div class="s-title">水工建筑物</div>
							<div class="col-50">
								<div class="list-check"style="width: 70%;">
									<input type="checkbox" id="checkbox13" value="堤坝、水闸设施杂乱" />
									<label for="checkbox13">堤坝、水闸设施杂乱</label>
								</div>
								<div class="list-check"style="width: 30%;">
									<input type="checkbox" id="checkbox23" value="损毁、开裂" /> <label for="checkbox23">损毁、开裂</label>
								</div>
							</div>
							<div class="s-title">其它</div>
							<div class="col-100" style="width: 100%;overflow: hidden;">
								<div class="list-check" style="width: 100%;position: relative;">
									<input style="position: absolute;left: 0;top: 20px;" type="checkbox" id="checkbox14" value="河长公示牌、宣传牌、里程碑、界桩等标示牌破损、缺失、更新" /> 
									<label for="checkbox14" style="margin-left: 30px;">河长公示牌、宣传牌、里程碑、界桩等<br />标示牌破损、缺失、更新</label>
								</div>
							</div>
					</div>
					<div class="form-row">
						<label>投诉内容</label>
						<textarea name="task.issueDetail" v-model="issueDetail" class="form-control" rows="" cols="" required></textarea>
						<div class="valid-feedback">
							填写完成!
						</div>
						<div class="invalid-feedback">
							请填写投诉内容!
						</div>
					</div>
					<div class="form-row">
						<label class="s_title">上传图片</label>
					</div>
					<div id="goodsUpload"></div>
					<button class="btn btn-primary mb-2" type="submit" id="isAllowSub">提交</button>
				</form>
			</div>
		</div>
		<div class="g-my" v-show="isActive == '1'">
			<div class="cont_list1 cont_list_my1">
			    <img class="img" src="static/images/my.png" />
			    <div class="nickname">{{nickName}}</div>
			</div>
			<div class="cont_list1" @click="phoneModal = true">
			    <img class="img" src="static/images/phone.png" />绑定手机号
			</div>
			<div class="cont_list1" @click="myRecord">
			    <img class="img" src="static/images/record.png" />我的记录
			</div>
			<router-link to="/Hotcomplaints" tag="div" class="cont_list1">
				<img class="img" src="static/images/record.png" />热门投诉
			</router-link>
		</div>
		<nav class="tab_nav">
			<div class="nav_item" v-bind:class="{active:isActive == '0'}" @click="showTab('0')">
				<img class="icon" src="static/images/index.png"/>
				随手拍
			</div>
			<div class="nav_item" v-bind:class="{active:isActive == '1'}" @click="showTab('1')">
				<img class="icon" src="static/images/my.png"/>
				我的
			</div>
		</nav>
		<div class="modal_list_box" v-show="listModal == true">
			<div class="modal_list_box_head">我的投诉</div>
			<div class="modal_cont">
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
						<div class="card-content card-content-icon" v-if="item.issueAddress" @click="showMap1">
							<div class="card-icon card-icon-position"></div>
							<div class="e-over" :data-lon="item.geoLonGCJ" :data-lat="item.geoLatGCJ">{{item.issueAddress}}</div>
						</div>
						<div class="card-content facebook-date-time">{{item.issueTime}}</div>
					</div>
			    </mescroll-vue>
			</div>
			<div class="backPage" @click="listModal = false">返回</div>
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
		<div class="modal phoneModal" tabindex="-1" role="dialog" v-show="phoneModal == true">
		    <div class="modal-dialog" role="document">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h5 class="modal-title">绑定手机号</h5>
		                <button @click="phoneModal = false" type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span>
		                </button>
		            </div>
		            <div class="modal-body">
		                <div class="form-group">
					    	<label for="exampleInputEmail1">输入手机号</label>
						    <input v-model="loginNameModal" type="number" class="form-control" placeholder=""> 
					    	<small class="form-text text-muted text-red">{{phoneHelp}}</small>
					    	<small class="form-text text-muted text-red">*如果已经绑定过手机号，此操作会覆盖原本手机号</small>
					    	<label for="exampleInputEmail1">输入验证码</label>
						    <div class="input-group">
							    <input v-model="verificationModal" type="number" class="form-control" placeholder="">
							    <div class="input-group-append" @click="getVerification">
							    	<span class="input-group-text" style="background-color: #fff;">{{verificationTip}}</span>
								</div>
						    </div>
					    	<small class="form-text text-muted text-red">{{verificationHelp}}</small>
	                	</div>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-primary" @click="confirmVerification">验证</button>
		                <button type="button" class="btn btn-secondary" @click="phoneModal = false" data-dismiss="modal">取消</button>
		            </div>
		            <!--<div class="modal-footer" v-if="isVerification == true">
		                <button type="button" class="btn btn-success" @click="bindPhone">确定</button>
		                <button type="button" class="btn btn-secondary" @click="phoneModal = false" data-dismiss="modal">取消</button>
		            </div>-->
		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
	import vueLoading from '@/components/loading.vue'
	import MobileSelect from 'mobile-select'
	import MescrollVue from 'mescroll.js/mescroll.vue'
	export default {
		data() {
			return {
				riverName: '',nickName:'未登录',phoneHelp:'',phoneModal:false,verificationCount:60,verificationTimer:null,
				fileName: '选择图片...',loginNameModal:'',listModal:false,verificationModal:'',verificationTip:'获取验证码',
				items: [],isVerification:false,verificationHelp:'',adminCode:'',
				riverReachId: '',
				riverNameList: [],marker:null,lon:'',lat:'',
				issueDetail:'',lon1:'',lat1:'',marker1:null,
				mapContainer1:null,riverAddr1:'',
				geocoder1:null,
				loginName:'',
				filesList:null,
				mobileSelect:null,
				riverAddr:'',
				taskTypeVal:'',
				mapContainer:null,
				geocoder:null,
				isActive:'0',
				mescroll: null,
            	dataList: [],
			    mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
			    mescrollUp: { callback: this.upCallback ,lazyLoad: {use: true}}// 上拉加载的配置.
			}
		},
		components: {
			vueLoading,
			MescrollVue
		},
		methods: {
			hideMsg:function(){
				$('#msgInfo').hide();
			},
			hideMsgCont:function(v){
				$('#msgBoxCont').show();
				$('#msgBoxCont .msg_cont').html(v);
				setTimeout(function () {
					$('#msgBoxCont').hide();
		        }, 3000);
			},
			confirmVerification:function(){
				var that = this;
				if(that.verificationModal == ''){
					that.verificationHelp = "验证码不能为空"
					return false;
				}
				if(this.verificationModal == this.adminCode){
					that.isVerification = true;
					that.bindPhone();
					return false;
				}
				this.verificationHelp = "验证码错误"
			},
			getVerification:function(){
				var that=this;
				if(that.loginNameModal == ''){
					that.phoneHelp = "请输入手机号";
					return false;
				}
				if(that.loginNameModal.length!=11){
					that.phoneHelp = "手机号位数不正确";
					return false;
				}
				if(!that.checkMobile()){
					that.phoneHelp = "手机号格式不正确";
					return false;
				}
				if(that.verificationCount!=60){
					return false;
				}
				that.verificationTip = "正在发送...";
				this.$http.get("commonAction!commonCode.action?mobile="+that.loginNameModal).then(function(response) {
					that.adminCode = response.body.num;
				});
				that.verificationTimer = setInterval(function(){
					that.verificationTip = that.verificationCount+"秒后重发";
					that.verificationCount--;
					if(that.verificationCount == 0){
						clearInterval(that.verificationTimer);
						that.verificationCount = 60;
						that.verificationTip = '获取验证码';
					}
				},1000);
			},
			bindPhone:function(){
				var that = this;
				this.loginName = this.nickName = that.loginNameModal;
				localStorage.setItem('JW_PHONE', that.loginNameModal);
				this.phoneModal = false;
			},
			myRecord:function(){
				if(this.nickName == "未登录"){
					alert("请先绑定手机号")
					return false;
				}
				this.listModal = true;
			},
			checkMobile:function(sMobile) {
				if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(sMobile))) {
					return true;
				}
				return false;
			},
			showTab:function(v){
				this.isActive = v;
			},
			closeMapFun:function(){
				$('#mapBox').hide();
			},
			showMap:function(){
				$('#mapBox').show();
			   this.getAddress();
			},
			//拖动地图的时候经纬度改变 同时改变地址
			showInfoDragend: function(){
				this.getAddress();
			},
			getAddress:function(){
				var This = this;
			    if(!This.geocoder){
		            This.geocoder = new AMap.Geocoder();
		        }
		    	$('#geoLon').val(This.mapContainer.getCenter().lng);
		    	$('#geoLat').val(This.mapContainer.getCenter().lat);
		        
		        This.geocoder.getAddress(This.mapContainer.getCenter(), function(status, result) {
		            if (status === 'complete'&&result.regeocode) {
		                This.riverAddr = result.regeocode.formattedAddress;
		            }else{
		            	//alert(JSON.stringify(result))
		            }
		        });
			},
			showPlace: function() {
				document.querySelector('#isloadShow').style.display = "block"
				let that = this
				let riverNameListAPI = "commonAction!commJsonQueryReachList.action?reach.reachName=" + this.riverName
				this.$http.get(riverNameListAPI).then(function(response) {
					document.querySelector('#isloadShow').style.display = "none"
					let resData = response.data.rows
					if(resData.length <= 0) {
						$('#msgInfo .msg_cont').html('未搜索到河段')
						$('#msgInfo').show().fadeOut(3000)
						return false;
					}
					$('#msgInfo .msg_cont').html('河段搜索完毕,在下方选择河段');
					that.mobileSelect.updateWheel(0,resData)
					that.mobileSelect.show()
					$('#msgInfo').show().fadeOut(3000)
					$("#validationCustom01").focus()
				});
			},
			submit: function(event) {
				let that = this;
				let formData = new FormData(document.querySelector("form"));
				if(that.loginName == ''){
					that.hideMsgCont('未填写手机号')
					return false;
				}else{
					localStorage.setItem('JW_PHONE', that.loginName);
					that.loginNameModal = that.loginName;
				}
				if(that.riverAddr == ''){
					that.hideMsgCont('未选择地址')
					return false;
				}
				if(that.taskTypeVal == ''){
					that.hideMsgCont('未选择问题主题')
					return false;
				}
				if(that.issueDetail == ''){
					that.hideMsgCont('未填写投诉内容')
					return false;
				}
				$('#isloadShow').show();
				//图片数据
				for(let i=0;i<that.filesList().length;i++){
					formData.append('task.issueImageOneFile',that.filesList()[i]);
				}
				this.$http.post('taskAction!commonJsonInsertForWeixinMin.action', formData, {
						'Content-Type': 'Multipart/form-data'
					}).then(function(res) {
						if(res.data.result == 'success') {
							$('#msgInfo .msg_cont').html('感谢您的爆料，我们会及时处理');
							$('#msgInfo').show();
							setTimeout(function () {
								$('#msgInfo').hide();
								$('#isloadShow').hide();
								document.querySelector("form").reset();
								window.scrollTo(0,0);
								that.taskTypeVal = "";
								that.riverAddr = '';
								that.issueDetail = '';
								location.reload();
								that.loginName = localStorage.getItem('JW_PHONE');
//								that.$router.go(0);
					        }, 3000);
						}
					}).catch(function(err) {})
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
	        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
		    upCallback (page, mescroll) {
		    	var that=this;
		      // 联网请求
		    	this.$http.get("taskAction!eachJsonQueryForWeiXinList.action?tel="+that.loginName, {
			        params: {
			        	page: page.num, // 页码
			        	rows: page.size // 每页长度
			        }
		    	}).then((response) => {
			        // 请求的列表数据
			        let arr = response.body.rows;
			        // 如果是第一页需手动制空列表
			        if (page.num === 1) this.dataList = []
			        // 把请求到的数据添加到列表
			        this.dataList = this.dataList.concat(arr)
			        // 数据渲染成功后,隐藏下拉刷新的状态
			        this.$nextTick(() => {
			          mescroll.endSuccess(arr.length)
			        })
					that.$previewRefresh();
		    	}).catch((e) => {
		        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
		       		mescroll.endErr()
		    	})
			},
	        mescrollInit (mescroll) {
		      this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
		    },
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
		            	console.log(result);
		                This.riverAddr1 = result.regeocode.formattedAddress;
		            }else{
		            	//alert(JSON.stringify(result))
		            }
		        });
			},
			onComplete1: function(data) {
				this.mapContainer1.setCenter([data.position.lng, data.position.lat]);
				//根据经纬度获取地址
				this.getAddress1();
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
	    },
		mounted() {
			let that = this;
			//手机号存储在本地 如果有手机号则绑定手机号
//			localStorage.setItem('JW_PHONE','17826866076');
			var phone = localStorage.getItem('JW_PHONE');
			if(phone != null && phone != '' && phone != undefined){
				that.loginName = that.nickName = phone;
			}
			//高德地图初始化
			this.mapContainer1 = new AMap.Map('mapBox1', {
		        resizeEnable: true,
		        zoom:16,
		        center:[120.25869520399397,30.181276041667]
		   });
		    // 构造点标记
			this.marker1 = new AMap.Marker({
			    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
			    position: [120.25869520399397,30.181276041667]
			});
		    //地图加载完成后 绑定拖动地图事件
	        this.mapContainer1.on('complete', function() {
				that.mapContainer1.on('dragend', that.showInfoDragend1);
		    });
		    //注册精细定位插件
			this.reMapCenter1();
			//高德地图初始化
			this.mapContainer = new AMap.Map('mapBox', {
		        resizeEnable: true,
		        zoom:16,
		        center:[120.25869520399397,30.181276041667]
		   });
		    //地图加载完成后 绑定拖动地图事件
	        this.mapContainer.on('complete', function() {
				that.mapContainer.on('dragend', that.showInfoDragend);
		    });
		    //注册精细定位插件
			this.reMapCenter();
			//初始化上传图片
			this.filesList = tinyImgUpload('#goodsUpload');
			//水体水岸拼接
			var checkboxlist = $("input[type='checkbox']");
			checkboxlist.click(function() {
				var str = '';
				$.each(checkboxlist, function(e) {
					if($(this).is(':checked')) {
						str += $(this).val() + ";"
					}
				});
				that.taskTypeVal = str;
			})
		}
	}
</script>
<style scoped>
	.was-validated .form-control:invalid{border-color:#ced4da;}
	.mescroll {position: fixed;top: 44px;bottom: 0;height: auto;}
	.s_title{font-size: 16px;font-weight: bold;}
	.modal_list_box_head{border-bottom: 1px solid #e3e3e3;text-align: center;font-size: 16px;line-height: 40px;background: #009eff;
	position: fixed;top: 0;left: 0;z-index: 9;width: 100%;color: #fff;}
	.modal_cont{width: 100%;height: 89%;overflow: auto;margin-top: 45px;position: relative;overflow-x: hidden;margin-bottom: 50px;
	background: rgba(239, 239, 239, 0.63);}
	.cont_task_list:first-child{border-top:  5px solid rgba(239, 239, 239, 0.63);}
	.cont_task_list{min-height: 40px;line-height: 26px;border-bottom:  5px solid rgba(239, 239, 239, 0.63);position: relative;padding: 10px 15px 0;
	background: #fff;display: flex;flex-direction:column;flex-grow: inherit;word-break:break-all;}
	.cont_task_list .img{width:20px;height:20px;position: absolute;left: 20px;top: 10px;}
	.cont_list_my{font-size: 18px;height: 80px;line-height: 80px;padding-left: 100px;}
	.cont_list_my .img{width:60px;height:60px;}
	.copy{position: absolute;bottom: 10px;left: 0;width: 100%;text-align: center;}
	.facebook-date{font-size: 12px;color: #ccc;display: flex;flex-wrap:wrap;}
	.section__cont_img{display: flex;flex-wrap:wrap;flex-grow:3;}
	.section__cont_img image{width: 26%;height: 80px;margin: 8px;}
	.backPage{position: fixed;bottom: 0;width: 100%;background: #eaa256;height: 32px;line-height: 32px;color: #fff;
	text-align: center;font-size: 16px;letter-spacing: 8px;}
	.tab_nav{position: fixed;z-index: 98;bottom: 0;left: 0;width: 100%;background: rgb(249, 249, 249);border-top: 1px solid #e4e4e4;}
	.nav_item{width: 50%;line-height: 20px;height: 50px;float: left;text-align: center;cursor: pointer;display: flex;flex-flow: column;}
	.nav_item .icon{width: 20px;height: 20px;margin: 0 auto;margin-top: 8px;}
	.nav_item.active{color: #007BFF;}
	.phoneModal{display: block;background: #fff;}
	.phoneModal .modal-content{border: 0;}
	.phoneModal .modal-footer button{width: 50%;}
	.mapModal{position: fixed;top: 0;left: 0;background: #fff;width: 100vw;height: 100vh;z-index: 997;display: none;}
	.markerCenter{background: url("https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png") 0 0 no-repeat;width: 19px;height: 33px;position: absolute;
	top: 50%;left: 50%;margin-left: -10px;margin-top: -33px;z-index: 998;}
	.map-close{position: absolute;top: 0;width: 100%;background: #fff;z-index: 998;height: 39px;line-height: 39px;padding: 0 5px;text-align: center;font-size: 16px;}
	.map-close button{float: right;padding: 5px 30px;margin-top: 3px;}
	.map-close span{float: left;margin-left: 10px;}
	.map-info{position: absolute;bottom: 0;width: 100%;background: #fff;z-index: 998;min-height: 20px;line-height: 20px;padding: 6px 15px;}
	.g-my{position: relative;display: flex;flex-direction:column;flex-grow: inherit;overflow: hidden}
	.g-my .cont_list1{width: 100%;height: 40px;line-height: 40px;border-bottom: 1px solid #ccc;position: relative;padding-left: 50px;}
	.g-my .cont_list1 .img{width:20px;height:20px;position: absolute;left: 20px;top: 10px;}
	.g-my .cont_list_my1{font-size: 18px;height: 80px;line-height: 80px;padding-left: 100px;overflow: hidden;}
	.g-my .cont_list_my1 .img{width:60px;height:60px;}
	.g-my .copy{position: absolute;bottom: 10px;left: 0;width: 100%;text-align: center;color: #ccc;font-size: 12px;}
	.g-my .nickname{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.text-muted{color: red!important;}
	.section__cont_img{display: flex;flex-wrap:wrap;flex-grow:3;}
	.section__cont_img .imgList{width: 26%;height: 80px;margin: 8px;}
	.modal_list_box{position: fixed;z-index: 99;bottom: 0;left: 0;width: 100%;height: 100%;background: rgb(245, 245, 245);overflow: auto;}
	.g-task {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
		background: url('../../static/images/bg_task.jpg') 0 0 no-repeat;
		background-size: 100% auto;
		padding-top: 40%;
	}
	
	.g-warp {
		background: #fff;
	}
	.col-50{height: 40px;margin-top: 10px;width: 100%;}
	.list-check{width: 50%;float: left;}
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
	
	.row-img-thum img {
		max-width: 50%;
		height: 12rem;
		margin: 1rem;
	}
	
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
	#msgInfo,#msgBoxCont{top: 25%;width: 100%;text-align: center;left: 0;position: fixed!important;z-index: 999;display: none;border-radius:0;border: 0;}
	.card-content{margin-bottom: 10px;}
	.cont_task_list{border-bottom: 1px solid #efefef;padding-top: 15px;}
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
</style>
	
<style>
	.mobileSelect .content .btnBar .cancel{display: none!important;}
	/*上传图片通用样式*/
	#img-container {margin-top: 1rem;}
	#img-container:after {
	    content: '.';
	    display: block;
	    height: 0;
	    visibility: hidden;
	    overflow: hidden;
	    clear: both;
	}
	.img-item {
	    position: relative;
	    float: left;
	    margin-right: 0.3875rem;
	    margin-bottom: 0.3875rem;
	    height: 6.1rem;
	    width: 6.1rem;
	    box-sizing: border-box;
	}
	.img-item.img-thumb{height: 6rem;width: 6rem;}
	.img-thumb {
	    border-radius: 3px;
	}
	.thumb-icon {
	    width: 100%;
	    height: 100%;
	}
	.img-up-add {
	    display: table;
	    border: 1px dashed #E0E0E0;cursor: pointer;
	}
	.img-add-icon {
	    display: table-cell;
	    vertical-align: middle;
	    text-align: center;
	    font-size: 3rem;
	}
	.img-remove {
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    display: block;
	    width: 6.1rem;
	    height: 1.3rem;
	    background: rgba(0, 200, 254, 0.63);
	    color: #fff;
	    text-align: center;
	    text-decoration: none;
	    font-size: 0.7rem;line-height: 1.3rem;letter-spacing: .3rem;
	    overflow: hidden;
	    background-clip: padding-box;
	}
	.img-remove:hover{text-decoration: none;color: #fff;}
	#img-file-input {
	    display: none;
	}
	.mapModal1{position: fixed;top: 0;left: 0;background: #fff;width: 100vw;height: 100vh;z-index: 997;display: none;}
	.map-close1{position: absolute;top: 0;width: 100%;background: #fff;z-index: 998;height: 39px;line-height: 39px;padding: 0 5px;text-align: center;font-size: 16px;}
	.map-close1 button{float: right;padding: 5px 30px;margin-top: 3px;}
	.map-info1{position: absolute;bottom: 0;width: 100%;background: #fff;z-index: 998;min-height: 20px;line-height: 20px;padding: 6px 15px;}
</style>