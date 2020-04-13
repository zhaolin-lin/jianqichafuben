
window.onload = function() {
    // 获取地址栏里面的id和type的值
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    var ids = theRequest.id;
    var types = theRequest.type;
    console.log(types)
    var id= ids;
    var type = types;

    new Vue({
            el: '#zhiweixiangqing',
            data: {
                id:id,
                typeL:type,
                user:'',
                tuijian:'',
                qiye:''
            },
            mounted: function () {
                this.huoqushuju()
            },
            methods: {
                huoqushuju: function () {
                    fjdf();
                    var than = this;
                    var a = than.typeL;
                    this.$http.post('../../index.php/api/position/position_detail', {
                       id:than.id,
                       type:a,
                       mid:''
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.data);
                            than.user = res.data.data;
                            than.tuijian = res.data.data.tuijian;
                            than.qiye = res.data.data.qiye;
                            console.log(than.user)
                            console.log(than.tuijian)
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                qiyexiangqing:function(){
                    var than = this;
                    window.location.href = "qiyexiangqing.html?id="+ than.user.qiye.id;
                },
                fanhuiF:function(){
                    window.history.go(-1);
                },
                zhiweiF:function(id,type){
                    console.log(id);
                    window.location.href = "zhiweixiangqing.html?id="+ id + "&type=" + type;
                }
            }
    })


  }

