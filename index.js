
$(document).ready(function(){
    var form = $("#form");
    
    var sonCheg = 1000000000000;

    var sonStr = "";

    var birlr = {
        0: "no'l",
        1: "bir",
        2: "ikki",
        3: "uch",
        4: "to'rt",
        5: "besh",
        6: "olti",
        7: "yetti",
        8: "sakkiz",
        9: "to'qqiz"
    }

    var onlar = {
        1: "o'n",
        2: "yigirma",
        3: "o'ttiz",
        4: "qiriq",
        5: "ellik",
        6: "oltmish",
        7: "yetmish",
        8: "sakson",
        9: "to'qson"
    }

    var kattaSn = {
        1: "yuz",
        2: "ming ",
        3: "million ",
        4: "milliard ",
        5: "trilyard"
    }

    form.submit(function(e){
        e.preventDefault();

        sonStr = "";        
        
        var son = $("#numInput").val();

        var oxirgiSonHrf = convertNum(son);

        $("#changedNum").html("Converted Number: " + oxirgiSonHrf);
    });

    function convertNum(son){
        var absSon = Math.abs(son);

        try {
            if(son > sonCheg){
                throw "Bu son juda katta.Siz kiritishingiz mumkin bo'lgan son chegarasi " + sonCheg + " (1 Trillion)";
            } 
        }
        catch(err){
            alert(err);
            return "XATOLIK";
        }

        if(son.toString().includes("-") && absSon != 0){
            sonStr += "minus "
        }
        
        
        if(absSon in birlr){
            sonStr += birlr[absSon];
        }else if(absSon < 100){
            sonStr += ikXonRaq(absSon);
        }else{
            var sonArr = splitNum(absSon);
            let hsb = sonArr.length;

            for(i = 0; i < sonArr.length; i++){
                console.log("i = " + i + "  length=" + sonArr[i].length + "  son[i]=" + sonArr[i])
                if(sonArr[i][0] !== "000"){
                    if(sonArr[i][0].length == 3){
                        sonStr += uchXonRaq(parseInt(sonArr[i]));
                        sonStr += " " + kattaSn[hsb];
                    }else{
                        sonStr += ikXonRaq(parseInt(sonArr[i]));
                        sonStr += " " + kattaSn[hsb] + " ";
                    }
                    hsb--;
                }else{
                    hsb--;
                }
                
            }
        }
        
        return sonStr;
    }
    
    
    function uchXonRaq(son){
        var numText = "";

        if(son == 0){
            return "";
        }

        
        if(son < 100){
            numText += ikXonRaq(son);
            return numText;
        }

        numText += birlr[son.toString().charAt(0)];
        numText += " yuz ";

        if(son.toString().substr(1) !== "00"){
            numText += ikXonRaq(parseInt(son.toString().substr(1)));
        }
        
        return numText;
    }

    
     function ikXonRaq(num){
        var numText = "";

        if(num < 10){
            return birlr[num];
        }

        if(num in onlar){
            numText += onlar[num];
        }else{
            numText += onlar[num.toString().charAt(0)];

            if(num.toString().charAt(1) !== "0"){
                numText += "-" + birlr[num.toString().charAt(1)];
            }
        }

        return numText;
    }

    function splitNum(num){
        let numArr = [];
        var numString = num.toString();
        var hsb = 0;

        var tempArr = [];

        var yagRaq = numString.split("")
        console.log(yagRaq);

        var raqamlr = yagRaq.length;
        for(var i = raqamlr - 1; i >= 0; i--){
            tempArr[0] = yagRaq[i] + tempArr[0];
            hsb++;

            tempArr[0] = tempArr[0].replace("Topilmadi", "");

            if(hsb % 3 == 0){
                numArr.unshift(tempArr);
                tempArr = [];
            }
        }

        if(tempArr.length != 0){
            numArr.unshift(tempArr);
        }

        console.log(numArr)
        return numArr;
    }
});