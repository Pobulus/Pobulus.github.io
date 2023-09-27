var playerX = 0;
var playerY = 0;
var prevX = 1;
var prevY = 0;
var sprint = false;
var playerV = 10;
var pause = "True"
var skin0 = "";
var skin1 = "🏻";
var skin2 = "🏼";
var skin3 = "🏽";
var skin4 = "🏾";
var skin5 = "🏿";
var race = skin0;
var man = "👨";
var woman = "👩";
var person = "🧑";
var male = "‍♂️";
var female = "‍♀️";
var nb = "";
var gender = nb;
var ginger = "‍🦰";
var bald = "‍🦲";
var curly = "‍🦱";
var old = "‍🦳";
var normal = "";
var onetime = true;
var hair = normal;

$(document).ready(function(){updatePos();
    $("#dialogBox").hide();

$("#player").append(twemoji.parse('🧍'+race+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
let allPlayerEmojis = "🧍🧍‍♂️🧍‍♀️🏃🏃‍♂️🏃‍♀️🚶🚶‍♂️🚶‍♀️🏌️🏌️‍♂️🏌️‍♀️\
                       🧍🏻🧍🏻‍♂️🧍🏻‍♀️🏃🏻🏃🏻‍♂️🏃🏻‍♀️🚶🏻🚶🏻‍♂️🚶🏻‍♀️🏌🏻🏌🏻‍♂️🏌🏻‍♀️\
                       🧍🏼🧍🏼‍♂️🧍🏼‍♀️🏃🏼🏃🏼‍♂️🏃🏼‍♀️🚶🏼🚶🏼‍♂️🚶🏼‍♀️🏌🏼🏌🏼‍♂️🏌🏼‍♀️\
                       🧍🏽🧍🏽‍♂️🧍🏽‍♀️🏃🏽🏃🏽‍♂️🏃🏽‍♀️🚶🏽🚶🏽‍♂️🚶🏽‍♀️🏌🏽🏌🏽‍♂️🏌🏽‍♀️\
                       🧍🏾🧍🏾‍♂️🧍🏾‍♀️🏃🏾🏃🏾‍♂️🏃🏾‍♀️🚶🏾🚶🏾‍♂️🚶🏾‍♀️🏌🏾🏌🏾‍♂️🏌🏾‍♀️\
                       🧍🏿🧍🏿‍♂️🧍🏿‍♀️🏃🏿🏃🏿‍♂️🏃🏿‍♀️🚶🏿🚶🏿‍♂️🚶🏿‍♀️🏌🏿🏌🏿‍♂️🏌🏿‍♀️";
$("#emojiPreloader").append(twemoji.parse(allPlayerEmojis, {className: "preloadMoji", folder: "svg", ext: ".svg"}));
$("#Sun").append(twemoji.parse("☀️", {className: "skySun",  folder: "svg", ext: ".svg"}));    
$("#bM").append(twemoji.parse("♂️", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#bF").append(twemoji.parse("♀️", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#bN").append(twemoji.parse("⚧️", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 

$("#b0").append(twemoji.parse("🟨", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#b1").append(twemoji.parse("🏻", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#b2").append(twemoji.parse("🏼", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#b3").append(twemoji.parse("🏽", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#b4").append(twemoji.parse("🏾", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
$("#b5").append(twemoji.parse("🏿", {className: "buttonEmoji", folder: "svg", ext: ".svg"})); 
 $("#portrait").append(twemoji.parse(person+skin4+old, {className: "portraitEmoji", folder: "svg", ext: ".svg"})); 
 $('.building').each(function(i, obj) {
		console.log(obj);
		obj.replaceWith(twemoji.parse(obj, {className: "buildingEmoji", folder: "svg", ext: ".svg"}));
	});
});
function scroll_to(div){
	$('html, body').animate({
		scrollLeft: $("#player").offset().left-$(window).width()*0.60
	},1);}




function updatePos() { 
    if(pause){
        console.log($(".previewMoji"));
        $(".previewMoji").replaceWith(twemoji.parse('🧍'+race+gender, {className: "previewMoji", folder: "svg", ext: ".svg"}));
    }else{  
    
    $("#player").css("bottom", playerY);
    $("#player").css("left", playerX);
    console.log(-playerY.toString()+"%");
    scroll_to();
    $("#player").css("height", ((-playerY/20)+60).toString(10)+"%");
    if (sprint){
        $(".playerMoji").replaceWith(twemoji.parse('🏃'+race+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
    } if (sprint==false) {
        $(".playerMoji").replaceWith(twemoji.parse('🚶'+race+gender, {className: "playerMoji",  folder: "svg", ext: ".svg"}));
     if (prevX==playerX) {
        if (prevY<playerY){
            if (race==skin0){ //somehow if you don't do it, they will start cloning 
                $(".playerMoji").replaceWith(twemoji.parse('🏌️'+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
            }else{
                $(".playerMoji").replaceWith(twemoji.parse("🏌"+race+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
            }
        }else {
         $(".playerMoji").replaceWith(twemoji.parse('🧍'+race+gender, {className: "playerMoji", folder: "svg", ext: ".svg"}));
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

}
var keysPressed = {};


document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
    if (sprint){
        playerV = 25;
    } else {
        playerV = 10;
    }
     if (keysPressed['Enter']&&onetime) {
       onetime = false;
         pause = !pause;
    
         
        if (pause){
            $("#buttonBox").fadeIn();
            $("#player").hide();
        }else{          
            $("#player").show();
            $("#buttonBox").fadeOut();
        }
   }
if(!pause){
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
   }if (keysPressed['z']) {
       sprint = true;
       console.log(sprint);
   }}if (keysPressed['v']) {
       $("#dialogBox").fadeIn();
       
   }if (keysPressed['b']) {
       $("#dialogBox").fadeOut();
       
   }updatePos();
});

document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
   sprint = false;
    onetime = true;
   console.log(sprint);
    updatePos();
});
