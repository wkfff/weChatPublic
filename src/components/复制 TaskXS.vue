<template>
	<div>
		<vue-loading id="isloadShow"></vue-loading>
		<div class="alert alert-primary" id="msgInfo" role="alert">提交成功!</div>
		<div class="g-task">
			<div class="g-warp" style="padding: 25px;">
				<form class="needs-validation" novalidate @submit.prevent="submit($event)" enctype="multipart/form-data" method="post">
					<input type="hidden" name="task.issueType" id="task.issueType" value="11" />
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
					<!--<div class="form-row">
						<label>地址 (必填)</label>
						<div class="input-group mb-3">
							<input type="text" name="task.issueAddress" v-model="riverAddr" class="form-control" placeholder="详细地址" required>
							<div class="valid-feedback" id="validationReach-va">
								已填写!
							</div>
							<div class="invalid-feedback" id="validationReach-in">
								请填写详细地址!
							</div>
						</div>
					</div>-->
					<input type="hidden" name="task.issueAddress" v-model="riverAddr" class="form-control">
					<div class="form-row">
						<label>联系方式 (必填)</label>
						<input type="text" name="employee.loginName" v-model="loginName" class="form-control" id="telephone" placeholder="请填写手机号码" value="" required>
						<div class="valid-feedback" id="telephone-feedback">
							填写正确!
						</div>
						<div class="invalid-feedback" id="telephone-feedback-va">
							请填写正确格式的手机号!
						</div>
					</div>
					<div class="form-row">
						<label>问题主题</label>
					</div>
					<div class="form-row">
							<div class="s-title">水体水岸</div>
							<input type="hidden" name="task.taskType" v-model="taskType" value="" />
							<div class="col-50">
								<div class="list-check" style="width: 60%;">
									<input type="checkbox" id="checkbox1" value="漂浮垃圾、废弃物、病死动物" /> <label for="checkbox1">漂浮垃圾 废弃物 病死动物</label>
								</div>
								<div class="list-check" style="width: 40%;">
									<input type="checkbox" id="checkbox2" value="河底淤积" /> <label for="checkbox2">河底淤积</label>
								</div>
							</div>
							<div class="col-50">
								<div class="list-check">
									<input type="checkbox" id="checkbox4" value="水体气味或颜色异常" />
									<label for="checkbox4">水体气味或颜色异常</label>
								</div>
								<div class="list-check">
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
								<div class="list-check">
									<input type="checkbox" id="checkbox13" value="堤坝、水闸设施杂乱" />
									<label for="checkbox13">堤坝、水闸设施杂乱</label>
								</div>
								<div class="list-check">
									<input type="checkbox" id="checkbox23" value="损毁、开裂" /> <label for="checkbox23">损毁、开裂</label>
								</div>
							</div>
							<div class="s-title">其它</div>
							<div class="col-100" style="width: 100%;overflow: hidden;">
								<div class="list-check" style="width: 100%;">
									<input type="checkbox" id="checkbox14" value="河长公示牌、宣传牌、里程碑、界桩等标示牌破损、缺失、更新" /> <label for="checkbox14">河长公示牌、宣传牌、里程碑、界桩等标示牌破损、缺失、更新</label>
								</div>
							</div>
							<div class="col-100" style="width: 100%;overflow: hidden;">
								<div class="list-check" style="width: 100%;color: red;">
									<input type="checkbox" id="checkbox15" value="河边不文明行为曝光（向河道乱丢乱扔，洗衣、洗拖把，私自行船，破坏河边绿化，散养家禽等）
