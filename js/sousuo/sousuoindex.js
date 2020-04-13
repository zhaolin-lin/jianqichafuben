window.onload=function(){
    var widthLIN = localStorage.getItem("key"); 
    document.getElementById('widthLI').style.height = widthLIN + 'px';
    document.getElementById('daohanglan').style.top = widthLIN + 'px';
    var dhlH = document.getElementById('daohanglan').offsetHeight;
    document.getElementById('app').style.marginTop = Number(widthLIN) + Number(dhlH) + 'px';
    ////////////////////////////////////////////////////////////////
    var mingziss = [];
    var time = [];
    var timess = [];
    var search = "";
    var name,value;
    var jishu = '1';
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
             var haizi = decodeURI(value);
             search = haizi;
        }
   }
    new Vue({
        el:'#app',
        data:{
            str: search,
            getStr: null,
            zongshu:"0",
            renyuans:"",
            xiangmus:"",
            panjues:"",
            qiyes:"",
            times:"",
            renyuansnum:"",
            xiangmusnum:"",
            panjuesnum:"",
            qiyesnum:"",
            page:"1",
            name_ss:"",
        },
        mounted:function(){
            this.sendGetByObj();
        },
        created:function() {
            window.addEventListener('scroll', this.onScroll);
        },
        methods:{
            sendGetByObj:function(){
                document.getElementById('jiazaizhong').style.display = 'block'
                mingziss = [];
                var than = this;
                than.renyuans = [];
                than.xiangmus = [];
                than.panjues = [];
                than.qiyes = [];
                    this.$http.get('../../../index.php/index/api',{
                        params:{
                            act:"app",
                            keyword:than.str,
                        },
                    })
                    .then(function (response) {
                        console.log(response.data.content);
                        than.renyuans = response.data.content.ren.data;
                        var names = response.data.content.ren.data;
                        console.log(names)
                        if(names != undefined){
                            console.log(names.length)
                            var reg = /[\u4e00-\u9fa5]/g;
                            for (var i =  0; i < names.length ; i++) {
                                var name_s = names[i].name;
                                var str = name_s.match(reg);
                                // console.log(name_s)
                                // str = name_s.replace(/\s*/g,"");
                                 mingziss.push(str[0])
                                console.log(mingziss)
                            }
                            than.name_ss = mingziss  
                        }
                        than.renyuansnum = response.data.content.ren.number
                        console.log(response.data.content.ren.number)
                        than.xiangmus = response.data.content.xm.data;
                        than.xiangmusnum = response.data.content.xm.number
                        than.panjues = response.data.content.pj.data;
                        than.panjuesnum = response.data.content.pj.number
                        than.qiyes = response.data.content.qy.data;
                        than.qiyesnum = response.data.content.qy.number
                        var shijianceshi = response.data.content.pj.data;
                        if (shijianceshi != undefined) {
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
                        }
                        document.getElementById('jiazaizhong').style.display = 'none'
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            onScroll:function() {
                var innerHeight = document.querySelector('.quanbu').clientHeight;
                var outerHeight = document.documentElement.clientHeight;
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (innerHeight > (outerHeight + scrollTop)) {
                    jishu = "1"
                }
                console.log(innerHeight+" "+outerHeight+" "+scrollTop+" "+jishu)
                if (innerHeight < (outerHeight + scrollTop) && jishu == "1") {
                    jishu = "2";
                    var than = this;
                    var shuzi = than.page;
                    shuzi++;
                    var qiye1 = than.qiyes;
                         //2.get通过params选项
                    this.$http.get('../../../index.php/index/api',{
                        params:{
                            act:"app",
                            keyword:than.str,
                            page:shuzi,
                        }
                    })
                    .then(function (response) {
                        console.log(response.data.content);
                        var qiyes = response.data.content.qy.data;
                        qiyes = qiye1.concat(qiyes)
                        than.qiyes = qiyes;
                        
                        than.page = shuzi
                        console.log(qiyes)
                    })
                    .catch(function (error){
                        console.log(error);
                    });
                }
            },
            Company:function(id){
                console.log(id)
               window.location.href = '../qiyexiangqing/qiyeIndex.html?id='+ id
            },
            zizhi:function(id){
                window.location.href = '../qiyexiangqing/qiyezizhizhengshu.html?id='+ id
            },
            xiangmu:function(id){
                window.location.href = '../qiyexiangqing/gongchenxiangmu.html?id='+ id
            },
            zhucerenyuan:function(id){
                window.location.href = '../qiyexiangqing/qiyeyuangong.html?id='+ id
            },
            renyuangd:function(){
                var than = this;
                console.log(than.str);
                window.location.href = 'renyuanchaxun.html?aid=' + than.str;
            },
            xiangmugd:function(){
                var than = this;
                console.log(than.str);
                window.location.href = 'xiangmuchaxun.html?aid=' + than.str;
            },
            panjuegd:function(){
                var than = this;
                console.log(than.str);
                window.location.href = 'panjueshu.html?aid=' + than.str;
            },
            qiyegd:function(){
                var than = this;
                console.log(than.str);
                window.location.href = 'qiyechaxun.html?aid=' + than.str;
            },
            renyuanxq:function(aid){
                console.log(aid)
                window.location.href = '../gerenshooucang/gerenxiangqing.html?aid=' + aid;
            },
            xiangmuxq:function(aid){
                console.log(aid)
                window.location.href = '../shoucang/xiangmuxiangqing.html?aid=' + aid;
            },
            panjuexq:function(aid){
                console.log(aid)
                window.location.href = '../anjianxiangqing/anjianxiangqing1.html?aid=' + aid;
            }
        }
    })
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
    window.history.back(-1);
}