window.onload = function() {
    var vConsole = new VConsole();
	new Vue({
            el: '#rencaisousuo',
            data: {
                shi:''
            },
            mounted: function () {
                this.huoqushuju()
            },
            methods: {
                huoqushuju: function () {
                    var than = this;
                    var shi = localStorage.getItem("shi");
                    than.shi = shi;

                	// var than = this;
                 //    this.$http.post('../../index.php/api/rencai/sclicksearch', {
                 //            id:'2001',
                 //            type:'1',
                 //    })
                 //        .then(function (res) {
                 //            console.log(res.data.data);
                 //            than.user = res.data.data;
                 //            // console.log(than.type);
                 //            // than.user = res.data.data;
                 //            var shi = localStorage.getItem("shi");
                 //            than.shi = shi;
                 //        }, function () {
                 //            console.log('请求失败处理');
                 //        });
                },
                didian:function(){
                	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                },
                tan1:function(){
                	$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                },
                gaojishaixuan:function(){
                    window.location.href = "rencai_gaojishaixuan.html"
                }
            }
        })


}