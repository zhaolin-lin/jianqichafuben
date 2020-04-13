
window.onload = function() {
	  new Vue({
            el: '#zhaogongzuo',
            data: {
              type:'1',
              user:'',
              shi:''
            },
            mounted: function () {
                this.huoqushuju()
            },
            methods: {
                huoqushuju: function () {
                    fjdf();
                	var than = this;
                    this.$http.post('../../index.php/api/shouye/zhaogongzuo', {
                        	cid:'2001',
                        	type:than.type,
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            panduandenglu(res)
                            console.log(res.data.data);
                            console.log(than.type);
                            than.user = res.data.data;
                            var shi = localStorage.getItem("shi");
                            than.shi = shi;
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                tuijian:function(){
                    var than = this;
                    than.type = 1;
                    than.huoqushuju()
                },
                zuixin:function(){
                    var than = this;
                    than.type = 2;
                    than.huoqushuju()
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
                    window.location.href = "wode.html"
                },
                xuanzediqu:function(){
                    window.location.href = "xuanzediqu.html"
                },
                sousuoF:function(){
                    window.location.href = "index_sousuo.html"
                }
            }
        })
  }


