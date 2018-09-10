////////////////////////////////////////////////////////////////////////////////////////Canvas
var cnvPrac = document.querySelector("#cnvPractical");
var ctx = cnvPrac.getContext("2d");
ctx.font = "16px Arial";
var isOn = false;
var hotSpotsList = [];



ctx.moveTo(390,310);
ctx.lineTo(55,310);
ctx.lineTo(55,55);
ctx.lineTo(490,55);
ctx.lineTo(490,310);
ctx.lineTo(390,310);
ctx.stroke();
ctx.moveTo(155,310);
ctx.lineTo(155,55);
ctx.stroke();

var swtch = new Image();
swtch.src = "res/switch.png";
hotSpotsList.push(new hotSpot("swtch",390+25,285+25));
swtch.onload = function(){
    ctx.drawImage(swtch,0,0,50,50,390,285,50,50);
}
function switchTurn(){
    if(isOn){
        ctx.drawImage(swtch,0,0,50,50,390,285,50,50);
        isOn = false;
        calVals(true);
    }else{
        ctx.drawImage(swtch,50,0,50,50,390,285,50,50);
        isOn = true;
        vrValue = 100;
        calVals(true);
    }
}


// function component(name,x,y,src,orientation,un){
//     this.name = name;
//     this.value = 0;
//     this.unitName = un;
//     this.x = x;
//     this.y = y;
//     this.img = new Image();
//     this.img.src = src;
//     if(orientation == "vrt"){
//         this.oriVal = 0;
//     }else if(orientation == "hrz"){
//         this.oriVal = 50;
//     }else{
//         console.log("invalied orientation!");
//     }
//     hotSpotsList.push(new hotSpot(this.name,this.x+25,this.y+25));
//     this.imgLoad = function(){
//         ctx.drawImage(this.img,this.oriVal,0,50,50,this.x,this.y,50,50);
//         console.log(this.img);
//     }
//     this.textLoad = function(){
//         if(this.oriVal == 0){
//             ctx.fillText(this.value+" "+this.unitName,this.x+55,this.y+30);
//         }else{
//             ctx.fillText(this.value+" "+this.unitName,this.x+10,this.y+55);
//         }
//     }
// }
// var swtch = new component("swtch",390,285,"./res/switch.png","hrz","hi");
// swtch.imgLoad();

var btryEValue = 6;
var btryRValue = 10+(Math.random()*20);
console.log("Battery inner resistance : "+btryRValue.toFixed(4));
var btry = new Image();
btry.src = "res/battery.png";
btry.onload = function(){
    ctx.drawImage(btry,0,0,50,50,30,160,50,50);
}

var vmValue = 6;
var vm = new Image();
vm.src = "res/voltmeter.png";
vm.onload = function(){
    ctx.drawImage(vm,0,0,50,50,130,160,50,50);
}

var amValue = 0.0;
var am = new Image();
am.src = "res/aMeter.png";
hotSpotsList.push(new hotSpot("am",230+25,280+25));
am.onload = function(){
    ctx.drawImage(am,0,0,50,50,230,280,50,50);
}
function changeAMValue(){
    amValue = parseFloat(prompt("Enter custom I (Not recomanded.)","0"));
    calVals(false);
}

var vrValue = 100;
var vr = new Image();
vr.src = "res/vRes.png";
hotSpotsList.push(new hotSpot("vr",240+25,30+25));
vr.onload = function(){
    ctx.drawImage(vr,50,0,50,50,240,30,50,50);
}
function changeVRValue(){
    vrValue = parseInt(prompt("Enter new resistance value","0"));
    calVals(true);
}

var resValue = 10;
var res = new Image();
res.src = "res/resister.png";
res.onload = function(){
    ctx.drawImage(res,50,0,50,50,400,30,50,50);
    ctx.fillText(resValue.toFixed(2)+" ohm",400,80);
}

