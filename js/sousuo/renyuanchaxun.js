var search="";

window.onload=function(){
    var clientHeight = document.documentElement.clientHeight;   //获取可视区域的高度
    var timer = null; //定义一个定时器
    var isTop = true; //定义一个布尔值，用于判断是否到达顶部

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
            xianshuu:"0",
            // 2020-4-15新增
            isAbove:false,
            isUnder:true,
            registerKind:[],
            registerList:[],
            registerObj:[],
            regKey:"",
            regTypeId:""
        },
        mounted:function(){                                                                                
            this.sendGetByObj();
        },
        created:function(){
            window.addEventListener('scroll', this.onScroll);
        },
        methods:{
             // 关闭mask
             closeBox:()=>{
                this.isAbove=false;
                this.isUnder=true;
                console.log("this.isAbove:",this.isAbove,"this.isUnder:",this.isUnder)
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
            },
            // 获取注册类别
            getRegisterKind:function () {
                $("#navDown_lb").css("display","block");
                $("#navDown_zy").css("display","none");
                $("#mask").css("display","block");
                this.$http.get("../../../index.php/Index/rys/lx",{
                    params:{

                    }
                })
                .then(res=>{
                    // console.log(res);
                    this.registerKind = res.data.list;
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            getRegisterList: function (key){
                this.$http.get("../../../index.php/Index/rys/lx",{
                    params:{

                    }
                })
                .then(res=>{
                    for(let i = 0;i<this.registerKind.length;i++){
                        if(this.registerKind[i].key==key){
                            this.registerList=res.data.list[i].next;
                            console.log("for",this.registerList)
                        }
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            getRegisterClick:function(key){
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
                this.regKey = key;
                var than=this
                this.$http.get("../../../index.php/Index/rys",{
                    params:{
                        act:"app",
                        keyword:than.str,
                        nativeplace:than.ultimatelyx,
                        leixing:this.regKey,
                        typeid:this.regTypeId
                    }
                })
                .then(res=>{
                    console.log(res.data.content.content);
                    this.users = res.data.content.content.data;
                    this.shuliang = res.data.content.content;
                    this.yeshu = res.data.content.content.number;
                    this.pages = res.data.content.content.pages;
                    this.xianshuu = "1";
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            // 获取注册专业
            getRegisterObj:function(){
                $("#navDown_lb").css("display","none");
                $("#navDown_zy").css("display","block");
                $("#mask").css("display","block");
                this.$http.get("../../../index.php/Index/rys/zy",{
                    params:{}
                })
                .then(res=>{
                    console.log(res.data.list[0]);
                    this.registerObj = res.data.list[0];
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            getRegObjClick: function(id){
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
                this.regTypeId = id;
                var than = this;
                this.$http.get("../../../index.php/Index/rys",{
                    params:{
                        act:"app",
                        keyword:than.str,
                        nativeplace:than.ultimatelyx,
                        leixing:this.regKey,
                        typeid:this.regTypeId
                    }
                })
                .then(res=>{
                    console.log(res.data.content.content);
                    this.users = res.data.content.content.data;
                    this.shuliang = res.data.content.content;
                    this.yeshu = res.data.content.content.number;
                    this.pages = res.data.content.content.pages;
                    this.xianshuu = "1";
                })
                .catch(function(error){
                    console.log(error);
                })
            },
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
                var innerHeight = document.querySelector('.quanbu111').clientHeight;
                var outerHeight = document.documentElement.clientHeight;
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(scrollTop > 131){
                    $('#xuanxiang').css('position' , 'fixed')
                    $('#xuanxiang').css('top' , Number(dhlH) + 'px')
                    $('#xuanxiang').css('left' , '0px')
                }else{
                    $('#xuanxiang').css('position' , '')
                    $('#xuanxiang').css('top' , '')
                    $('#xuanxiang').css('left' , '')
                }
                  //获取滚动条的滚动高度
            
        
                  if(scrollTop >= outerHeight){  //如果滚动高度大于可视区域高度，则显示回到顶部按钮
                    $('#return_top').css('display' , 'flex')
                  }else{         //否则隐藏
                    $('#return_top').css('display' , 'none')
                  }
          
                  //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
                  if(!isTop){     
                      clearInterval(timer);
                  }
                  isTop = false;
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
                    .then(function (res) {
                        console.log(res.data.content);
                        var users = res.data.content.content.data;
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