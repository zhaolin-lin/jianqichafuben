window.onload = function () {
	var url = decodeURI(location.search); //获取url中"?"符后的字串
    console.log(url)
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    var types = theRequest.type;

    console.log(types)

	new Vue({
			el: '#rencaixiangqing',
			data: {
				type:types,
				user:''
			},
			mounted: function () {
				var than = this;
				this.huoqushuju();
			},
			methods: {
				huoqushuju: function () {
					fjdf();
	                var than = this;
	                this.$http.post('../../../../index.php/api/wode/personal_center', {
	                       
	                },{
	                	headers:{
	                		'Cookies':ashjd
	                	}
	                })
	                    .then(function (res) {
	                        console.log(res.data.data);
	                        than.user = res.data.data;
	                    }, function () {
	                        console.log('请求失败处理');
	                    });

	            },
				qingbiaozhu: function () {
					// fjdf();
	    //             var than = this;
	    //             this.$http.post('../../../../index.php/api/qiye/change', {
	    //                    company_id:   //企业id
	    //                    id:     //简历id
	    //                    jtype:    //0全职兼职  1资格兼职
	    //                    type:    //标注的状态
	    //             },{
	    //             	headers:{
	    //             		'Cookies':ashjd
	    //             	}
	    //             })
	    //                 .then(function (res) {
	    //                     console.log(res.data.data);
	    //                 }, function () {
	    //                     console.log('请求失败处理');
	    //                 });

	            },
			}
		})



}