" /> <label for="checkbox15">河边不文明行为曝光（向河道乱丢乱扔，洗衣、洗拖把，私自行船，破坏河边绿化，散养家禽等）
</label>
								</div>
							</div>
					</div>
					<div class="form-row">
						<label>投诉(曝光)内容</label>
						<textarea name="task.issueDetail" v-model="issueDetail" class="form-control" rows="" cols="" required></textarea>
						<div class="valid-feedback">
							填写完成!
						</div>
						<div class="invalid-feedback">
							请填写投诉(曝光)内容!
						</div>
					</div>
					<div class="form-row">
						<label>上传图片</label>
					</div>
					<div id="goodsUpload"></div>
					<button class="btn btn-primary mb-2" type="submit" id="isAllowSub" disabled="disabled">提交</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import vueLoading from '@/components/loading.vue'
	import MobileSelect from 'mobile-select'
	export default {
		data() {
			return {
				riverName: '',
				fileName: '选择图片...',
				items: [],
				riverReachId: '',
				riverNameList: [],
				$tgaUpload:null,
				issueDetail:'',
				loginName:'',
				filesList:null,
				selectShow:false,
				mobileSelect:null,
				riverAddr:'',
				taskType:''
			}
		},
		components: {
			vueLoading
		},
		methods: {
			showPlace: function() {
				document.querySelector('#isloadShow').style.display = "block"
				let that = this
				let riverNameListAPI = "commonAction!commJsonQueryReachList.action?reach.reachName=" + this.riverName
				this.$http.get(riverNameListAPI).then(function(response) {
					document.querySelector('#isloadShow').style.display = "none"
					let resData = response.data.rows
					if(resData.length <= 0) {
						$('#msgInfo').html('未搜索到河段')
						$('#msgInfo').show().fadeOut(3000)
						return false;
					}
					$('#msgInfo').html('河段搜索完毕,在下方选择河段');
					that.mobileSelect.updateWheel(0,resData)
					that.mobileSelect.show()
					$('#msgInfo').show().fadeOut(3000)
					$("#validationCustom01").focus()
				});
			},
			submit: function(event) {
				let that = this;
				let formData = new FormData(document.querySelector("form"));
				/*if(that.riverReachId == ''){
					alert('未选择河道')
					document.getElementById("validationReach-in").style.display = "block"
					document.getElementById("validationReach-va").style.display = "none"
					return false;
				}*/
				if(that.loginName == ''){
					alert('未填写手机号')
					document.getElementById("telephone-feedback-va").style.display = "block"
					document.getElementById("telephone-feedback").style.display = "none"
					return false;
				}
				if(that.riverAddr == ''){
					alert('未填写地址')
					document.getElementById("validationReach-in").style.display = "block"
					document.getElementById("validationReach-va").style.display = "none"
					return false;
				}
				if(that.filesList()<=0){
					alert('未选择图片')
					return false;
				}
				document.querySelector('#isloadShow').style.display = "block";
				//图片数据
				for(let i=0;i<that.filesList().length;i++){
					formData.append('task.issueImageOneFile',that.filesList()[i]);
				}
				this.$http.post('taskAction!commonJsonInsertForWeixinMin.action', formData, {
						'Content-Type': 'Multipart/form-data'
					}).then(function(res) {
						if(res.data.result == 'success') {
							$('#msgInfo').html('感谢您的爆料，我们会及时处理');
							document.querySelector('#msgInfo').style.display = "block";
							setTimeout(function () {
					        	window.location.reload();
					        }, 3000);
						}
					}).catch(function(err) {})
			}
		},
		mounted() {
			let that = this;
			var geolocation = new qq.maps.Geolocation("46WBZ-UHEWS-WIKOF-6GMGX-LYWCK-GABSK", "getPosition");
			geolocation.getLocation(showPosition);
			var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
			var PI = 3.1415926535897932384626;
			var a = 6378245.0;
			var ee = 0.00669342162296594323;
			var transformlat = function transformlat(lng, lat) {
			    var lat = +lat;
			    var lng = +lng;
			    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
			    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
			    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
			    return ret
			  };
			
			  var transformlng = function transformlng(lng, lat) {
			    var lat = +lat;
			    var lng = +lng;
			    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
			    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
			    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
			    return ret
			  };
			
			  /**
			   * 判断是否在国内，不在国内则不做偏移
			   * @param lng
			   * @param lat
			   * @returns {boolean}
			   */
			  var out_of_china = function out_of_china(lng, lat) {
			    var lat = +lat;
			    var lng = +lng;
			    // 纬度3.86~53.55,经度73.66~135.05 
			    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
			  };
			  var gcj02towgs84 = function gcj02towgs84(lng, lat) {
			    var lat = +lat;
			    var lng = +lng;
			    if (out_of_china(lng, lat)) {
			      return [lng, lat]
			    } else {
			      var dlat = transformlat(lng - 105.0, lat - 35.0);
			      var dlng = transformlng(lng - 105.0, lat - 35.0);
			      var radlat = lat / 180.0 * PI;
			      var magic = Math.sin(radlat);
			      magic = 1 - ee * magic * magic;
			      var sqrtmagic = Math.sqrt(magic);
			      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
			      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
			      var mglat = lat + dlat;
			      var mglng = lng + dlng;
			      return [lng * 2 - mglng, lat * 2 - mglat]
			    }
			  };
			function showPosition(position){
		    	var pos = gcj02towgs84(position.lng,position.lat);
		    	that.riverAddr = position.addr;
		    	$('#geoLon').val(pos[0]);
		    	$('#geoLat').val(pos[1]);
			}
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
				that.taskType = str;
			})
			var forms = document.getElementsByClassName('needs-validation');
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('change', function(event) {
					form.classList.add('was-validated');
					let tel = document.getElementById("telephone")
					let reach = document.getElementById("validationReach")
					let telCont = document.getElementById("telephone-feedback")
					let isAllowSub = document.getElementById("isAllowSub")
					/*if(that.riverReachId == ''){
						document.getElementById("validationReach-in").style.display = "block"
						document.getElementById("validationReach-va").style.display = "none"
						isAllowSub.setAttribute("disabled", "true");
					}else{
						document.getElementById("validationReach-va").style.display = "block"
						document.getElementById("validationReach-in").style.display = "none"
					}*/
					if(checkMobile(tel.value)) {
						tel.style.borderColor = "#dc3545";
						tel.classList.add("is-invalid");
						telCont.style.display = "none"
					} else {
						tel.style.borderColor = "#28a745";
						tel.classList.remove("is-invalid");
						telCont.style.display = "block"
					}
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
			this.mobileSelect = new MobileSelect({
	            trigger: "#triggerName",
	            title: "选择河段",
	            wheels: [
	                {data: [{"reachId":'',"reachName":''}]}
	            ],
	            keyMap: {
		            id:'reachId',
		            value: 'reachName'
		        },
	            callback:function(indexArr, data){
	                that.riverName = data[0].reachName
	                that.riverReachId = data[0].reachId
					document.getElementById("validationReach-va").style.display = "block"
					document.getElementById("validationReach-in").style.display = "none"
	            }
	        });
			function checkMobile(sMobile) {
				if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(sMobile))) {
					return true;
				}
				return false;
			}
		}
	}
</script>
<style scoped>
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
	#msgInfo{left: 50%;margin-left: -122px;}
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
</style>