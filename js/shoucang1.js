
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
                    index = 'qy'
                }
                console.log(index)
                this.users = [];
                var than = this;
                this.$http.get('../index.php/index/stow',{
                    params:{
                        act: 'app',
                        type: index,
                    }
                })
                .then(function (res) {
                    console.log(res.data.content.data)
                    than.users = res.data.content.data;
                    var shijianceshi = res.data.content.data
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
            tiaozhuan:function(id,tuanz,aaid){
                console.log(id + tuanz)
                if (tuanz == '企业信息') {
                    console.log('1')
                    window.location.href = 'html/qiyexiangqing/qiyeIndex.html?id='+ id
                }else if(tuanz == '企业资质'){
                    console.log('2')
                    window.location.href = 'html/qiyexiangqing/qiyezizhizhengshu.html?id='+ id + '&aaid=' + aaid;
                }else if(tuanz == '企业不良信息'){
                    console.log('3')
                     window.location.href = 'html/qiyexiangqing/buliangxinxi.html?id='+ id
                }else if(tuanz == '企业黑名单'){
                    console.log('4')
                     window.location.href = 'html/qiyexiangqing/heimingdan.html?id='+ id
                }
            }
        }, 
                 
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