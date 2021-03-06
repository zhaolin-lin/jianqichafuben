var search = "";

window.onload = function () {
    // var vConsole = new VConsole();
     var oTxt = document.getElementById('inputi').focus();

     var clientHeight = document.documentElement.clientHeight;   //获取可视区域的高度
    var timer = null; //定义一个定时器
    var isTop = true; //定义一个布尔值，用于判断是否到达顶部

    var lastname = localStorage.getItem("key1123");
    // console.log(lastname)
    var jishu = '0';
    var xuanzhong = "";
    var shiid = "";
    var xianshi = "0";
    var widthLIN = localStorage.getItem("key");
    document.getElementById('widthLI').style.height = widthLIN + 'px';
    document.getElementById('daohanglan').style.top = widthLIN + 'px';
    var dhlH = document.getElementById('daohanglan').offsetHeight;
    document.getElementById('app').style.top = Number(widthLIN) + Number(dhlH) + 'px';
    var name, value;
    var str = location.href;
    var num = str.indexOf("?")
    str = str.substr(num + 1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
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
        el: '#app',
        data: {
            str: search,
            users: [],
            page: "",
            diqus: "",
            sheng: "省/直辖市",
            xian: "",
            shi: "市/县",
            ultimatelyx: "",
            number: "",
            leixing: "",
            typexu: "企业类型",
            typeid: "",
            zzleixing: "",
            zzlx: "选择资质类别",
            zzlxid: "",
            zzleixings: "",
            zzlxs: "选择资质类别",
            // 2020-4-15新增
            isAbove:false,
            isUnder:true,
            province:[],
            country:[],
            companyKind:[],
            aptitudeKind:[],
            aptitudeList:[],
            getProId:"",
            getCouId:"",
            getComName:"",
            aptitudeKey:"",
        }, 
        mounted: function () {
            this.sendGetByObj();
        },
        created: function () {
            window.addEventListener('scroll', this.onScroll);
        },
        methods: {
            // 关闭mask
            closeBox:()=>{
                this.isAbove=false;
                this.isUnder=true;
                console.log("this.isAbove:",this.isAbove,"this.isUnder:",this.isUnder)
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
            },
            // 下拉菜单获取地区
            getLocations:function () {
                var than = this;
                $("#navDown_dq").css("display","block");
                $("#navDown_qy").css("display","none");
                $("#navDown_zz").css("display","none");
                $("#mask").css("display","block");
                this.isAbove=true;
                this.isUnder=false;
                this.$http.post('../../../index.php/index/qy/dq',{
                    params:{
                        act:"app",
                        xian:this.xian
                    }
                })
                .then(res=>{
                    console.log(res.data.list,than.getProId)
                    than.province=res.data.list;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getCountry: function (pid,pname) {
                
                var than = this;
                than.getProId = pname;
                // console.log("province",than.getProId)
                this.$http.get('../../../index.php/index/qy/dq',{
                    params:{
                        act:"app",
                        xian:pid
                    }
                })
                .then(res=>{
                    // console.log(res,res.data.list)
                    than.country=res.data.list;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getClick: function (cid) {
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
                var than =this;
                than.getCouId = cid
                console.log("country",than.getCouId,than.getProId)
                this.$http.get('../../../index.php/index/yj',{
                    params:{
                        act:"app",
                        keyword:than.getProId,
                        nativeplace:than.getCouId,
                    }
                })
                .then(res=>{
                    // console.log(res.data.content.content.data)
                    than.users=res.data.content.content.data;
                    than.page = res.data.content.content.pages;
                    than.number = res.data.content.content.number;
 
 
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            // 获取企业类型
            getCompanyKind:function () {
                $("#navDown_dq").css("display","none");
                $("#navDown_qy").css("display","block");                
                $("#navDown_zz").css("display","none");
                $("#mask").css("display","block");
                this.$http.get("../../../index.php/index/qy/canshu",{
                    params:{
                        act:"app",
                        action:"cslx"
                    }
                })
                .then(res=>{
                    console.log(res);
                    this.companyKind = res.data.typeid
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getCompanyClick:function (tid){
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
                var than = this
                this.getComName = tid
                console.log(this.getProId,this.getCouId,this.getComName)
                this.$http.get('../../../index.php/index/yj',{
                    params:{
                        act:"app",
                        keyword:this.getProId,
                        nativeplace:this.getCouId,
                        tid:this.getComName,
                    }
                })
                .then(res=>{
                    // console.log(res.data.content.content.data)
                    than.users=res.data.content.content.data;
                    than.page = res.data.content.content.pages;
                    than.number = res.data.content.content.number;
                })   
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 获取资质类别
            getAptitudeKind: function () {
                $("#navDown_dq").css("display","none");
                $("#navDown_qy").css("display","none");                
                $("#navDown_zz").css("display","block");
                $("#mask").css("display","block");
                this.$http.get('../../../index.php/index/qy/canshu',{
                    params:{
                        act:"app",
                        action:"zzlb"
                    }
                })
                .then(res=>{
                    console.log("11",res.data.list.list)
                    this.aptitudeKind=res.data.list.list
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            getAptitudeKey:function(key){
                console.log(key)
                this.aptitudeKey = key
                this.$http.get('../../../index.php/index/qy/canshu',{
                    params:{
                        act:"app",
                        action:"zzlb"
                    }
                })
                .then(res=>{
                    // console.log("11",res.data.list.list)
                    for(let i=0;i<this.aptitudeKind.length;i++){
                        if(this.aptitudeKind[i].key==key){
                            this.aptitudeList=res.data.list.list[i].next
                            console.log("for",this.aptitudeList)
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            getAptitudeClick:function (){
                $(".navDown").css("display","none");
                $("#mask").css("display","none");
                var than = this;
                this.$http.get('../../../index.php/index/yj',{
                    params:{
                        act:"app",
                        keyword:this.getProId,
                        nativeplace:this.getCouId,
                        zzlb:this.aptitudeKey,
                        tid:this.getComName,
                    }
                })
                .then(res=>{
                    // console.log(res.data.content.content.data)
                    than.users=res.data.content.content.data;
                    than.page = res.data.content.content.pages;
                    than.number = res.data.content.content.number;
                })   
                .catch(function (error) {
                    console.log(error);
                });
            },
            sendGetByObj: function () {
                 $("#inputi").blur(); 
                document.getElementById('jiazaizhong').style.display = 'block';
                var than = this;
                this.$http.get('../../../index.php/index/yj', {
                    params: {
                        act: "app",
                        keyword: than.str,
                        nativeplace: than.ultimatelyx,
                    },
                })
                    .then(function (res) {
                        // console.log(res.data.content.content.data[0].xm.title);
                        var arr = res.data.content.content.data;
                        var array = [];
                        for (var i = 0 ; i < arr.length ; i++){
                            if (arr[i].xm != null){
                                array.push(arr[i])
                            }
                        }
                        than.users = array
                        than.page = res.data.content.content.pages
                        than.number = res.data.content.content.number
                        document.getElementById('jiazaizhong').style.display = 'none';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            shengObj: function () {
                $(".xuanze").css("display", "block");
                var than = this;
                var xian = '';
                this.$http.get('../../../index.php/index/qy/dq', {
                    params: {
                        act: "app",
                        xian: xian,
                    },
                })
                    .then(function (res) {
                        console.log(res.data.list);
                        than.diqus = res.data.list;
                        than.xian = xian;
                        than.shi = "市/县";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            onScroll: function () {
                var innerHeight = document.querySelector('.quanbu111').clientHeight;
                var outerHeight = document.documentElement.clientHeight;
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                console.log(Number(widthLIN),Number(dhlH))
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
                // console.log(innerHeight + " " + outerHeight + " " + scrollTop + " " + jishu)
                if (innerHeight < (outerHeight + scrollTop) && jishu == "1") {
                    jishu = "2";
                    var than = this;
                    var shuzi = than.page;
                    shuzi++;
                    var qiye1 = than.users;
                    //2.get通过params选项
                    this.$http.get('../../../index.php/index/yj', {
                        params: {
                            act: "app",
                            keyword: than.str,
                            page: shuzi,
                            nativeplace: than.ultimatelyx,
                            zzlb: than.zzlxid,
                            tid: than.typeid,
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.content);
                            var arr = res.data.content.content.data;
                            var array = [];
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i].xm != null) {
                                    array.push(arr[i])
                                }
                            }
                            // var users = res.data.content.content.data;
                            qiyes = qiye1.concat(array)
                            than.users = qiyes;
                            console.log(shuzi)
                            than.page = shuzi
                            console.log(qiyes)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            dianji: function (index) {
                console.log(index)
                $(".libiao ul li").css("color", "#000");
                $("#" + index).css("color", "#FD9700");
                var name = $("#" + index)[0].innerHTML;
                xuanzhong = name;
                shiid = index
            },
            queding: function () {
                var than = this;
                var xian = than.xian;
                if (xian == '') {
                    if (xuanzhong != '') {
                        than.sheng = xuanzhong;
                        than.xian = shiid;
                        than.ultimatelyx = shiid;
                    } else {
                        than.xian = '';
                    }
                    $(".xuanze").css("display", "none");
                } else {
                    if (xuanzhong != '') {
                        than.shi = xuanzhong;
                        than.ultimatelyx = shiid;
                    } else {
                        than.xian = '';
                    }
                    $(".xuanze").css("display", "none");
                }
            },
            shiObj: function () {
                $(".libiao ul li").css("color", "#000");
                var than = this;
                var xian = than.xian;
                if (xian != '') {
                    $(".xuanze").css("display", "block");
                    this.$http.get('../../../index.php/index/qy/dq', {
                        params: {
                            act: "app",
                            xian: xian,
                        },
                    })
                        .then(function (res) {
                            console.log(res.data.list);
                            than.diqus = res.data.list;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    $("#tank").css("display", "block");
                    setTimeout(function () {
                        $("#tank").css("display", "none");
                    }, 1000)
                }
            },
            qytype: function () {
                $(".libiaos ul li").css("color", "#000");
                $(".xuanzes").css("display", "block");
                var than = this;
                var xian = '';
                this.$http.get('../../../index.php/index/qy/canshu', {
                    params: {
                        act: "app",
                        action: "cslx",
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
            dianji1: function (index) {
                console.log(index)
                $(".libiaos ul li").css("color", "#000");
                $("#" + index).css("color", "#FD9700");
                var name = $("#" + index)[0].innerHTML;
                console.log(name)
                this.typexu = name;
                this.typeid = index
            },
            quedings: function () {
                $(".xuanzes").css("display", "none");
            },
            qualification: function () {
                $(".libiaos_1 ul li").css("color", "#000");
                $(".xuanzes_1").css("display", "block");
                var than = this;
                var xian = '';
                this.$http.get('../../../index.php/index/qy/canshu', {
                    params: {
                        act: "app",
                        action: "zzlb",
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
            quedings_1: function () {
                xianshi++;
                var than = this;
                $(".libiaos_1 ul li").css("color", "#000");
                var zzlxid = than.zzlxid;
                var zzleixing = than.zzleixing;
                if (zzleixing[0].next != undefined) {
                    for (var i = 0; i < zzleixing.length; i++) {
                        if (zzleixing[i].key == zzlxid) {
                            console.log(zzleixing[i].next);
                            than.zzleixing = zzleixing[i].next;

                        }
                    }
                } else {
                    $(".xuanzes_1").css("display", "none");
                }
                if (xianshi == '2') {
                    $("#zzlb").css("display", "block");
                }
            },
            dianji1_1: function (index) {
                console.log(index)
                $(".libiaos_1 ul li").css("color", "#000");
                $("#s" + index).css("color", "#FD9700");
                var name = $("#s" + index)[0].innerHTML;
                console.log(name)
                this.zzlx = name;
                this.zzlxid = index
            },
            zzlb: function () {
                var than = this;
                var zzlxid = than.zzlxid;
                $(".xuanzes_1s ul li").css("color", "#000");
                $(".xuanzes_1s").css("display", "block");

                this.$http.get('../../../index.php/index/qy/canshu', {
                    params: {
                        act: "app",
                        action: "zzmc",
                        id: zzlxid
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
            quedings_1s: function () {
                $(".xuanzes_1s").css("display", "none");

            },
            dianji1_1s: function (index) {
                console.log(index)
                $(".libiaos_1s ul li").css("color", "#000");
                $('#zzlb' + index).css("color", "#FD9700");
                var zzleixings = this.zzleixings;
                var index1 = zzleixings[index].key;
                var name = $('#zzlb' + index)[0].innerHTML;
                console.log(name)
                this.zzlxs = name;
                
            },
            quxiao: function () {
                $(".xuanzes_1s").css("display", "none");
                $(".xuanzes_1").css("display", "none");
                $(".xuanzes").css("display", "none");
                $(".xuanze").css("display", "none");
                this.typexu="企业类型";
                this.typeid = "",
                this.zzlx= "选择资质类别",
                this.zzlxid= "",
                this.zzleixings="",
                this.zzlxs="选择资质类别"
            },
            Company: function (id) {
                console.log(this.str)
                var search = this.str
                localStorage.setItem("key1123", search);
                window.location.href = '../qiyexiangqing/gongchenxiangmu.html?id=' + id
            },

        },
    });
}
