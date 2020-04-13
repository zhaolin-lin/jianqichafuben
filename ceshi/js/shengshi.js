
    var map = new AMap.Map('mapContainer', {
       resizeEnable: true
    })
    
    map.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,     
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
         })
        // 获取当前位置信息
        geolocation.getCurrentPosition();
        // 监听获取位置信息成功的回调函数
        AMap.event.addListener(geolocation, 'complete', onComplete);
        // 监听获取位置信息错误的回调函数
        AMap.event.addListener(geolocation, 'error', onError);
    
        function onComplete (data) {

            // data是具体的定位信息
            addComp = data.addressComponent;
            // console.log(addComp.city)
            // var shi = addComp.city;
            document.getElementById('sajjhgdh').innerHTML = '成功';
            localStorage.setItem("shi",addComp.city);
            localStorage.setItem("sheng",addComp.province)
        }
        
        function onError (error) {
            // 定位出错
            document.getElementById('sajjhgdh').innerHTML = '失败';
            localStorage.setItem("shi", '0');
            localStorage.setItem("sheng", '0')
            console.log(error.message)
            
        }
    })
    
