<template>
	<div>
		<vue-loading id="isloadShow"></vue-loading>
		<div class="alert alert-primary" id="msgInfo" role="alert">提交成功!</div>
		<div class="g-warp" style="padding: 25px;">
			<form class="needs-validation" novalidate @submit.prevent="submit($event)" enctype="multipart/form-data" method="post">
				<h5 class="cover-heading">填写个人信息</h5>
				<div class="form-row">
					<label>应聘岗位</label>
					<select name="job.recruit" class="custom-select"  v-model="chooseId" id="validationCustom01" required>
						<option value="">请选择应聘岗位</option>
						<option v-for="item in items" :value="item.recruitId">{{item.position}}</option>
					</select>
					<div class="valid-feedback">
						已选择!
					</div>
					<div class="invalid-feedback">
						请选择应聘岗位!
					</div>
				</div>
				<div class="form-row">
					<label>上传简历</label>
				</div>
				<div class="custom-file">
					<input type="file" @change="tirggerFile($event)" name="job.appendixFile" class="custom-file-input" id="validatedCustomFile" required>
					<label class="custom-file-label" for="validatedCustomFile">{{fileName}}</label>
					<div class="valid-feedback" style="display: block;">
						请尽量上传PDF格式的简历(请确保简历中的联系方式可用)
					</div>
				</div>
				<button class="btn btn-primary mb-2" type="submit" id="isAllowSub" disabled="disabled">提交</button>
			</form>
		</div>
	</div>
</template>

<script>
	import vueLoading from '@/components/loading.vue'
	export default {
		data() {
			return {
				lastWords: '',
				onlyName: '',
				fileName: '选择文件...',
				items: [],
				chooseId: 0
			}
		},
		components: {
			vueLoading
		},
		methods: {
			tirggerFile: function(event) {
				let file = event.target.files;
				let names = file[0].name;
				this.fileName = names;
				this.lastWords = names.substring(names.lastIndexOf("."));
				this.onlyName = names.substr(0, names.lastIndexOf("."));
			},
			submit: function(event) {
				document.querySelector('#isloadShow').style.display = "block"
				const lastWords = this.lastWords
				const onlyName = this.onlyName
				let that = this;
				let formData = new FormData(document.querySelector('form'));
				formData.append("job.appendixFileExt", lastWords);
				formData.append("job.appendixFileName", onlyName);
				this.$http.post('jobAction!eachJsonInsert.action', formData, {
						'Content-Type': 'Multipart/form-data'
					})
					.then(function(res) {
						if(res.data.result == 'success') {
							document.querySelector('#msgInfo').style.display = "block"
							let t;
							clearTimeout(t)
							t = setTimeout(function() {
								that.$router.go(0)
							}, 3000);
						}
					}).catch(function(err) {
					})
			}
		},
		created: function() {
//			let localAPI = "./static/goods.json"
			let localAPI = "recruitAction!eachJsonQueryList.action"
			this.chooseId = this.$route.params.id
			this.$http.get(localAPI).then(function(response) {
				this.items = response.data.rows
			}, function(response) {});
		},
		mounted() {
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
	label.custom-file-label{padding: .55rem;}
	.alert-primary {
		display: none;
	}
</style>