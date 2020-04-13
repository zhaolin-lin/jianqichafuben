
window.onload = function () {
    var name, value;
    var str = location.href;
    var num = str.indexOf("?");
    str = str.substr(num + 1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
            search = value;
        }
    }
    new Vue({
        el: '#app',
        data: {
            xingbei: "请选择",
            sexid: "",
            ashjdg: "",
            phone: "请填写手机号",
            email: "请填写邮箱地址",
            users: "",
            experience: "",
            experiencename: "请选择",
            live_cityid: "",
            live_cityname: "请选择",
            age: "",
            diquname: "",
            diquyiji: "",
            diqunameids: "",
            home_cityname: "请选择",
            home_cityid: "",
            panduan: "",
            touxiang: "",
            touxan: "",
            panduantouxiang: "0",
        },
        mounted: function () {
            this.huoquxinxi();
            window.sdhsj = this.changeCount;
        },
        methods: {
            huoquxinxi: function () {
                fjdf();
                console.log(ashjd)
                var than = this;
                this.$http.post('../../../../index.php/api/wode/getPersonalPhone', {
                    id: search
                }, {
                    headers:{
                        'Cookies': ashjd
                    }
                })
                    .then(function (res) {
                        fjdf();
                        console.log(res)
                        than.experiencename = res.data.data.experience;
                        than.phone = res.data.data.telphone;
                        than.email = res.data.data.email;
                        than.xingbei = res.data.data.sex;
                        than.touxiang = res.data.data.face;
                        var touxsakl = res.data.data.face;
                        var touxsakls = 'http://192.168.2.100:99' + touxsakl;
                        this.$http.post(touxsakls, {
                        },{
                            headers:{
                                'Cookies':ashjd
                            }
                        })
                            .then(function (res) {
                                console.log(res)
                                than.panduantouxiang = '0';
                            }, function () {
                                than.panduantouxiang = '1';
                                console.log('请求失败处理');
                            });
                        than.age = res.data.data.age;
                        than.ashjdg = res.data.data.uname;
                        than.live_cityname = res.data.data.live_city
                        than.live_cityid = res.data.data.live_city_id;
                        than.home_cityid = res.data.data.home_city_id;
                        than.experience = res.data.data.experience_id;
                    }, function () {
                        console.log('请求失败处理');
                    });
            },
            sexs: function (e) {
                console.log(e)
                var than = this;
                $('#yingcangyi').css('display', 'none')
                $('#yingcanger').css('display', 'none')
                than.xingbei = e;
                if (e == '男') {
                    than.sexid = '1'
                } else {
                    than.sexid = '0'
                }
            },
            xingbeis: function () {
                $('#yingcangyi').css('display', 'block')
                $('#yingcanger').css('display', 'block')
            },
            huoquleibiao: function (e) {
                fjdf();
                var than = this;
                than.users = '';
                this.$http.post('../../../../index.php/api/wode/personal_xiala', {
                    xingzhi: "",
                    city_id: "",
                    hangye: "",
                    industry: "",
                },{
                    headers:{
                            'Cookies':ashjd
                        }
                })
                    .then(function (res) {
                        console.log(res.data.data)
                        var a = res.data.data;
                        var b = a[e];
                        console.log(b)
                        than.users = b;
                    }, function () {
                        console.log('请求失败处理');
                    });
            },
            gongzuojy: function (e) {
                var than = this;
                $('#yingcangyi').css('display', 'block')
                $('#yingcangsan').css('display', 'block')
                than.huoquleibiao(e);
            },
            xuanze: function (id, name) {
                var than = this;
                console.log(id + ',' + name)
                than.experience = id;
                than.experiencename = name;
                $('#yingcangyi').css('display', 'none')
                $('#yingcangsan').css('display', 'none')
            },
            quxiao: function () {
                $('#yingcangyi').css('display', 'none')
                $('#yingcanger').css('display', 'none')
                $('#yingcangsan').css('display', 'none')
            },
            live_city: function (e, shu) {
                var than = this;
                than.panduan = shu;
                if (shu == '1') {
                    than.diquname = "";
                    than.diqunameids = "";
                    $('#yingcangyi').css('display', 'block')
                    $('#yingcangsi').css('display', 'block')
                    than.huoquleibiao(e);
                } else {
                    than.diquname = "";
                    $('#yingcangyi').css('display', 'block')
                    $('#yingcangwu').css('display', 'block')
                    than.huoquleibiao(e);
                }

            },
            diquxuanze: function (id, name) {
                fjdf();
                var than = this;
                this.$http.post('../../../../index.php/api/wode/personal_xiala', {
                    xingzhi: "",
                    city_id: id,
                    hangye: "",
                    industry: "",
                },{
                    headers:{
                            'Cookies':ashjd
                        }
                })
                    .then(function (res) {
                        than.diqunameids = "";
                        than.chengshiname = name
                        if (name[name.length - 1] == '市') {
                            var a = {}
                            var b = []
                            a['id'] = id;
                            a['name'] = name;
                            console.log(a)
                            b.push(a)
                            than.diquname = b
                        } else {
                            than.diquname = res.data.data.diqu
                        }

                    }, function () {
                        console.log('请求失败处理');
                    });
            },
            queding: function (id, name) {
                console.log(id + '-' + name)
                fjdf();
                var than = this;
                this.$http.post('../../../../index.php/api/wode/personal_xiala', {
                    xingzhi: "",
                    city_id: id,
                    hangye: "",
                    industry: "",
                },{
                    headers:{
                            'Cookies':ashjd
                        }
                })
                    .then(function (res) {
                        console.log(res.data.data.diqu)
                        var a = res.data.data.diqu;
                        if (a.length == '0') {
                            than.live_cityname = name;
                            than.live_cityid = id;
                            $('#yingcangyi').css('display', 'none')
                            $('#yingcangsi').css('display', 'none')
                            $('#yingcangwu').css('display', 'none')
                        }
                        var panduan = than.panduan;
                        if (panduan == '2') {
                            var names = than.chengshiname + '-' + name
                            than.home_cityid = id
                            than.home_cityname = names
                            $('#yingcangyi').css('display', 'none')
                            $('#yingcangwu').css('display', 'none')
                        }
                        than.diqunameids = res.data.data.diqu
                        than.diquyiji = name
                    }, function () {
                        console.log('请求失败处理');
                    });
            },
            quedings: function (id, name) {
                var than = this;
                var diquyiji = than.diquyiji;
                console.log(id)
                var a = diquyiji + '-' + name
                than.live_cityname = a
                than.live_cityid = id;
                $('#yingcangyi').css('display', 'none')
                $('#yingcangsi').css('display', 'none')
                $('#yingcangwu').css('display', 'none')
            },
            guanbi: function () {
                $('#yingcangyi').css('display', 'none')
                $('#yingcanger').css('display', 'none')
                $('#yingcangsan').css('display', 'none')
                $('#yingcangsi').css('display', 'none')
                $('#yingcangwu').css('display', 'none')
            },
            changeCount: function (id) {
                var than = this;
                var name = than.ashjdg;
                if (id == '1') {
                    _filter_method(name)
                } else {
                    than.ashjdg = '';
                }
            },
            xiugai: function () {
                fjdf();
                var than = this;
                console.log(than.live_cityid)
                var param = new FormData()
                var event = than.touxan;
                if (event != '') {
                    var file = event.target.files[0];
                    param.append('face', file)
                }
                param.append('mid', '3299')
                param.append('id', search)
                param.append('name', than.ashjdg)
                param.append('sex', than.sexid)
                param.append('age', than.age)
                param.append('experience', than.experience)
                param.append('live_city', than.live_cityid)
                param.append('home_city', than.home_cityid)
                param.append('xingzhi', '')
                $.ajax({
                    url: '../../../../index.php/api/wode/add_personal_information',
                    data: param,
                    type: "POST",
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    headers:{
                        'Cookies':ashjd
                    },
                    success: function (data) {
                        console.log(data)
                    },
                    error: function () {
                    }
                })
            },
            changeimage: function (event) {
                console.log(event)
                var than = this;
                than.touxan = event;
                var objurl = this.getObjectURL(event.target.files[0]);
                $('#myimg').attr('src', objurl)
            },
            getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url; 
            },
        }
    })
}
