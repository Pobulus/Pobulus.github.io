var playerX = 0;
var playerY = 0;
var prevX = 1;
var prevY = 0;
var sprint = false;
var playerV = 10;

var skin0 = "";
var skin1 = "🏻";
var skin2 = "🏼";
var skin3 = "🏽";
var skin4 = "🏾";
var skin5 = "🏿";
var race = skin0;

var male = "♂️";
var female = "♀️";
var nb = "";
var gender = nb;

$(document).ready(function(){updatePos();
$("#player").append(twemoji.parse('🧍'+race+"‍"+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
$("#Sun").append(twemoji.parse("☀️", {className: "skySun",  folder: "svg", ext: ".svg"}));                            
});
function updatePos() { 
    $("#player").css("bottom", playerY);
    $("#player").css("left", playerX);
    console.log(-playerY.toString()+"%");
    $("#player").css("height", ((-playerY/20)+50).toString(10)+"%");
    if (sprint){
        $(".playerMoji").replaceWith(twemoji.parse('🏃'+race+"‍"+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
        console.log("zupa");
    } if (sprint==false) {
        $(".playerMoji").replaceWith(twemoji.parse('🚶'+race+"‍"+gender, {className: "playerMoji",  folder: "svg", ext: ".svg"}));
     if (prevX==playerX) {
        if (prevY<playerY){
            if (race==skin0){
                $(".playerMoji").replaceWith(twemoji.parse('🏌️'+"‍"+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
            }else{
                $(".playerMoji").replaceWith(twemoji.parse("🏌"+race+"‍"+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
            }
        }else {
         $(".playerMoji").replaceWith(twemoji.parse('🧍'+race+"‍"+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
     }
    } 
        
    }
    
    if (playerX > prevX ) {
        $("#player").addClass("mirr");
    } if (playerX < prevX) {
        $("#player").removeClass("mirr");
    }
    prevX = playerX;
    prevY = playerY;
}




var keysPressed = {};


document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
    if (sprint){
        playerV = 25;
    } else {
        playerV = 10;
    }
   if (keysPressed['ArrowUp']) {
       if(playerY< window.innerHeight/2){
       playerY = playerY+playerV;
          }
   } if (keysPressed['ArrowRight']) {
       playerX = playerX+playerV;
   }if (keysPressed['ArrowLeft']) {
       if(playerX>-window.innerWidth/20){
       playerX = playerX-playerV;
       }
   }if (keysPressed['ArrowDown']) {
       if (playerY > 10){
       playerY = playerY-playerV;
       }
   }if (keysPressed['Shift']) {
       sprint = true;
       console.log(sprint);
   }updatePos();
});

document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
   sprint = false;
   console.log(sprint);
    updatePos();
});
