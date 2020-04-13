    function chaxunanniu(elemnt) {
        var i = elemnt.id;
        if(i == "dianji1"){
            document.getElementById('zizhianniu').style.display = "block"
            document.getElementById('panjueshuanniu').style.display = "block"
            document.getElementById('xiangmuanniu').style.display = "block"
            document.getElementById('renyuananniu').style.display = "block"
            // document.getElementById('zongheanniu').style.display = "block"
            document.getElementById('dianji1').id = "dianji2"
        }else{
            document.getElementById('zizhianniu').style.display = "none"
            document.getElementById('panjueshuanniu').style.display = "none"
            document.getElementById('xiangmuanniu').style.display = "none"
            document.getElementById('renyuananniu').style.display = "none"
            // document.getElementById('zongheanniu').style.display = "none"
            document.getElementById('dianji2').id = "dianji1"
        }
        
    }