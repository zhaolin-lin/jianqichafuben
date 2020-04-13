document.write("<script language=javascript src='http://192.168.2.100:99/public/h5/js/hsjidh.js'></script >");
var priKs = "-----BEGIN PRIVATE KEY-----" + htyt().substr(3, htyt().length - 7) + ioee().substr(3, ioee().length - 7) + ioer().substr(3, ioer().length - 7) + sewr().substr(2, sewr().length - 5) + erkc().substr(3, erkc().length - 8) + '-----END PRIVATE KEY-----';
var pub = "-----BEGIN PUBLIC KEY-----" + ekuy().substr(2, ekuy().length - 7) + erii().substr(2, erii().length - 5) + asjd().substr(2, asjd().length - 4) + weowq().substr(2, weowq().length - 3) + '-----END PUBLIC KEY-----'

var oFuncs = function () {
    return {
        fAdd: function (url, data) {
            var decrypt = new JSEncrypt();
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if ('PHPSESSID' == arr[0]) {
                    decrypt.setPrivateKey(priKs);
                    var timestamp = Date.parse(new Date()) / 1000;
                    var a = 'yi' + timestamp + arr[1] + 'cai';
                    decrypt.setPublicKey(pub);
                    uncrypteds = decrypt.encrypt(a);
                    return uncrypteds + ',' + timestamp;
                }
            }

            
        }
    }
}

// var _0x7510 = ["\x3C\x73\x63\x72\x69\x70\x74\x20\x6C\x61\x6E\x67\x75\x61\x67\x65\x3D\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x20\x73\x72\x63\x3D\x27\x68\x74\x74\x70\x3A\x2F\x2F\x31\x39\x32\x2E\x31\x36\x38\x2E\x32\x2E\x31\x30\x30\x3A\x39\x39\x2F\x70\x75\x62\x6C\x69\x63\x2F\x68\x35\x2F\x6A\x73\x2F\x68\x73\x6A\x69\x64\x68\x2E\x6A\x73\x27\x3E\x3C\x2F\x73\x63\x72\x69\x70\x74\x20\x3E", "\x77\x72\x69\x74\x65", "\x2D\x2D\x2D\x2D\x2D\x42\x45\x47\x49\x4E\x20\x50\x52\x49\x56\x41\x54\x45\x20\x4B\x45\x59\x2D\x2D\x2D\x2D\x2D", "\x6C\x65\x6E\x67\x74\x68", "\x73\x75\x62\x73\x74\x72", "\x2D\x2D\x2D\x2D\x2D\x45\x4E\x44\x20\x50\x52\x49\x56\x41\x54\x45\x20\x4B\x45\x59\x2D\x2D\x2D\x2D\x2D", "\x2D\x2D\x2D\x2D\x2D\x42\x45\x47\x49\x4E\x20\x50\x55\x42\x4C\x49\x43\x20\x4B\x45\x59\x2D\x2D\x2D\x2D\x2D", "\x2D\x2D\x2D\x2D\x2D\x45\x4E\x44\x20\x50\x55\x42\x4C\x49\x43\x20\x4B\x45\x59\x2D\x2D\x2D\x2D\x2D", "\x63\x6F\x6F\x6B\x69\x65", "\x3D", "\x73\x70\x6C\x69\x74", "\x73\x65\x74\x50\x72\x69\x76\x61\x74\x65\x4B\x65\x79", "\x70\x61\x72\x73\x65", "\x79\x69", "\x63\x61\x69", "\x73\x65\x74\x50\x75\x62\x6C\x69\x63\x4B\x65\x79", "\x65\x6E\x63\x72\x79\x70\x74", "\x2C"]; document[_0x7510[1]](_0x7510[0]); var priKs = _0x7510[2] + htyt()[_0x7510[4]](3, htyt()[_0x7510[3]] - 7) + ioee()[_0x7510[4]](3, ioee()[_0x7510[3]] - 7) + ioer()[_0x7510[4]](3, ioer()[_0x7510[3]] - 7) + sewr()[_0x7510[4]](2, sewr()[_0x7510[3]] - 5) + erkc()[_0x7510[4]](3, erkc()[_0x7510[3]] - 8) + _0x7510[5]; var pub = _0x7510[6] + ekuy()[_0x7510[4]](2, ekuy()[_0x7510[3]] - 7) + erii()[_0x7510[4]](2, erii()[_0x7510[3]] - 5) + asjd()[_0x7510[4]](2, asjd()[_0x7510[3]] - 4) + weowq()[_0x7510[4]](2, weowq()[_0x7510[3]] - 3) + _0x7510[7]; var oFuncs = function () { return { fAdd: function (_0xc449x4, _0xc449x5) { var _0xc449x6 = new JSEncrypt(); var _0xc449x7 = this; var _0xc449x8 = document[_0x7510[8]]; strs = _0xc449x8[_0x7510[10]](_0x7510[9]); _0xc449x6[_0x7510[11]](priKs); var _0xc449x9 = Date[_0x7510[12]](new Date()) / 1000; var _0xc449xa = _0x7510[13] + _0xc449x9 + strs[1] + _0x7510[14]; _0xc449x6[_0x7510[15]](pub); uncrypteds = _0xc449x6[_0x7510[16]](_0xc449xa); return uncrypteds + _0x7510[17] + _0xc449x9 } } }