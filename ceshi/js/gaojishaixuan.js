window.onload = function() {
    // var vConsole = new VConsole();
	new Vue({
            el: '#gaojishaixuan',
            data: {
                lists:"",
                shuju:{
                    fabu: "0",
                    gongsi: "0",
                    guimo: "0",
                    jingyan: "0",
                    rongzi: "0",
                    xingzhi: "0",
                    xueli: "0"
                },
                beifen:"",
            },
            mounted: function () {
                this.huoqushuju()
            },
            methods: {
                huoqushuju: function () {
                    fjdf();
                    var id = localStorage.getItem("shiid");
                    var than = this;
                    this.$http.post('../../index.php/api/shouye/typeselect', {
                            cid:id,
                            status:'1'
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            console.log(res.data.data)
                            than.lists = res.data.data;
                           
                        }, function () {
                            console.log('请求失败处理');
                        });

                },
                xzxz:function(e,wenzi,index){
                    var than = this;
                    var lists = than.lists;
                    if(lists[wenzi][index].a == '1'){
                        lists[wenzi][index].a = '0';
                    }else{
                        for (var i = 0; i < lists[wenzi].length; i++) {
                            lists[wenzi][i].a = '0'   
                        } 
                        lists[wenzi][index].a = '1';
                    }
                    console.log(lists[wenzi][index])
                    var shuju = than.shuju;
                    shuju[wenzi] = e;
                    than.lists = lists;
                    than.shuju = shuju;
                    console.log(than.shuju)
                },
                chongzhi:function(){
                    var than = this;
                    than.huoqushuju()
                     var shuju = than.shuju;
                     shuju = {}
                     than.shuju = shuju;
                     var shuju = than.shuju;
                     console.log(shuju)
                },
                querenF:function(){
                    var than = this;
                    var shujus = than.shuju;
                    shujus['fanhui'] = '111';
                    _shuzhu(shujus); 
                    window.history.go(-1);
                }
            }
        })


}