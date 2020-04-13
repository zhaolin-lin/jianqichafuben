    window.onload=function(){
    var jishu = '0';
    var xuanzhong = "";
    var shiid = "";
    var widthLIN = localStorage.getItem("key"); 
    document.getElementById('widthLI').style.height = widthLIN + 'px';
    document.getElementById('daohanglan').style.top = widthLIN + 'px';
    var dhlH = document.getElementById('daohanglan').offsetHeight;
    document.getElementById('app').style.top = Number(widthLIN) + Number(dhlH) + 'px';
    var search = "";
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
             var haizi = decodeURI(value);
             search = haizi;
        }
   }
    new Vue({
        el:'#app',
            data:{
                // str:search,
                users:[],
                page:"",
                diqus:"",
                sheng:"省/直辖市",
                xian:"",
                shi:"市/县",
                ultimatelyx:"",
                number:"",
                leixing:"",
                typexu:"企业类型",
                typeid:"",
                zzleixing:"",
                zzlx:"选择资质类别",
                zzlxid:"",
                zzleixings:"",
                zzlxs:"选择资质类别"
            },
        mounted:function(){                                                                                
            this.sendGetByObj();
        },
        created:function() {
            window.addEventListener('scroll', this.onScroll);
        },
        methods:{
            sendGetByObj:function(){
                var than = this;
                this.$http.get('../../../index.php/index/qy',{
                    params:{
                        act:"app",
                        // keyword:than.str,
                        nativeplace:than.ultimatelyx,
                        zzlb:than.zzlxid,
                        tid:than.typeid,
                    },
                })
                .then(function (res) {
                    console.log(res);
                    than.users = res.data.content.content.data
                    than.page = res.data.content.content.pages
                    than.number = res.data.content.content.number
                })
                .catch(function (error) {
                     console.log(error);
                }); 
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
                .then(function (res) {
                    console.log(res.data.list);
                    than.diqus = res.data.list;
                    than.xian = xian;
                })
                .catch(function (error) {
                     console.log(error);
                });
            },
            onScroll:function(){
                var innerHeight = document.querySelector('.quanbu111').clientHeight;
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
                    var qiye1 = than.users;
                         //2.get通过params选项
                    this.$http.get('../../../index.php/index/qy',{
                        params:{
                            act:"app",
                            // keyword:than.str,
                            page:shuzi,
                            nativeplace:than.ultimatelyx,
                            zzlb:than.zzlxid,
                            tid:than.typeid,
                        }
                    })
                    .then(function (res) {
                        console.log(res.data.content);
                        var users = res.data.content.content.data;
                        qiyes = qiye1.concat(users)
                        than.users = qiyes;
                        
                        than.page = shuzi
                        console.log(qiyes)
                    })
                    .catch(function (error){
                        console.log(error);
                    });
                }
            },  
            dianji:function(index){
                console.log(index)
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
                    this.$http.get(`../../../index.php/index/qy/dq`,{
                        params:{
                            act:"app",
                            xian:xian,
                        },
                    })
                    .then(function (res) {
                        console.log(res.data.list);
                        than.diqus = res.data.list;
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
            qytype:function(){
                 $(".libiaos ul li").css("color","#000");
                  $(".xuanzes").css("display","block");
                var than = this;
                var xian = '';
                this.$http.get('../../../index.php/index/qy/canshu',{
                    params:{
                        act:"app",
                        action:"cslx",
                    },
                })
                .then(function (res) {
                    console.log(res.data.typeid);
                    than.leixing = res.data.typeid
                })
                .catch(function (error) {
                     console.log(error);
                });
            },
            dianji1:function(index){
                console.log(index)
                $(".libiaos ul li").css("color","#000");
                $("#"+index).css("color","#FD9700");
                var name = $("#"+index)[0].innerHTML;
                console.log(name)
                this.typexu = name;
                this.typeid = index
            },
            quedings:function(){
                $(".xuanzes").css("display","none");
            },
            qualification:function(){
                $(".libiaos_1 ul li").css("color","#000");
                $(".xuanzes_1").css("display","block");
                var than = this;
                var xian = '';
                this.$http.get('../../../index.php/index/qy/canshu',{
                    params:{
                        act:"app",
                        action:"zzlb",
                    },
                })
                .then(function (res) {
                    console.log(res.data.list.list);
                    than.zzleixing = res.data.list.list
                })
                .catch(function (error) {
                     console.log(error);
                });
            },
            quedings_1:function(){
                var than = this;
                $(".libiaos_1 ul li").css("color","#000");
                var zzlxid = than.zzlxid;
                var zzleixing = than.zzleixing;
                if (zzleixing[0].next != undefined) {
                    for(var i = 0 ; i < zzleixing.length ; i++){
                        if (zzleixing[i].key == zzlxid) {
                            console.log(zzleixing[i].next);
                            than.zzleixing = zzleixing[i].next;
                        }
                    }
                     $("#zzlb").css("display","block");
                }else{
                    $(".xuanzes_1").css("display","none");
                }
                
            },
            dianji1_1:function(index){
                console.log(index)
                $(".libiaos_1 ul li").css("color","#000");
                $("#"+index).css("color","#FD9700");
                var name = $("#"+index)[0].innerHTML;
                console.log(name)
                this.zzlx = name;
                this.zzlxid = index
            },
            zzlb:function(){
                var than = this;
                var zzlxid = than.zzlxid;
                  $(".xuanzes_1s ul li").css("color","#000");
                $(".xuanzes_1s").css("display","block");

                this.$http.get('../../../index.php/index/qy/canshu',{
                    params:{
                        act:"app",
                        action:"zzmc",
                        id:zzlxid
                    },
                })
                .then(function (res) {
                    console.log(res);
                     than.zzleixings = res.data.list.list
                })
                .catch(function (error) {
                     console.log(error);
                });
            },
            quedings_1s:function(){
                $(".xuanzes_1s").css("display","none");

            },
            dianji1_1s:function(index){
                console.log(index)
                $(".libiaos_1s ul li").css("color","#000");
                $('#zzlb' + index).css("color","#FD9700");
                var zzleixings = this.zzleixings;
                var index1 = zzleixings[index].key;
                var name = $('#zzlb' + index)[0].innerHTML;
                console.log(name)
                this.zzlxs = name;
                this.zzlxid = index1
            },
            quxiao:function(){
                $(".xuanzes_1s").css("display","none");
                $(".xuanzes_1").css("display","none");
                $(".xuanzes").css("display","none");
                $(".xuanze").css("display","none");
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
            }
        },
    });
}
  