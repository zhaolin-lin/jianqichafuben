	var haizi = "";
	window.onload=function(){
	var widthLIN = localStorage.getItem("key"); 
	document.getElementById('widthLI').style.height = widthLIN + 'px';
	document.getElementById('daohanglan').style.top = widthLIN + 'px';
	var dhlH = document.getElementById('daohanglan').offsetHeight;
	document.getElementById('app').style.marginTop = Number(widthLIN) + Number(dhlH) + 'px';
	var name,value;
	var str=location.href; //取得整个地址栏
	var num=str.indexOf("?")
	str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
	var arr=str.split("&"); //各个参数放到数组里
	for(var i=0;i < arr.length;i++){
		num=arr[i].indexOf("=");
		if(num>0){
			name=arr[i].substring(0,num);
			value=arr[i].substr(num+1);
			this[name]=value;
			haizi = decodeURI(value);
		}
	}
	var time = [];
	var timess = [];
	new Vue({
		el:'#app',
		data:{
			users:[],
			anjians:[], 
			times:[],
			str: haizi,
			getStr: null,
			ajsum:"",
			added:"",
		},
		mounted:function(){
			this.sendGetByObj();   
		},
		methods:{
			sendGetByObj:function(){  
				this.getStr = this.str.toUpperCase();
				var than = this;
				this.$http.get('../../../index.php/Index/pjs',{
					params:{
						act:"app",
						keyword:than.str 
					}    
				})
				.then(function (response) {
					console.log(response.data.content.content.data);
					than.ajsum = response.data.content.counts;
					than.added = response.data.content.newcounts
					than.anjians = response.data.content.content.data
					 var shijianceshi = response.data.content.content.data;
						console.log(shijianceshi)
							Date.prototype.toLocaleString = function() {
								return this.getFullYear() + "." + (this.getMonth() + 1) + "." + this.getDate();
								 };
							for (var i = 0; i < shijianceshi.length; i++) {
								var time = shijianceshi[i].endtime
									var unixTimestamp = new Date( time*1000 ) ;
									commonTime = unixTimestamp.toLocaleString();
									timess.push(commonTime)
							 }
							than.times = timess;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			xiangqing:function(index){
				console.log(index)
				window.location.href = "../anjianxiangqing/anjianxiangqing1.html?aid="+index;
			}
		},
				 
	});
}        
	function mingshian(){
		window.location.href = "../anjiansousuo/minshian.html?aid="+haizi;
	}
	function peichangan(){
		window.location.href = "../anjiansousuo/peichangan.html?aid="+haizi;
	}
	function xingshianjian(){
		window.location.href = "../anjiansousuo/xingshianjian.html?aid="+haizi;
	}
	function xingzhengan(){
		window.location.href = "../anjiansousuo/xingzhengan.html?aid="+haizi;
	}
	function zhixingan(){
		window.location.href = "../anjiansousuo/zhixingan.html?aid="+haizi;
	}
	function panjueshuanniu(){
		window.location.href = "qiyechaxun.html";
	}
	function xiangmuanniu(){
		window.location.href = "xiangmuchaxun.html";
	}
	function renyuananniu(){
		window.location.href = "renyuanchaxun.html";
	}
	function zongheanniu(){
		window.location.href = "zonghechaxun.html";
	}
	function zizhianniu(){
	   window.location.href = "qiyezizhichaxun.html";
	}
function Mclose(){
	  var widthLIN1 = localStorage.getItem("key1"); 
	  if (widthLIN1 == "2") {
		 window.webkit.messageHandlers.Mclose.postMessage("123");
	 }else{
		window.control.mClose();
	 }
	  
}
function Mback(){
	window.history.go(-1);
}