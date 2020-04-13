function index(){
	window.location.href = "index1.html";
}
function guanzhu(){
	window.location.href = "guanzhu.html";
}
function shoucang1(){
    window.location.href = "shoucang1.html";
}
function shoucang2(){
    window.location.href = "shoucang2.html";
}
function shoucang3(){
    window.location.href = "shoucang3.html";
}
function shoucang(){
    window.location.href = "shoucang.html";
}

window.onload=function(){
    var widthLIN = localStorage.getItem("key"); 
    document.getElementById('widthLI').style.height = widthLIN + 'px';
    document.getElementById('daohanglan').style.top = widthLIN + 'px';
    var dhlH = document.getElementById('daohanglan').offsetHeight;
    document.getElementById('app').style.marginTop = Number(widthLIN) + Number(dhlH) + 'px';
    document.getElementById('apps1').style.marginTop = Number(widthLIN) + Number(dhlH) + 'px';
    var time = [];
    var timess = [];
    new Vue({
        el:'#app',
        data:{
            users:[],
            times:[],
        },
        mounted:function(){
            this.sendGetByObj();
        },
        methods:{
            sendGetByObj:function(index){
                if (index == undefined) {
                    index = 'caipan'
                }
                console.log(index)
                this.users = [];
                var than = this;
                axios.get('../index.php/index/stow',{
                    params:{
                        act: 'app',
                        type: index,
                    }
                })
                .then(function (response) {
                    console.log(response.data.content.data)
                    than.users = response.data.content.data;
                    var shijianceshi = response.data.content.data
                    Date.prototype.toLocaleString = function() {
                        return this.getFullYear() + "." + (this.getMonth() + 1) + "." + this.getDate();
                    };
                    for (var i = 0; i < shijianceshi.length; i++) {
                        var time = shijianceshi[i].addtime
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
        }
    });
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