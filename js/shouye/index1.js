var arr;
window.onload = function () {

	var widthLIN = [];
	var str = location.href;

	var num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数
	arr = str.split("&"); //各个参数放到数组里
	document.getElementById('textarea2').innerHTML = arr.length;
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			this[name] = value;
			widthLIN.push(value)
		}
	}

	//window.control.LogShow(widthLIN)

	var ccc = localStorage.getItem("key");
	if (isNaN(ccc) || ccc == null) {
		var diviceHeight = window.devicePixelRatio;
		heightLIN = widthLIN[0] / diviceHeight;
		localStorage.setItem("key", heightLIN);
		localStorage.setItem("key1", arr.length);
	} else {

	}
	var widthLIN = localStorage.getItem("key");
	document.getElementById('widthLI').style.height = widthLIN + 'px';
	document.getElementById('daohanglan').style.top = widthLIN + 'px';
	var dhlH = document.getElementById('daohanglan').offsetHeight;
	document.getElementById('app').style.marginTop = Number(widthLIN) + Number(dhlH) + 'px';

	if (arr.length == "2") {
		window.webkit.messageHandlers.getUserId.postMessage("123");
	} else {
		var userID = window.control.getUserId();
	}
	new Vue({
		el: '#app',
		data: {
			zuanzhong: "1",
		},
		mounted: function () {
			this.$nextTick(function () {
				setInterval(this.sendGetByObj, 500);
			})
		},
		methods: {
			sendGetByObj: function () {
				if (arr.length == "2") {
					var userID = document.getElementById('textarea').innerHTML;

				} else {
					var userID = window.control.getUserId();
				}

				this.$http.get('../index.php/index/token/check', {
					params: {
						apitoken: userID,
					}
				})
					.then(function (res) {
						console.log(res);

					}, function () {
						console.log('请求失败处理');
					});
			},
			qiye: function () {
				this.zuanzhong = "1"
			},
			renyuan: function () {
				this.zuanzhong = "2"
			},
			xiangmu: function () {
				this.zuanzhong = "3"
			},
			panjue: function () {
				this.zuanzhong = "4"
			},
			sousuo: function () {
				var than = this;
				var gsmc = document.getElementById("input").value;
				var conStr = gsmc.replace(/\s+/g, "");
				var zuanzhong = than.zuanzhong;
				if (zuanzhong == '1') {
					localStorage.setItem("key1123", '');
					var gsmc = document.getElementById("input").value;
					window.location.href = "html/sousuo/qiyechaxun.html?aid=" + gsmc;
				} else if (zuanzhong == '2') {
					localStorage.setItem("keyrenyuan", '');
					var gsmc = document.getElementById("input").value;
					window.location.href = "html/sousuo/renyuanchaxun.html?aid=" + gsmc;
				} else if (zuanzhong == '3') {
					localStorage.setItem("key1123", '');
					var gsmc = document.getElementById("input").value;
					window.location.href = "html/sousuo/xiangmuchaxun.html?aid=" + gsmc;
				} else if (zuanzhong == '4') {
					localStorage.setItem("key1123", '');
					window.location.href = "html/sousuo/chayeji.html?aid=" + gsmc;
				}
			},
			
		}
	})
}

function shoucang() {
	window.location.href = "shoucang4.html";
	localStorage.setItem("dianji", '1');
}

function guanzhu() {
	window.location.href = "guanzhu.html";
}

function shareResult(channel_id) {
	var content = channel_id;
	var userID = content;
	document.getElementById('textarea').innerHTML = userID;
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
	var widthLIN1 = localStorage.getItem("key1");
	if (widthLIN1 == "2") {
		window.webkit.messageHandlers.Mclose.postMessage("123");
	} else {
		window.control.mClose();
	}
}