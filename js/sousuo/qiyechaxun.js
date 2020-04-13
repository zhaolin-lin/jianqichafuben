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
function panjueshuanniu(){
	window.location.href = "panjueshu.html";
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
function zizhionck(element){
	var aid = element.id
	window.location.href = "../qiyexiangqing/qiyezizhizhengshu.html?aid="+aid;
}
function xiangmu(element){
	var aid = element.id
	window.location.href = "../qiyexiangqing/gongchenxiangmu.html?aid="+aid;
}
function zhucerenyuan(element){
	var aid = element.id
	window.location.href = "../qiyexiangqing/qiyeyuangong.html?aid="+aid;
}