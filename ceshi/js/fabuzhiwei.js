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
    var ids = theRequest.id;
    var types = theRequest.type;
    var fenleis = theRequest.fenlei;
    var huifus = theRequest.huifu;
    console.log(fenleis)
new Vue({
			el: '#fabuzhiwei',
			data: {
			// 全职兼职的数据
			  xingzhi:'',
			  user:'',
			  type:'1',
			  userZhi:'',
			  tils:'',
			  zhiweimingcheng:'',
			  name:'',
			  leibei:'',
			  nameid:'',
			  namename:'请选择',
			  leibeiid:'',
			  leibeiname:'请选择',
			  salaryid:'',
			  salaryname:'请选择',
			  educationid:'',
			  educationname:'请选择',
			  experienceid:'',
			  experiencename:'请选择',
			  gongzuoid:'',
			  gongzuoname:'请选择',
			  dishiid:'',
			  dishiname:'请选择',
			  aaa:1,
			  zigeZhi:'',
			  xiangxidizhi:'',  //详细地址
			  // 招聘人数
			  zhaopinrenshu:'',
			  // 职位说明
			  quanzhiShuoming:'',
			  // 联系人姓名
			  nameinp:'',
			  // 联系人电话
			  tel:'',
			  sheng:'',
			  shengName:'',
			  shi:'',
			  shiName:'',
			  qu:'',

			  // 资格兼职的数据
			  bbb:1,
			  zigetil:'',
			  zhengshuleixing:'',
			  zszy:'',
			  zslxName1:'请选择',
			  zslxId1:'',
			  zszysName1:'请选择',
			  zszysId1:'',
			  salary1name:'请选择',
			  salary1id:'',
			  dishi1name:'请选择',
			  dishi1id:'',
			  zhuceq1name:'请选择',
			  zhuceq1id:'',
			  zhicheng1name:'请选择',
			  zhicheng1id:'',
			  yongtu1name:'请选择',
			  yongtu1id:'',
			  xuyao1name:'请选择',
			  xuyao1id:'',
			  education1name:'请选择',
			  education1id:'',
			  // 资格兼职 职位说明
			  zigezSuoming:'',


			  // 类型  全职兼职和资格兼职的类型
			  leixing:'1',


			  guanliid:ids,
			  guanlitype:types,
			  xianshi:'',
			  diqudiqu:'',
			  fenlei:fenleis     //判断是修改职位还是发布职位 2为修改，1为上传

			},
			mounted: function () {
				var than = this;
				if(than.guanlitype == '1'){
					a = 'quanzhi';
				}else{
					a = 'zigejianzhi';
				}
				
				if(than.guanliid == undefined) {
					than.xianshi = 'fabu';
					this.xingzhiF('quanzhi');
				}else{
					than.xianshi = 'bianji';
					this.xingzhiF(a);
					this.bianjishuju();
				}
			},
			methods: {
				huoqushuju: function () {
					fjdf();
	                var than = this;
	                this.$http.post('../../../../index.php/api/qiye/fabu', {
	                        type:than.type
	                },{
	                	headers:{
	                		'Cookies':ashjd
	                	}
	                })
	                    .then(function (res) {
	                        console.log(res.data.data);
	                        than.user = res.data.data;
	                        than.lianxi = than.user['lianxi'];
	                        than.nameinp = than.lianxi.operator;
	                        than.tel = than.lianxi.oper_tell;
	                        $('.nameinp').val(than.nameinp)
	                        $('.telinp').val(than.tel);
	                        console.log(than.name)
	                    }, function () {
	                        console.log('请求失败处理');
	                    });

	            },
	            fabushuju: function () {
	            	fjdf();
	                var than = this;

	                // 当leixing为1的时候是全职兼职的情况
	                // 当leixing2的时候是资格兼职的情况
	                if(than.leixing == '1'){
		                	var fabushujuArr = {
		                		leixing:'1',   //全职兼职
		                        post_name:than.nameid,  //职位类别id
		                        typeid:than.leibeiid,  //职位名称id
		                        area:than.dishiid,
		                        money:than.salaryid,
		                        education:than.educationid,
		                        experience:than.experienceid,
		                        type:than.gongzuoid,
		                        duty:than.quanzhiShuoming,
		                        renshu:than.zhaopinrenshu,
		                        operator:than.nameinp,
		                        oper_tell:than.tel,
		                        address:than.xiangxidizhi,
		                        fenlei:than.fenlei,
		                        id:than.guanliid
		                }
	                }else{
		                	var fabushujuArr = {
		                		leixing:'2',   //资格兼职
		                        area:than.dishi1id,
		                        education:than.education1id,
		                        register:than.zhuceq1id,
		                        title:than.zhicheng1id,
		                        use:than.yongtu1id,
		                        money:than.salary1id,
		                        yj:than.xuyao1id,
		                        text:than.quanzhiShuoming,
		                        type:than.zslxId1,
		                        types:than.zszysId1,
		                        operator:than.nameinp,
		                        oper_tell:than.tel,
		                        address:than.xiangxidizhi,
		                        fenlei:than.fenlei,
		                        id:than.guanliid
		                	}
	                }        
	                this.$http.post('../../../../index.php/api/qiye/uploadzhiwei',fabushujuArr,{
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
	            bianjishuju: function () {
					fjdf();
	                var than = this;
	                this.$http.post('../../../../index.php/api/qiye/tiqu', {
	                        // id:'7',
	                        id:than.guanliid,
	                        type:than.guanlitype
	                        // type:2
	                },{
	                	headers:{
	                		'Cookies':ashjd
	                	}
	                })
	                    .then(function (res) {
	                        console.log(res.data.data);
	                        var a = res.data.data.area;
	                        var b = "";
	                        for(var i =0 ; i < a.length ; i++){
	                        	b += a[i].name + '-';
	                        	than.dishi1id = a[i].id
	                        	than.dishiid = a[i].id
	                        }
	                        var c = b.substring(0 , b.length-1);
	                        than.dishi1name = c;
	                        than.dishiname = c;
	                        if(than.guanlitype == '1'){
	                        	// 编辑职位的时候全职兼职的数据
	                        	than.nameid = res.data.data.post_name.id;//职位名称
		                        than.namename = res.data.data.post_name.name;
		                        than.leibeiid = res.data.data.typeid.id;//职位类别
		                        than.leibeiname = res.data.data.typeid.name;
		                        than.salaryid = res.data.data.money.id;//薪资
		                        than.salaryname = res.data.data.money.name;
		                        than.educationid = res.data.data.education.id;//学历要求
		                        than.educationname = res.data.data.education.name;
		                        than.experienceid = res.data.data.experience.id;//经验
		                        than.experiencename = res.data.data.experience.name;
		                        than.gongzuoname = res.data.data.type.name;//性质
		                        than.gongzuoid = res.data.data.type.id;
		                        than.zhaopinrenshu = res.data.data.renshu;//招聘人数
		                        than.quanzhiShuoming = res.data.data.duty;//详细说明
		                        than.nameinp = res.data.data.telname;//联系人
		                        than.tel = res.data.data.tel;//联系电话
		                        than.xiangxidizhi = res.data.data.address;//详细地址
		                        than.dishiid = than.dishiid;//工作地区
		                        than.dishiname = than.dishiname;
	                        }else{
	                        	// 编辑职位的时候资格兼职的数据
		                        than.zslxId1 = res.data.data.type.id;//证书类型
		                        than.zslxName1 = res.data.data.type.name;
		                        than.zszysId1 = res.data.data.types.id;//证书专业
		                        than.zszysName1 = res.data.data.types.name;
		                        than.salary1id = res.data.data.money.id;//薪资
		                        than.salary1name = res.data.data.money.name;
		                        than.dishi1name = than.dishi1name;//工作地区
		                        than.dishi1id = than.dishi1id;
		                        than.education1name = res.data.data.education.name;//学历要求
		                        than.education1id = res.data.data.education.id;
		                        than.zhuceq1id = res.data.data.register.id; //注册情况
		                        than.zhuceq1name = res.data.data.register.name;
		                        than.zhicheng1id = res.data.data.title.id; //职称
		                        than.zhicheng1name = res.data.data.title.name;
		                        than.yongtu1id = res.data.data.use.id; //证书用途
		                        than.yongtu1name = res.data.data.use.name;
		                        than.xuyao1id = res.data.data.yj.id; //业绩要求
		                        than.xuyao1name = res.data.data.yj.name;


		                        than.quanzhiShuoming = res.data.data.text;//详细说明
		                        than.nameinp = res.data.data.telname; //联系人
		                        than.tel = res.data.data.tel; //联系电话
		                        than.xiangxidizhi = res.data.data.address; //详细地址
	                        }
	                        
	                    }, function () {
	                        console.log('请求失败处理');
	                    });

	            },	
	            // 点击切换全职兼职和资格兼职的方法
				xingzhiF:function(a){
					var than = this;
					than.xingzhi = a;
					if(a == 'quanzhi'){
						type = '1';
						than.leixing = '1';
					}else if(a == 'zigejianzhi'){
						type = '2';
						than.leixing = '2';
					}
					than.type = type;
					this.huoqushuju();
					than.dishiname = '请选择';
					than.dishi1name = '请选择';
					than.dishiid = '';
					than.dishi1id = '';
					than.shi = '';
					than.qu = '';
					than.xiangxidizhi = '';
					than.quanzhiShuoming = '';
				},
				// 兼职全职的请选择按钮
	            dianji:function(til){
	            	var than = this;
	            	than.tils = til;
	            	than.userZhi = than.user[til];
	            	than.aaa = 3;
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
	            },
	            // 兼职全职的职位名称的点击事件  一级
	            dianji1:function(){
	            	var than = this;
	            	than.name = than.user['type'];
	            	than.aaa = 1;
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
	            },
	            // 兼职全职的职位类别的点击事件  二级
	            dianji2:function(){
	            	var than = this;
	            	than.name = than.user['type'];
	            	than.aaa = 2;
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
	            },
	            // 全职兼职 一级的弹出选择条件的点击事件
				tiaojiaoXZ1(name,index,id){
					var than = this;
					than.namename = name;
					than.leibei = than.name[index].zi;
					than.nameid = id;
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
				},
				// 全职兼职 二级的弹出选择条件的点击事件
				tiaojiaoXZ2(name,id){
					var than = this;
					than.leibeiname = name;
					than.leibeiid = id;
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
				},
				// 兼职全职的请选择换为选择的条件方法
				tiaojiaoXZ:function(name,id){
					var than = this;
					if(than.tils == 'salary'){
						than.salaryid = id;
						than.salaryname = name;
					}else if(than.tils == 'education'){
						than.educationid = id;
						than.educationname = name;
					}else if(than.tils == 'experience'){
						than.experienceid = id;
						than.experiencename = name;
					}else if(than.tils == 'gongzuo'){
						than.gongzuoid = id;
						than.gongzuoname = name;
					}else if(than.tils == 'dishi'){
						than.dishiid = id;
						than.dishiname = name;
					}
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
				},

				

	            // 资格兼职的职位名称的点击事件  一级	
	            dianji11:function(){
	            	var than = this;
	            	than.zhengshuleixing = than.user['certi'];
	            	than.bbb = 1;
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
	            },
	             // 资格兼职的职位类别的点击事件  二级
	            dianji22:function(){
	            	var than = this;
	            	than.zhengshuleixing = than.user['certi'];
	            	than.bbb = 2;
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
	            },
	            // 资格兼职的请选择按钮
	            dianji0:function(z){
	            	var than = this;
	            	than.zigetil = z;
	            	than.zigeZhi = than.user[z];
	            	than.bbb = 3;
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
	            },
	             // 资格兼职 一级的弹出选择条件的点击事件
	            zslxF:function(zslxName,zslxIndex,zslxId){
	            	var than = this;
					than.zslxName1 = zslxName;
					than.zslxId1 = zslxId;
					than.zszy = than.zhengshuleixing[zslxIndex].zi;
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
	            },
	             // 资格兼职 二级的弹出选择条件的点击事件
	            zslxF1:function(zszysName,zszysId){
	            	var than = this;
	            	than.zszysName1 = zszysName;
	            	than.zszysId1 = zszysId;
	            	$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
	            },
				// 资格兼职的请选择换为选择的条件方法
				zigeF:function(zigeZhisName,zigeZhisId){
					var than = this;
					if(than.zigetil == 'salary'){
						than.salary1id = zigeZhisId;
						than.salary1name = zigeZhisName;
					}else if(than.zigetil == 'dishi'){
						than.dishi1id = zigeZhisId;
						than.dishi1name = zigeZhisName;
					}else if(than.zigetil == 'zhuceq'){
						than.zhuceq1id = zigeZhisId;
						than.zhuceq1name = zigeZhisName;
					}else if(than.zigetil == 'zhicheng'){
						than.zhicheng1id = zigeZhisId;
						than.zhicheng1name = zigeZhisName;
					}else if(than.zigetil == 'yongtu'){
						than.yongtu1id = zigeZhisId;
						than.yongtu1name = zigeZhisName;
					}else if(than.zigetil == 'xuyao'){
						than.xuyao1id = zigeZhisId;
						than.xuyao1name = zigeZhisName;
					}else if(than.zigetil == 'education'){
						than.education1id = zigeZhisId;
						than.education1name = zigeZhisName;
					}
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
				},
				tan1:function(){
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
				},
				tishiF:function(){
					$('.tishi').css({'display':'none'})
				},
				lianxi:function(){
					var than = this;
					// 默认联系方式
					 if(typeof($('.qita_xz').attr("checked")) == 'undefined'){
					 	$('.qita_xz').attr("checked","true");
					 	than.moren = '2';
					 	$('.fangshi').css({'display':'block'});
					 	console.log(than.moren)
					 }else{
					 // 添加的新的联系方式
					 	$('.qita_xz').removeAttr("checked");
					 	than.moren = '1';
					 	$('.fangshi').css({'display':'none'});
					 	console.log(than.moren)
					 }
				},
				// 全职兼职的点击选择地区 
				diquF1:function(){
					var than = this;
	            	than.sheng = than.user['dishi'];
	            	console.log(than.sheng);
	            	than.aaa = '4';
	            	than.bbb = '4';
	            	$('.sheng').css({'color':'#555'});
	            	$('.shi').css({'color':'#555'});
	            	$('.qu').css({'color':'#555'});
	            	$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
				},
				// 点击省 选择市
				xuanshi:function(name,id,index){
					var than = this;
					than.qu = '';
					than.shengName = name;
					than.shi = than.sheng[index].zi;
					$('.class' + index).css({'color':'#FF7800'}).siblings().css({'color':'#555'});	
					$('.diqu').css({'color':'#555'});
					var a = than.sheng[index].name.charAt(than.sheng[index].name.length - 1);
						if(a == '市'){
	                    var arr = {};
	                    var arr1 = {};
	                    arr['id'] = than.sheng[index].id;
	                    arr['name'] = than.sheng[index].name;
	                    arr['parent_id'] = than.sheng[index].parent_id;
	                    arr['zi'] = than.sheng[index].zi;
	                    arr1[id] = arr;
	                    than.sheng[id].zi = arr1;
	                    console.log(arr1)
	                }
	                than.shi = than.sheng[index].zi;
				},
				// 点击市
				shiF:function(name,id,index){
					var than = this;
					than.shiName = name;
					$('#id' + index).css({'color':'#FF7800'}).siblings().css({'color':'#555'});
					$('.tan1').css({'display':'block'});
                	$('.tan2').css({'display':'block'});
                    $('body').css({'overflow':'hidden'});
                    than.qu = than.shi[index].zi;
				},
				quF:function(name,id,index){
					var than = this;
					than.dishiname = than.shengName + '-' + than.shiName + '-' + name;
					than.dishi1name = than.shengName + '-' + than.shiName + '-' + name;
					than.dishiid = id;
					than.dishi1id = id;
					$('.tan1').css({'display':'none'});
                	$('.tan2').css({'display':'none'});
                    $('body').css({'overflow-y':'scroll'});
				},
				guanbishuju:function(){  //关闭中的职位点击恢复之后跳转到发布职位页面，点击发布职位之后恢复职位
					var than = this;
					fjdf();
	                this.$http.post('../../../../index.php/api/qiye/status',{
	                		status:'2',
	                        type:types,
	                        id:ids,
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
				// 点击发布职位按钮
				fabu:function(){
					var than = this;
					if(huifus == '1'){     // 点击发布职位之后恢复职位
						if(than.leixing == '1'){  //全职兼职
							console.log(typeof than.gongzuoid)
							if(than.nameid === '' || than.leibeiid === '' || than.salaryid === '' || than.educationid === '' || than.experienceid === '' || than.gongzuoid === '' || than.dishiid === '' || than.xiangxidizhi === '' || than.zhaopinrenshu === '' || than.quanzhiShuoming === '' || than.nameinp === '' || than.tel === ''){
								$('.tishi').css({'display':'flex'});
							}else{
								this.fabushuju();
								this.guanbishuju();
								window.history.go(-1);
							}
						}else if(than.leixing == '2'){  //资格兼职
							if(than.zslxId1 === '' || than.zszysId1 === '' || than.salary1id === '' || than.dishi1id === '' || than.education1id === '' || than.zhuceq1id === '' || than.zhicheng1id === '' || than.yongtu1id === '' || than.xuyao1id === '' || than.quanzhiShuoming === '' || than.nameinp === '' || than.tel === '' || than.xiangxidizhi === ''){
								$('.tishi').css({'display':'flex'});
							}else{
								this.fabushuju();
								this.guanbishuju();
								window.history.go(-1);
							}
						}
					}else{   //发布职位或者修改职位
						if(than.leixing == '1'){  //全职兼职
							console.log(typeof than.gongzuoid)
							if(than.nameid === '' || than.leibeiid === '' || than.salaryid === '' || than.educationid === '' || than.experienceid === '' || than.gongzuoid === '' || than.dishiid === '' || than.xiangxidizhi === '' || than.zhaopinrenshu === '' || than.quanzhiShuoming === '' || than.nameinp === '' || than.tel === ''){
								$('.tishi').css({'display':'flex'});
							}else{
								this.fabushuju();
								window.history.go(-1);
							}
						}else if(than.leixing == '2'){  //资格兼职
							if(than.zslxId1 === '' || than.zszysId1 === '' || than.salary1id === '' || than.dishi1id === '' || than.education1id === '' || than.zhuceq1id === '' || than.zhicheng1id === '' || than.yongtu1id === '' || than.xuyao1id === '' || than.quanzhiShuoming === '' || than.nameinp === '' || than.tel === '' || than.xiangxidizhi === ''){
								$('.tishi').css({'display':'flex'});
							}else{
								this.fabushuju();
								window.history.go(-1);
							}
						}
					}
					
				},
				fanhuiF:function(){
                    window.history.go(-1);
                }
			}
		})
}