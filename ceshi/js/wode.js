
window.onload = function() {
	  new Vue({
            el: '#wode',
            data: {
              users:""
            },
            mounted: function () {
                this.huoqushuju()
            },
            methods: {
                huoqushuju: function () {
                    fjdf();
                	var than = this;
                    this.$http.post('../../index.php/api/wode/personal_list', {
                            mid:'3299'
                    },{
                        headers:{
                            'Cookies':ashjd
                        }
                    })
                        .then(function (res) {
                            panduandenglu(res)
                            console.log(res.data)
                            than.users = res.data.data 
                            console.log(than.users)
                        }, function () {
                            console.log('请求失败处理');
                        });
                },
                index:function(){
                	window.location.href = "index.html";
                },
                zhaogongzuo:function(){
                	window.location.href = "zhaogongzuo.html"
                },
                zhaorencai:function(){
                	window.location.href = "zhaorencai.html"
                },
                wode:function(){
                	window.location.href = "wode.html"
                },
                wodejianli:function(){
                    window.location.href = "wodejianli.html"
                },
                wodetoudi:function(){
                    localStorage.setItem("xianshi",'quanbu');
                    window.location.href = "html/wodetoudi/wodetoudi.html"
                },
                beichakan:function(){
                    localStorage.setItem("xianshi",'beichakan');
                    window.location.href = "html/wodetoudi/wodetoudi.html";
                },
                yaomianshi:function(){
                    localStorage.setItem("xianshi",'yaomianshi');
                    window.location.href = "html/wodetoudi/wodetoudi.html";
                },
                buheshi:function(){
                    localStorage.setItem("xianshi",'buheshi');
                    window.location.href = "html/wodetoudi/wodetoudi.html";
                }
            }
        })


  }



