<template>
	<div>
		<vue-loading id="isloadShow"></vue-loading>
		<div class="alert alert-primary" id="msgInfo" role="alert">提交成功!</div>
		<div class="g-task">
			<div class="g-warp" style="padding: 25px;">
				<form class="needs-validation" novalidate @submit.prevent="submit($event)" enctype="multipart/form-data" method="post">
					<div class="form-row">
						<label>搜索河名</label>
						<div class="input-group mb-3">
							<input type="text" v-model="riverName" class="form-control" placeholder="输入河名" aria-describedby="basic-addon2">
							<div class="input-group-append" @click="showPlace">
								<span class="btn btn-primary input-group-text" id="basic-addon2">搜索</span>
							</div>
						</div>
					</div>
					<div class="form-row">
						<label>选择河道<small>(搜索后加载附近可投诉河段)</small></label>
						<select name="task.reach.reachId" v-model="riverReachId" class="custom-select" id="validationCustom01" required>
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
						<input type="text" name="employee.loginName" v-model="loginName" class="form-control" id="telephone" placeholder="请填写手机号码" value="" required>
						<div class="valid-feedback" id="telephone-feedback">
							填写正确!
						</div>
						<div class="invalid-feedback">
							请填写正确格式的手机号!
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
					<!--<div class="form-row">
					<label>上传图片</label>
				</div>
				<div class="custom-file">
					<input name="task.issueImageOneFile" type="file" multiple="multiple" accept="image/*" @change="tirggerFile($event)" class="custom-file-input" id="validatedCustomFile" required>
					<label class="custom-file-label" for="validatedCustomFile">{{fileName}}</label>
					<div class="valid-feedback" style="display: block;">
						请尽量上传jpeg、png格式
					</div>
				</div>-->
					<div class="upload-box">
						<ul class="upload-ul clearfix">
							<li class="upload-pick">
								<div class="webuploader-container clearfix" id="goodsUpload"></div>
							</li>
						</ul>
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
				riverName: '',
				fileName: '选择图片...',
				items: [],
				riverReachId: '',
				riverNameList: [],
				$tgaUpload:null,
				issueDetail:'',
				loginName:'',
				files:null
			}
		},
		components: {
			vueLoading
		},
		methods: {
			tirggerFile: function(event) {
				let file = event.target.files;
				this.fileName = "已选择" + file.length + "个";
			},
			showPlace: function() {
				
				this.files = this.$tgaUpload.getFiles()
				for(let i=0;i<this.files.length;i++){
					this.$tgaUpload.getFile(this.files[i].id)
				}
				console.log(this.files);
				return false;
				let that = this
				let riverNameListAPI = "commonAction!commJsonQueryReachList.action?reach.reachName=" + this.riverName
				this.$http.get(riverNameListAPI).then(function(response) {
					document.querySelector('#isloadShow').style.display = "none"
					that.riverNameList = response.data.rows
					if(response.data.rows.length <= 0) {
						$('#msgInfo').html('未搜索到河段')
						$('#msgInfo').show().fadeOut(3000)
						return false;
					}
					$('#msgInfo').html('河段搜索完毕,在下方选择河段')
					$('#msgInfo').show().fadeOut(3000)
				});
			},
			submit: function(event) {
				document.querySelector('#isloadShow').style.display = "block"
				this.files = this.$tgaUpload.getFiles()
				console.log(this.files);
//				this.$tgaUpload.upload()
				let formData = new FormData(document.querySelector('form'));
				formData.append('task.issueImageOneFile',this.files)
				this.$http.post('taskAction!commonJsonInsertForWeixinMin.action', formData, {
						'Content-Type': 'Multipart/form-data'
					})
					.then(function(res) {
						if(res.data.result == 'success') {
							$('#msgInfo').html('问题提交成功')
							document.querySelector('#msgInfo').style.display = "block"
							/*let t;
							clearTimeout(t)
							t = setTimeout(function() {
								that.$router.go(0)
							}, 3000);*/
						}
					}).catch(function(err) {})
			}
		},
		mounted() {
			let that = this
			this.$tgaUpload = $('#goodsUpload').diyUpload({
				url: 'taskAction!commonJsonInsertForWeixinMin.action',
					success: function(data) {
						$('#msgInfo').html('问题提交成功')
						document.querySelector('#msgInfo').style.display = "block"
					},
					error: function(err) {
						$('#msgInfo').html('问题提交成功')
						document.querySelector('#msgInfo').style.display = "block"
					},
					formData:{'task.issueDetail':that.issueDetail,'employee.loginName':that.loginName,'task.reach.reachId':that.riverReachId},
					buttonText: '',
					accept: {
						title: "Images",
						extensions: 'gif,jpg,jpeg,bmp,png'
					},
					fileNumLimit: 9,
					compressSize:2048000,//最大200kb
					thumb: {
						width: 120,
						height: 90,
						quality: 100,
						allowMagnify: true,
						crop: true,
						type: "image/jpeg",
					}
				})
			var forms = document.getElementsByClassName('needs-validation');
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('change', function(event) {
					form.classList.add('was-validated');
					let tel = document.getElementById("telephone")
					let telCont = document.getElementById("telephone-feedback")
					let isAllowSub = document.getElementById("isAllowSub")
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

			function checkMobile(sMobile) {
				if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(sMobile))) {
					return true;
				}
				return false;
			}
		}
	}
</script>

<style >
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
		mx-width: 50%;
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
	
</style>