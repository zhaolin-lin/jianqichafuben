window.onload = function() {
    console.log(111)
	new Vue({
            el: '#zhaorencai',
            data: {
                user:'',
                shi:'',
                xianshi:'tuijian'
            },
            mounted: function () {
                this.huoqushuju()
            },
            methods: {
                huoqushuju: function () {
                    fjdf();
                	var than = this;
                    this.$http.post('../../index.php/api/rencai/rencai', {
                            cid:'2001',
                            type:'1',
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            panduandenglu(res)
                            console.log(res.data.data);
                            than.user = res.data.data;
                            // console.log(than.type);
                            // than.user = res.data.data;
                            var shi = localStorage.getItem("shi");
                            than.shi = shi;
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                index:function(){
                    window.location.href = "index.html";
                },
                zhaogongzuo:function(){
                    window.location.href = "zhaogongzuo.html";
                },
                zhaorencai:function(){
                    window.location.href = "zhaorencai.html"
                },
                wode:function(){
                    window.location.href = "wode.html";
                },
                sousuo:function(){
                    window.location.href = "rencaisousuo.html";
                },
                tuijianF:function(a){
                    var than = this;
                    than.xianshi = a;
                },
                zuixinF:function(b){
                    var than = this;
                    than.xianshi = b;
                }
            }
        })

}