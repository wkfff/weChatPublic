<template>
	<div>
  <vue-loading id="isloadShow"></vue-loading>
  <div class="alert alert-primary" id="msgInfo" role="alert">提交成功!</div>
<div class="g-warp" style="padding: 25px;background: url('static/images/bg_contact.jpg') 0 0 no-repeat;background-size:100%">
	<!--<div class="row">
	  <div class="col-sm-4 mb-4">
	    <div class="card">
	      <div class="card-body">
	        <h5 class="card-title">
	        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> 
	        	联系电话:<a href="tel:0571-82625388">0571-82625388</a></h5>
	      </div>
	    </div>
	  </div>
	  <div class="col-sm-4 mb-4">
	    <div class="card">
	      <div class="card-body">
	        <h5 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> 
	        	公司邮箱:418716109@qq.com</h5>
	      </div>
	    </div>
	  </div>
	  <div class="col-sm-4 mb-4">
	    <div class="card">
	      <div class="card-body">
	        <h5 class="card-title">
	        	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> 
	        	公司地址：<a href="http://map.baidu.com/?third_party=seo&s=con%26wd%3D%E6%B5%99%E6%B1%9F%E7%9C%81%E6%9D%AD%E5%B7%9E%E5%B8%82%E8%90%A7%E5%B1%B1%E5%8C%BA%E9%87%91%E5%9F%8E%E8%B7%AF458%E5%8F%B7%E8%90%A7%E5%B1%B1%E5%9B%BD%E9%99%85%E5%95%86%E5%8A%A1%E4%B8%AD%E5%BF%831%E5%B9%A28%E6%A5%BC%26c%3D2489">浙江省杭州市萧山区金城路458号萧山国际商务中心1幢8楼</a>
	        </h5>
	      </div>
	    </div>
	  </div>
	  
	</div>-->
	<div class="m-contact">
		<form class="needs-validation" novalidate  @submit.prevent="submit($event)" enctype="multipart/form-data" method="post">
			<img class="contact-img" src="static/images/animated-icon-5.gif"/>
			<h5 class="cover-heading">给我们留言</h5>
			<div class="form-row">
				<label for="validationCustom01">姓名</label>
				<input type="text" name="infomation.name" class="form-control" id="validationCustom01" placeholder="请填写姓名" value="" required>
				<div class="valid-feedback">
					填写完成!
				</div>
				<div class="invalid-feedback">
					请填写姓名!
				</div>
			</div>
			<div class="form-row">
				<label for="telephone">手机号码</label>
				<input type="text" name="infomation.telephone" class="form-control" id="telephone" placeholder="请填写手机号码" value="" required>
				<div class="valid-feedback" id="telephone-feedback">
					填写完成!
				</div>
				<div class="invalid-feedback">
					请填写正确格式的手机号!
				</div>
			</div>
			<div class="form-row">
				<label for="validationCustom03">内容</label>
				<textarea type="text" name="infomation.content" class="form-control" id="validationCustom03" placeholder="请填写内容" value="" required cols="10" rows="5">
				</textarea>
				<div class="valid-feedback">
					填写完成!
				</div>
				<div class="invalid-feedback">
					请填写内容!
				</div>
			</div>
			<div class="form-row" style="position: absolute;width: 20%;">
				<label for="file-select">上传图片</label>
			</div>
			<div class="custom-file" style="width: 80%;margin-left: 20%;">
				<input type="file" multiple="multiple" accept="image/*" @change="tirggerFile($event)" name="infomation.picturesFile" class="custom-file-input" id="validatedCustomFile" required>
				<label class="custom-file-label" for="validatedCustomFile">{{fileName}}</label>
			</div>
			<button class="btn btn-primary mb-2" type="submit" id="isAllowSub" disabled="disabled">提交</button>
		</form>
		<hr />
		<h5 class="cover-heading">我们的位置</h5>
		<div class="row" style="margin-bottom: 2rem;">
			<div id="mapDiv" style="height: 22em;width: 100%;"></div>
		</div>
	</div>
</div>
</div>
</template>

