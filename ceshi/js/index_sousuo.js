window.onload = function() {
    var shuju = localStorage.getItem("shuju");
    var shujujiemi = unescape(shuju);
    var shujujiemi1 =  JSON.parse(shujujiemi)
    console.log(shujujiemi1);
	new Vue({
            el: '#index_sousuo',
            data: {
                bodyxs:'1',
                shi:'',
                inpVal:'',
                reName:'',
                reNamename:'',
                sousuoci:'',
                user:'',
                shaixuan:'',
                sxtiaojian:'',
                userLength:'',
                diqu:'',
                hangye:'',
                hangyeTwo:'',
                xingzhi:'',
                aaa:'',
                xingzhiTil:'',
                hangyeTil:'行业',
                didianTil:'地点'

            },
            mounted: function () {
                this.huoqushuju();
                var shuju = localStorage.getItem("shuju");
                var shujujiemi = unescape(shuju);
                var shujujiemi1 =  JSON.parse(shujujiemi);
                console.log(shujujiemi1);
                if(shujujiemi1.fanhui == '111'){
                    this.zhiweishuju();
                    this.bodyxs = shujujiemi1.bodyxs;
                }
            },
            methods: {
                // 热门职位的数据
                huoqushuju: function () {
                    fjdf();
                	var than = this;
                    this.$http.post('../../index.php/api/shouye/shouyesousuo', {
                            id:'2001'
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.data);
                            than.xingzhiTil = res.data.data.hanzi;
                            var shi = localStorage.getItem("shi");
                            than.shi = shi;
                            than.reName = res.data.data;
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                // 职位数据
                zhiweishuju: function () {
                    fjdf();
                    var than = this;
                    var shuju = localStorage.getItem("shuju");
                    var shujujiemi = unescape(shuju);
                    var shujujiemi1 =  JSON.parse(shujujiemi);
                    console.log(shujujiemi1);
                    this.$http.post('../../index.php/api/shouye/change', {
                            cid:'2001',
                            hangye:shujujiemi1.hangye,
                            type:shujujiemi1.hangye,
                            xinzi:shujujiemi1.xinzi,
                            fabu:shujujiemi1.fabu,
                            jingyan:shujujiemi1.jingyan,
                            guimo:shujujiemi1.guimo,
                            rongzi:shujujiemi1.rongzi,
                            gongsi:shujujiemi1.gongsi,
                            xingzhi:shujujiemi1.xingzhi,
                            xueli:shujujiemi1.xueli,
                            data:'水',
                            page:'1',
                            pagesize:'10',
                            status:'1'

                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.data);
                            than.user = res.data.data;
                            than.userLength = res.data.data.length;
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                // 筛选条件的数据
                shaixuanF:function(text){
                    fjdf();
                    var than = this;
                    axios.post('../../index.php/api/shouye/typeselect', {
                            cid:'2001',
                            status:'1'
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.data);
                            than.shaixuan = res.data.data;
                            than.diqu = res.data.data['diqu'];
                            than.hangye = res.data.data['hangye'];
                            than.xingzhi = res.data.data['xingzhi'];
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                // 搜索关键词之后含有关键词的数据
                sousuoTan:function(){
                    fjdf();
                    var than = this;
                    this.$http.post('../../index.php/api/shouye/dynamic', {
                            cid:'2001',
                            name:than.inpVal
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.data);
                            than.sousuoci = res.data.data;
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                // 地区行业薪资的点击事件
                didianF:function(text){
                    var than = this;
                    if(text == 'diqu'){
                        than.aaa = '1'; 
                    }else if(text == 'hangye'){
                        than.aaa = '2'; 
                    }else if(text == 'xingzhi'){
                        than.aaa = '3'; 
                    }
                	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
                    than.sxtiaojian = text;
                    this.shaixuanF(text)
                },
                // 地区行业薪资的条件的点击事件
                shaixuanzhi:function(id,name,type,index){
                    var than = this;
                    if(than.sxtiaojian == 'diqu'){
                        var diquArr = {};
                        diquArr['cid'] = id;
                        _shuzhu(diquArr);
                        this.zhiweishuju();
                        than.didianTil = name;
                    }else if(than.sxtiaojian == 'xingzhi'){
                        than.xinziid = id;
                        var xinziArr = {};
                        xinziArr['xingzhi'] = id;
                        _shuzhu(xinziArr);
                        than.xingzhiTil = name;
                        this.zhiweishuju();
                    }
                    $('.top_inp').val('')
                    this.tan1();
                },
                hangyeF:function(index){
                    var than = this;
                    than.hangyeTwo = than.hangye[index].zi;
                    $('#id'+index).css({'color':'#FF8F00'}).siblings().css({'color':'#555'});
                    $('.hyid').css({'color':'#555'})
                },
                hangyeF1:function(name,id,type,index){
                    var than = this;
                    than.hangyeTil = name;
                    if(type == '1' || type == '2'){
                        type = '1';
                    }else if(type == '3'){
                        type = '2';
                    }
                    $('#idd'+index).css({'color':'#FF8F00'}).siblings().css({'color':'#555'})
                    var hangyeArr = {};
                    hangyeArr['hangye'] = id;
                    hangyeArr['type'] = type;
                    _shuzhu(hangyeArr);
                    this.zhiweishuju();
                    $('.tan1').css({'display':'none'});
                    $('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
                },
                // 弹框消失事件
                tan1:function(){
                	$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
                },
                // 跳转到高级筛选页面
                gaojishaixuan:function(){
                    var gaoji = {
                        bodyxs : '3'
                    };
                    _shuzhu(gaoji);
                    window.location.href = "gaojishaixuan.html"
                },
                // 选中input框的时候触发的事件，输入数据
                inpF:function(){
                    var than = this;
                    than.inpVal = $('.top_inp').val();
                    console.log(111);
                    than.bodyxs = '2';
                    if(than.inpVal == ''){
                         than.bodyxs = '1'
                    };
                    this.sousuoTan();
                },
                // 点击热门职位的关键词的事件
                reTypeF:function(a){
                    var than = this;
                    if(than.reName[a].type == '1' || than.reName[a].type == '2'){
                        than.reName[a].type = '1';
                    }else if(than.reName[a].type == '3'){
                        than.reName[a].type = '2';
                    }
                    than.inpVal = than.reName[a].name;
                    than.bodyxs = '3';
                    var reTypeArr = {};
                    reTypeArr['type'] = than.reName[a].type;
                    _shuzhu(reTypeArr);
                    $('.renmenzhiwei').css({'display':'none'});
                    _shuzhu();
                    this.zhiweishuju();
                    $('.top_inp').val(than.inpVal);
                },
                // 点击弹出的搜索词页面
                kongbai:function(index){
                    var than = this;
                    than.bodyxs = '3';
                   if(than.sousuoci[index].type == '1' || than.sousuoci[index].type == '2'){
                        than.sousuoci[index].type = '1';
                    }else if(than.sousuoci[index].type == '3'){
                        than.sousuoci[index].type = '2';
                    }
                   than.inpVal = than.sousuoci[index].name;
                   var sousuociArr = {};
                    sousuociArr['type'] = than.sousuoci[index].type;
                    _shuzhu(sousuociArr);
                   $('.top_inp').val(than.inpVal);
                   this.zhiweishuju();  
                },
                // 跳转到职位详情的方法
                zhiweixiangqingF:function(id,typeid){
                    window.location.href = "zhiweixiangqing.html?id="+id+"&type="+typeid;
                },
                fanhuiF:function(){
                     window.history.go(-1);
                }
            }
        })


}