function calVals(vrChng){
    if(isOn){
        if(vrChng){
            amValue = btryEValue/(resValue+vrValue+btryRValue);
        }else{
            vrValue = (btryEValue/amValue)-(resValue+btryRValue);
        }
        vmValue = amValue * (resValue+vrValue);
        if(vrValue < 0 || amValue < 0){
            alert("Invalied input value.");
            return;
        }
    }else{
        vmValue = btryEValue;
        amValue = 0;
    }
    ctx.clearRect(80,160,60,20);
    ctx.fillText(btryEValue.toFixed(2)+" v",80,180);
    ctx.clearRect(180,160,80,20);
    ctx.fillText(vmValue.toFixed(3)+" v",180,180);
    ctx.clearRect(230,320,90,20);
    ctx.fillText(amValue.toFixed(4)+" A",230,340);
    ctx.clearRect(240,64,95,20);
    ctx.fillText(vrValue.toFixed(2)+" ohm",240,80);
}

calVals();
//////////////////////////////////////////////////////////////////////////////////////////// functions

var btnRecord = document.querySelector("#btnRecord");
var tblData = document.querySelector("#dataTbl");
var btnDrawGraph = document.querySelector("#btnDrawGraph")
var tblValues = tblData.getElementsByTagName("td");

btnRecord.addEventListener("click",recordData);

function recordData(e){
    for(i=0 ;i<tblValues.length ;i+=3){
        if(tblValues[i].innerHTML == amValue.toFixed(4))return;
    }
    tblData.innerHTML += "<tr><td>"+amValue.toFixed(4)+"</td><td>"+vmValue.toFixed(3)+"</td><td>"+vrValue.toFixed(4)+"</td></tr>";
}

btnDrawGraph.addEventListener("click",drawGrahp);

function drawGrahp(){
    var x = [];
    var y = [];
    for(i=0 ;i<tblValues.length ;i+=3){
        x.push(tblValues[i].innerHTML);
        y.push(tblValues[i+1].innerHTML);
    }
    drawChart(x,y);
}


/////////////////////////////////////////////////////////////////////////////////////////////// draw chart
function drawChart(x,y){
    $(document).ready(function() {
        var ctx = $("#grahpCanvas");
      
        var data = {
          labels: x,
          datasets: [
            {
              label: 'Volt meter readings:',
              data:y,
              backgroundColor: '#00E0C1',
              borderColor: '#006E5E',
              fill: false,
              lineTension: 0,
              pointRadius: 5
            }
          ]
        };
      
        var options = {
          title: {
            display: true,
            position: 'top',
            text: 'Data Gragh',
            fontSize: 14,
            fontColor: '#111'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      
        var chart = new Chart(ctx, {
          type: "line",
          data: data,
          options: options
        })
      });
}


/////////////////////////////////////////////////////////////////////////////// canvas click listner

function hotSpot(name,x,y) {
    this.name = name
    this.x = x;
    this.y = y;
    this.withIn = function(x,y){
        if(Math.abs(x-this.x) <20 && Math.abs(y-this.y) <20){
            return true;
        }
        return false;
    }
}
//stop canvas scroll
document.onmousewheel = function(){ stopWheel(); } 
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll', stopWheel, false);
} 
function stopWheel(e){
    if(!e){ e = window.event; }
    if(e.preventDefault) { e.preventDefault(); }
    e.returnValue = false;
}

//listeners
cnvPrac.addEventListener("wheel",eventScroll);
cnvPrac.addEventListener("click",activeFunction);

function eventScroll(event){
    var objName = selectObj(event);
    switch(objName){
        case "vr": 
            changeVRValueScroll(event);
            break;
        default:
            //console.log("object name not match.");
    }
}

function changeVRValueScroll(event){
    if(event.deltaY<0){
        if(vrValue >=300) return;
        vrValue++;
    }else{
        if(vrValue <= 0) return;
        vrValue--;
    }
    calVals(true);
}

function selectObj(event){
    for( index in hotSpotsList){
        if(hotSpotsList[index].withIn(event.offsetX,event.offsetY)){
            return hotSpotsList[index].name;
        }
    }
    //console.log("object not found.");
}

function activeFunction(event){
    var objName = selectObj(event);
    switch(objName){
        case "swtch": 
            switchTurn();
            break;
        case "vr": 
            changeVRValue();
            break;
        case "am": 
            changeAMValue();
            break;
        default:
            //console.log("object name not match.");
    }
}

