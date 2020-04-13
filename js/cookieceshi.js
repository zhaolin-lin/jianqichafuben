
function cookie1(){
  document.getElementById('textarea').innerHTML = "123";
        var x = document.cookie;
         cookie_DedeUserID = $.cookie('DedeUserID');
       if (cookie_DedeUserID == undefined) {
             document.getElementById('textarea').innerHTML = x;
       }else{
            document.getElementById('textarea').innerHTML = x ;
              cookie_PHPSESSID = $.cookie('PHPSESSID');
              cookie_DedeLoginTime__ckMd5 = $.cookie('DedeLoginTime__ckMd5');
              cookie_DedeUserID__ckMd5 = $.cookie('DedeUserID__ckMd5');
              cookie_DedeUserID = $.cookie('DedeUserID');
              cookie_DedeLoginTime = $.cookie('DedeLoginTime');
            // var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            //  if (keys) {
            //     for (var i = keys.length; i--;) {
            //         document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
            //         document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
            //         document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();
            //     }
            // }
           // $.cookie('PHPSESSID',cookie_PHPSESSID,{path:'/'})
           // $.cookie('DedeLoginTime__ckMd5',cookie_DedeLoginTime__ckMd5,{path:'/'})
           // $.cookie('DedeUserID__ckMd5',cookie_DedeUserID__ckMd5,{path:'/'})
           // $.cookie('DedeUserID',cookie_DedeUserID,{path:'/'})
           // $.cookie('DedeLoginTime',cookie_DedeLoginTime,{path:'/'})
           // alert(document.cookie);
          // alert(cookie_PHPSESSID);
          // alert(cookie_DedeLoginTime__ckMd5);
          // alert(cookie_DedeUserID__ckMd5);
          // alert(cookie_DedeUserID);
          // alert(cookie_DedeLoginTime);
       }
}