var bonkNum = document.getElementById("bonkCounter");
var bpc = 1;
var bps = 0;
var number = 0;
var counter = 1;
var autoAnim = true;
var allCost = [50, 100, 250]
var allBPS = [0, 0];

window.onload = function(){
	document.getElementById("autoBonkAnim").checked = true;
	if(document.cookie.length != 0){
		number = JSON.parse(getCookie("number"));
		bpc = JSON.parse(getCookie("bpc"));
		allCost = JSON.parse(getCookie("allCost"));
		allBPS = JSON.parse(getCookie("allBPS"));
	}
	updateAll();
}

document.getElementById("saveGame").onmousedown = function(){
	createCookie("number", number);
	createCookie("bpc", bpc);
	createCookie("allCost", JSON.stringify(allCost));
	createCookie("allBPS", JSON.stringify(allBPS));
}

document.getElementById("resetGame").onmousedown = function(){
	let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
	number = 0;
	bpc = 1;
	bps = 0;
	allCost = [50, 100, 250]
	allBPS = [0, 0];
	updateAll();
}

function autoBonker(){
	if(bps>0){
		if(bps <= 100)
			number+=1;
		else
			number+=bps/100;
		bonkNum.innerHTML = Math.round(number);
		if(document.getElementById("autoBonkAnim").checked == true){
			if(counter == 1){
				document.getElementById("bonk").src = "bonk_2.jpg";
				counter = 2;
			}
			else{
				document.getElementById("bonk").src = "bonk.jpg";
				counter = 1;
			}
		}
	}
	if(bps <= 100)
		setTimeout(autoBonker, 1000/bps);
	else
		setTimeout(autoBonker, 10);
}

setTimeout(autoBonker, 1000);

function updateAll(){
	bonkNum.innerHTML = Math.round(number);
	bps = 0;
	for(let id in allBPS)
		bps+=allBPS[id];
	document.getElementById("batCost").innerHTML = allCost[0];
	document.getElementById("bonkPC").innerHTML = bpc;
	document.getElementById("autoBonkCost").innerHTML = allCost[1];
	document.getElementById("bonkPS").innerHTML = allBPS[0];
	document.getElementById("muchBonkCost").innerHTML = allCost[2];
	document.getElementById("muchBPS").innerHTML = allBPS[1];
}

document.getElementById("doBonk").onmousedown = function(){
	document.getElementById("bonk").src = "bonk_2.jpg";
	number+=bpc;
	bonkNum.innerHTML = Math.round(number);
}

document.getElementById("doBonk").onmouseup = function(){
	document.getElementById("bonk").src = "bonk.jpg";
}

document.getElementById("batUpgrade").onmousedown = function(){
	if(number >= allCost[0]){
		bpc+=1;
		number-=allCost[0];
		allCost[0] = Math.round(allCost[0]+50);
		updateAll();
	}
}

document.getElementById("autoBonk").onmousedown = function(){
	if(number >= allCost[1]){
		allBPS[0]+=1;
		number-=allCost[1];
		allCost[1] = Math.round(allCost[1]+100);
		updateAll();
	}
}

document.getElementById("muchBonk").onmousedown = function(){
	if(number >= allCost[2]){
		allBPS[1]+=2;
		number-=allCost[2];
		allCost[2] = Math.round(allCost[2]+250);
		updateAll();
	}
}



function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + ";";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}