window.onload=function(){
    var lastname = localStorage.getItem("keyrenyuan");
	var xuanzhong = "";
	var shiid = "";
	var gerenzhoinglei = "";
	var gerebid="";
    var jishu = "0";
    var widthLIN = localStorage.getItem("key"); 
    document.getElementById('widthLI').style.height = widthLIN + 'px';
    document.getElementById('daohanglan').style.top = widthLIN + 'px';
    var dhlH = document.getElementById('daohanglan').offsetHeight;
    document.getElementById('app').style.top = Number(widthLIN) + Number(dhlH) + 'px';
    var search = "";
    var name,value;
    var str=location.href;
    var num=str.indexOf("?")
    str=str.substr(num+1);
    var arr=str.split("&");
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
            var haizi = decodeURI(value);
            search = haizi;
            if (search == '' || lastname != '') {
                if (lastname != '' && lastname != null) {
                    search = lastname
                }
            }
        }
    }
    new Vue({
        el:'#app',
        data:{
            str:search,
            zhiyestr:"",
            users:"",
            diqus:"",
            sheng:"省/直辖市",
            xian:"",
            shi:"市/县",
            ultimatelyx:"",
            renyuan:"",
            rydalein:"选择人员大类",
            ryzhengshus:"证书专业、等级",
            panduanlx:"",
            yeshu:"",
            pages:"",
            shuliang:"",
            xianshuu:"0"
        },
        mounted:function(){                                                                                
            this.sendGetByObj();
        },
        created:function(){
            window.addEventListener('scroll', this.onScroll);
        },
        methods:{
            sendGetByObj:function(){
                var than = this;
                than.xianshuu = "0";
                this.$http.get('../../../index.php/Index/rys',{
                    params:{
                        act:"app",
                        keyword:than.str,
                        nativeplace:than.ultimatelyx,
                        leixing:gerebid,
                        zyyzh:than.zhiyestr,
                    }
                })
                .then(function (response) {
                    console.log(response.data.content.content)
                    than.shuliang = response.data.content.content;
                    than.users = response.data.content.content.data;
                    than.yeshu = response.data.content.content.number;
                    than.pages = response.data.content.content.pages;
                    than.xianshuu = "1";
                })
                .catch(function (error){
                    console.log(error);
                });
            },
            onScroll:function(){
                var innerHeight = document.querySelector('#app').clientHeight;
                var outerHeight = document.documentElement.clientHeight;
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (innerHeight > (outerHeight + scrollTop)) {
                    jishu = "1"
                }
                console.log(innerHeight+" "+outerHeight+" "+scrollTop+" "+jishu)
                if (innerHeight < (outerHeight + scrollTop) && jishu == "1") {
                    jishu = "2";
                    var than = this;
                    var shuzi = than.pages;
                    shuzi++;
                    var userss = than.users;
                    this.$http.get('../../../index.php/Index/rys',{
                        params:{
                            act:"app",
                            keyword:than.str,
                            nativeplace:than.ultimatelyx,
                            leixing:gerebid,
                            zyyzh:than.zhiyestr,
                            page:shuzi
                        },
                    })
                    .then(function (response) {
                        console.log(response.data.content);
                        var users = response.data.content.content.data;
                        qiyes = userss.concat(users)
                        than.users = qiyes;
                        than.pages = shuzi
                        console.log(qiyes)
                    })
                    .catch(function (error){
                        console.log(error);
                    });
                }   
            }, 
            shengObj:function(){
                $(".xuanze").css("display","block");
                var than = this;
                var xian = '';
                this.$http.get('../../../index.php/index/qy/dq',{
                    params:{
                        act:"app",
                        xian:xian,
                    },
                })
                .then(function (response) {
                    console.log(response.data.list);
                    than.diqus = response.data.list;
                    than.xian = xian;
                })
                .catch(function (error) {
                     console.log(error);
                });
            }, 
            dianji:function(index){
                console.log(index)
                var than = this;
                $(".libiao ul li").css("color","#000");
                $("#"+index).css("color","#FD9700");
                var name = $("#"+index)[0].innerHTML;
                xuanzhong = name;
                shiid = index
            },
            queding:function(){
                var than = this;
                var xian = than.xian;
                if (xian == '') {
                    if (xuanzhong != '') {
                       than.sheng = xuanzhong; 
                       than.xian = shiid;
                       than.ultimatelyx = shiid;
                    }else{
                        than.xian = '';
                    }
                    $(".xuanze").css("display","none");
                }else{
                    if (xuanzhong != '') {
                       than.shi = xuanzhong; 
                       than.ultimatelyx = shiid;
                    }else{
                        than.xian = '';
                    }
                    $(".xuanze").css("display","none");
                }
            },
            shiObj:function(){
                 $(".libiao ul li").css("color","#000");
                var than = this;
                var xian = than.xian;
                if (xian != '') {
                    $(".xuanze").css("display","block");
                    this.$http.get('../../../index.php/index/qy/dq',{
                        params:{
                            act:"app",
                            xian:xian,
                        },
                    })
                    .then(function (response) {
                        console.log(response.data.list);
                        than.diqus = response.data.list;
                    })
                    .catch(function (error) {
                         console.log(error);
                    });
                }else{
                    $("#tank").css("display","block");
                    　setTimeout(function(){
                        $("#tank").css("display","none");
                    },1000)
                }
            },
            quxiao:function(){
            	 $(".xuanze").css("display","none");
            },
            quxiaos:function(){
            	 $(".xuanzes").css("display","none");
            },
            quedings:function(){
            	console.log(gerenzhoinglei)
                var than = this;
                var panduanlx = than.panduanlx;
                if (panduanlx == '1') {
                    than.rydalein = gerenzhoinglei
                }else{
                    than.ryzhengshus = gerenzhoinglei
                }
            	$(".xuanzes").css("display","none");
            },
            dianjis:function(index){
            	console.log(index)
            	$(".libiaos ul li").css("color","#000");
            	var id = 'ry' + index
            	$("#"+id).css("color","#FD9700");
            	var name = $("#"+id)[0].innerHTML;
                gerenzhoinglei = name;
                gerebid = index
            },
            rydalei:function(){
            	$(".xuanzes").css("display","block");
            	$(".libiaos ul li").css("color","#000");
            	var than = this;
                var xian = '';
                this.$http.get('../../../index.php/Index/rys/lx',{
                    params:{
                        act:"app",
                    },
                })
                .then(function (response) {
                    console.log(response.data.list);
                    than.renyuan = response.data.list;
                    than.panduanlx = '1';
                })
                .catch(function (error) {
                     console.log(error);
                });
            },
            ryzhengshu:function(){
                $(".libiaos ul li").css("color","#000");
            	$(".xuanzes").css("display","block");
            	var than = this;
            	var renyuan = than.renyuan;
            	for (var i = 0; i < renyuan.length ; i++) {
            		if (renyuan[i].key == gerebid) {
            			than.renyuan = renyuan[i].next;
                        than.panduanlx = '2';
            		}
            	}
            },
            tiaozhuan1:function(e){
                console.log(e)
                var search = this.str
                console.log(search)
                localStorage.setItem("keyrenyuan", search);
                window.location.href = "../gerenshooucang/gerenxiangqing.html?aid=" + e;
            }
        }
    });
}

function panjueshuanniu(){
    window.location.href = "panjueshu.html";
}
function xiangmuanniu(){
    window.location.href = "xiangmuchaxun.html";
}
function renyuananniu(){
    window.location.href = "qiyechaxun.html";
}
function zongheanniu(){
    window.location.href = "zonghechaxun.html";
}
function zizhianniu(){
    window.location.href = "qiyezizhichaxun.html";
}
function Mclose(){
    var widthLIN1 = localStorage.getItem("key1"); 
    if (widthLIN1 == "2"){
        window.webkit.messageHandlers.Mclose.postMessage("123");
    }else{
        window.control.mClose();
    }
}
function Mback(){
    window.history.go(-1);
}1