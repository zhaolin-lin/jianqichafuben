
// 首页轮播图部分
window.onload = function() {
	var vConsole = new VConsole();
	var shi = "";
	var sheng = "";
	  new Vue({
			el: '#app',
			data: {
			  users:"",
			  lunbo:'',
			  shi:"正在定位",
			  sheng:"",
			},
			mounted: function () {
				// this.huoqushuju()
				this.timer = setInterval(()=>{
					this.huoqudingwei()
				},1000)
			},
			methods: {
				huoqudingwei:function(){
					var than = this;
					shi = localStorage.getItem("shi");
					sheng = localStorage.getItem("sheng");
					if (shi != null && sheng != null && shi != "" && sheng != "") {
						 clearInterval(this.timer);
						  than.shi = shi;
						  than.sheng = sheng;
						  this.huoqushuju();
					}
				},
				huoqushuju: function () {
					fjdf();
					var than = this;
					this.$http.post('../../index.php/api/shouye/shouye', {
						province: '',
						city:'',
					}, {
						headers: {
							'Cookies': ashjd,
						}
					})
						.then(function (res) {
							// console.log(res.data.code)
							// panduandenglu(res)
							if (res.data.data != undefined){
								than.users = res.data.data.list
								localStorage.setItem("shiid", res.data.data.cityid);
								var lists = res.data.data.list;
								than.lunbo = res.data.data.lunbo
								setTimeout(function () {
									var mySwiper = new Swiper('.swiper-container', {
										direction: 'horizontal', // 垂直切换选项
										loop: true, // 循环模式选项
										autoplay: true,
										effect: 'slide',
										speed:2000,
										pagination: {
											el: '.swiper-pagination',
										},
										autoplayDisableOnInteraction: false,
									})
								}, 100)
							}
							
						}, function () {
							console.log('请求失败处理');
						});
				},
				huoquId:function(id,typeid){
					window.location.href = "zhiweixiangqing.html?id="+id+"&type="+typeid;
				},
				index:function(){
					window.location.href = "index.html";
				},
				zhaogongzuo:function(){
					var than = this;
					window.location.href = "zhaogongzuo.html";
				},
				zhaorencai:function(){
					window.location.href = "zhaorencai.html"
				},
				wode:function(){
					window.location.href = "wode.html"
				},
				xuanzediqu:function(){
					window.location.href = "xuanzediqu.html"
				},
				sousuo:function(){
					_shuzhu('1');
					window.location.href = "index_sousuo.html"
				}
			}
		})


  }


