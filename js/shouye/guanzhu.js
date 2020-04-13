function index() {
	window.location.href = "index1.html";
}
function shoucang() {
	window.location.href = "shoucang4.html";
	localStorage.setItem("dianji", '1');
}
window.onload = function () {
	var widthLIN = localStorage.getItem("key");
	document.getElementById('widthLI').style.height = widthLIN + 'px';
	document.getElementById('daohanglan').style.top = widthLIN + 'px';
	var dhlH = document.getElementById('daohanglan').offsetHeight;
	document.getElementById('app').style.marginTop = Number(widthLIN) + Number(dhlH) + 'px';
	new Vue({
		el: '#app',
		data: {
			users: "",
		},
		mounted: function () {
			this.sendGetByObj();
		},
		methods: {
			sendGetByObj: function () {
				var than = this;
				this.$http.get('../index.php/index/stow', {
					params: {
						act: 'app',
						type: 'qyxx',
					}
				})
					.then(function (res) {
						console.log(res)
						than.users = res.data.content.data
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	})
}
// if (window.history && window.history.pushState) {
// 	$(window).on('popstate', function () {
// 		var hashLocation = location.hash;
// 		var hashSplit = hashLocation.split("#!/");
// 		var hashName = hashSplit[1];
// 		if (hashName !== '') {
// 			var hash = window.location.hash;
// 			if (hash === '') {
// 				window.location.href = "index1.html"
// 			}
// 		}
// 	});
// 	window.history.pushState('forward', null, './guanzhu.html');
// }
function xiangmuxiangqing(element) {
	var C7 = "xingmu" + element.id;
	var C8 = document.getElementById(C7).innerHTML;
	window.location.href = "html/qiyexiangqing/qiyeIndex.html?aid=" + C8;
}
function panjueshuanniu() {
	window.location.href = "html/sousuo/panjueshu.html";
}
function xiangmuanniu() {
	window.location.href = "html/sousuo/xiangmuchaxun.html";
}
function renyuananniu() {
	window.location.href = "html/sousuo/renyuanchaxun.html";
}
function panjueshuanniu() {
	window.location.href = "html/sousuo/zonghechaxun.html";
}
function zizhianniu() {
	window.location.href = "html/sousuo/qiyezizhichaxun.html";
}
function Mclose() {
	var widthLIN1 = localStorage.getItem("key1");
	if (widthLIN1 == "2") {
		window.webkit.messageHandlers.Mclose.postMessage("123");
	} else {
		window.control.mClose();
	}
}
function Mback() {
	window.location.href = "index1.html"
}