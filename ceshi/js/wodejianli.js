// 首页轮播图部分
window.onload = function () {

    new Vue({
        el: '#app',
        data: {
            users: "",
            jiben:"",
            yixiang:"",
            pingjia:"",
            jingyan:"",
            xiangmu:"",
            jiaoyu:"",
            zhengshu:"",
            panduantouxiang:"",
        },
        mounted: function () {
            this.huoqushuju()
        },
        methods: {

            huoqushuju: function () {
                fjdf();
                var than = this;
                this.$http.post('../../index.php/api/wode/personal_center', {
                    mid: '3299'
                },{
                    headers:{
                            'Cookies':ashjd
                        }
                })
                    .then(function (res) {
                        than.users = res.data.data;
                        than.jiben = res.data.data.jiben
                        than.yixiang = res.data.data.yixiang
                        than.pingjia = res.data.data.pingjia
                        than.jingyan = res.data.data.jingyan
                        than.xiangmu = res.data.data.xiangmu
                        than.jiaoyu = res.data.data.jiaoyu
                        than.peixun = res.data.data.peixun
                        than.zhengshu = res.data.data.zhengshu
                        var touxsakl = res.data.data.jiben.face;
                        
                        var touxsakls = 'http://192.168.2.100:99' + touxsakl;
                        console.log(touxsakls)
                        this.$http.post(touxsakls, {
                        })
                            .then(function (res) {
                                console.log(res)
                                
                                than.panduantouxiang = '0';
                            }, function () {
                                than.panduantouxiang = '1';
                                console.log('请求失败处理');
                            });
                    }, function () {
                        console.log('请求失败处理');
                    });
            },
            tiaozhuan:function(e){
                window.location.href = "html/xiugaiziliao/jibenxixi.html?aid=" + e;
            },
            qiuzhi:function(){
                window.location.href = "html/xiugaiziliao/qiuzhiyiyang.html";
            },
            ziwo:function(){
                window.location.href = "html/xiugaiziliao/ziwopingjia.html";
            },
            gongzuo:function(){
                window.location.href = "html/xiugaiziliao/gongzuojingli.html";
            },
            xiangmu:function(){
                window.location.href = "html/xiugaiziliao/xiangmujingli.html";
            },
            jiaoyu:function(){
                window.location.href = "html/xiugaiziliao/jianyujingli.html";
            },
            peixun: function () {
                window.location.href = "html/xiugaiziliao/peixunjingli.html";
            },
        }
    })
}