<script>
	import vueLoading from '@/components/loading.vue'
	export default	{
		data() {
			return {
				fileName: '选择文件...',
				fileLenth: false
			}
		},
		components: {
	    vueLoading
	  },
		methods: {
			tirggerFile: function(event) {
				let file = event.target.files;
				this.fileName = "已选择"+file.length+"个文件";
			},
			submit: function(event) {
				document.querySelector('#isloadShow').style.display = "block"
				let formData = new FormData(document.querySelector('form'));
				let that = this;
				
				this.$http.post('infomationAction!eachJsonInsert.action', formData, {'Content-Type': 'Multipart/form-data'})
				.then(function(res) {
					if(res.data.result == 'success'){
						document.querySelector('#msgInfo').style.display = "block"
						let t;
						clearTimeout(t)
						t = setTimeout(function (){
						    that.$router.go(0)
						}, 3000);
					}
				}).catch(function(err) {
				})
			}
		},
		mounted() {
//			const latlng = new T.LngLat(120.25446,30.18298);const zoom = 18;
//		    const map = new T.Map('mapDiv', {
//		        projection: 'EPSG:4326'
//		    })
//		    map.centerAndZoom(latlng, zoom)
//		    const marker = new T.Marker(latlng)
//		    map.addOverLay(marker)
//		    const label = new T.Label({
//		        text: "杭州九问数字科技有限公司<br/>杭州市萧山区萧山国际商务中心1幢8楼<br/>欢迎您的到来！！",
//		        position: latlng,
//		        offset: new T.Point(-100, -110)
//		    })
//		    map.addOverLay(label)
            var map;
			function mapInit(){
			  map = new AMap.Map('mapDiv', {
			    resizeEnable: true,
			    rotateEnable:true,
			    pitchEnable:true,
			    zoom: 18,
			    pitch:40,
			    rotation:15,
			    viewMode:'3D',//开启3D视图,默认为关闭
			    buildingAnimation:true,//楼块出现是否带动画
			    expandZoomRange:true,
			    zooms:[3,20],
			    center:[120.258959,30.180604]
			  });
			   var lnglat = [120.258959,30.180604];
			    var m1 = new AMap.Marker({
			        position: lnglat,
			        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
			    });
			    map.add(m1);
			    m1.setLabel({
			        offset: new AMap.Pixel(20, 10),
			        content: "杭州九问数字科技有限公司"
			    });
			}
			mapInit()
			let forms = document.getElementsByClassName('needs-validation');
			let validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('change', function(event) {
					form.classList.add('was-validated');
					let tel = document.getElementById("telephone")
					let telCont = document.getElementById("telephone-feedback")
					let isAllowSub = document.getElementById("isAllowSub")
					if(checkMobile(tel.value)){
						tel.style.borderColor ="#dc3545";
						tel.classList.add("is-invalid");
						telCont.style.display = "none"
					}else{
						tel.style.borderColor ="#28a745";
						tel.classList.remove("is-invalid");
						telCont.style.display = "block"
					}
					if(form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
						isAllowSub.setAttribute("disabled","true");
					} 
					if(form.checkValidity() === true) {
						if(!checkMobile(tel.value)){
							isAllowSub.removeAttribute('disabled');
						}
					}
				}, false);
			});
			function checkMobile(sMobile){
				if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(sMobile))){ 
			  		return true; 
			 	} 
			 	return false;
			} 
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-contact{margin-top: 110%!important;}
.contact-img{width: 35%;display: block;margin: 0 auto;}
.mb-2{margin-top: 2rem;width: 100%;margin-bottom: 5rem;}
.mb-4{margin-bottom: 0.5rem!important;padding: 0;}
.cover-heading{text-align: center;margin-bottom: 1rem;}
.alert-primary{display: none;}
.card-body{padding: .25rem 1.25rem;}
h5.card-title{font-size: .8rem;line-height: 1.3rem;margin: .5rem 0;}
svg:not(:root){width: 1rem;height: .8rem;}
.form-control{font-size: .8rem;width: 80%;margin-left: 20%;}
.custom-file-label{padding: .6rem;}
.custom-file-label::after{padding: .6rem;}
.form-row{position: relative;margin-bottom: 1.3rem;}
.form-row label{position: absolute;left: 0;}
</style>
