var darkmode = false;
var delay = 600; 
var bpm = 105;
var endless = false;
const a = 1.059463094359;
var pitch = 14;
var hits = 0;
var score = 0;
var sqrot = 0;
var flip = 1;
var colors = ["orange", "pink", "cyan", "green"];
var dirs = ["down", "left", "right"];
var colorsNeg = ["orange", "green", "cyan", "pink"];
var keysPressed = {};
var rotated = false;
var keyTO;
var game = false;
var Ltouch = false;
var Rtouch = false;
var elL;
var elR;
var clr = 0;
var odd = [1, 3];
var even = [0, 2];
//json = '{"URL":"https://soundcloud.com/2ghost/we-will-rock-you","left":["P",null,null,null,"C",null,null,"G",null,null,"P"],"right":[null,"P",null,"O",null,"G",null,"P",null,"C"],"top":["O","C","O","P","G","O","C","O","O",null,"C","O"],"beats":["300","1480","","","","","","","","","","","","","","","","","","",""]}'
json = '{"URL":"https://soundcloud.com/doom-1993/at-dooms-gate","left":[null,null,null,null,null,null,null,null,"O","C","O","C","G","P","G","P",null,null,null,null,null,null,null,null,null,null,"P","C","G","O",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"O","O","O","O","O","O"],"right":[null,null,null,null,null,null,null,null,"C","O","C","O","P","G","P","G",null,null,null,null,null,null,null,null,null,null,"G","O","P","C",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"P","P","P","P","P","P","P"],"top":["O","P","C","G","O","P","C","G","G","G","G","G","C","C","C","C",null,"O","P","C","G","O","G","C","P","O",null,null,null,null,"P","P","P","P","P","P","P","C","C","C","C","C","C","O","O","O","O","O","O","G","G","G","G","G","G","G"],"beats":["545","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","272","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}'
map = JSON.parse(json);
const shortColor = {
    "O": "orange",
    "P": "pink",
    "G": "green",
    "C": "cyan"
}
var sqrWave = new Audio("square.ogg");
sqrWave.preservesPitch = false;
var sinWave = new Audio("sine.ogg");
sinWave.preservesPitch = false;
var noise = new Audio("ksh.ogg");
var noiseMiss = new Audio("kshuh.ogg");
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }

    if(angle < 0) angle +=360;
    return angle;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1)) + min;
}
var fullscr = false;
var elem = document.documentElement;
function openFullscreen() {
         
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    fullscr = true;


}

function changeColor(c, v){
    $("body").get(0).style.setProperty("--"+c, v);
}

function AnimateRotate(angle) {
    // caching the object for performance reasons
    var $elem = $('.rotating');
    var curRot = getRotationDegrees($elem);

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: sqrot}).animate({deg: sqrot+angle}, {
        duration: 100,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'scaleX(' + flip + ') rotate(' + now + 'deg)'
            });
        }
    });
    sqrot = sqrot+angle;
}
function ResetRotate() {
    // caching the object for performance reasons
    var $elem = $('.rotating');
    var curRot = getRotationDegrees($elem);
    flip = 1
    sqrot = 0;
    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: curRot}).animate({deg: 0}, {
        duration: 100,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'scaleX(' + flip + ') rotate(' + now + 'deg)'
            });
        }
    });

}

function AnimateFlip(side) {
    // caching the object for performance reasons
    var $elem = $('#square');
    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: flip}).animate({deg: side}, {
        duration: 150,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'scaleX(' + now + ') rotate(' + sqrot + 'deg)'
            });
        }
    });flip = -flip;
}

function rotateCW(){
        AnimateRotate(flip*90);
}

function rotateCCW(){
        AnimateRotate(flip*-90);
}

function edges(direction){
    var curBR = $("#square").css("border-radius");
    curBR = parseInt(curBR.substring(0, curBR.length - 2));
    var sqw = $("#square").width();
    $("#square").animate({"border-radius": curBR+direction*(sqw/7)+"px"}, 200);
    if(curBR>(sqw*0.6)&&direction == 1){
        stopGame();
    }
}
var gameloop;
var ticks = 0;
function makeArrow(dir, color){
    $("#wrapper").append("<div class=\"arrow "+dir+" "+color+ "\"></div>");
}

function toggleTheme(){
    darkmode = !darkmode;
    if(!darkmode){
        $("body").get(0).style.setProperty("--background", "#121212");
        $("body").get(0).style.setProperty("--text", "#e6e6e6");
        $("img").css({"filter":"invert(0)"});
    }else{
        $("body").get(0).style.setProperty("--background", "#e6e6e6");
        $("body").get(0).style.setProperty("--text", "#121212");
        $("img").css({"filter":"invert(1)"});
    }
}

function spawnArrows(){
    if(endless){
        if(getRandomInt(0,5)> 1){
            // dirs[getRandomInt(0,2)]
            var nc = getRandomInt(0,3);
            if(nc<2){
                if(clr%2==0)clr = odd[nc];
                else clr = even[nc];
                makeArrow("down", colors[clr]);
            }else {
                if (clr == 4) clr = 0;
                makeArrow("down", colors[clr]);
                var rn = getRandomInt(0,2);
                if(rn==0){
                    if(clr==3){makeArrow("left", colors[0]);}
                    else {makeArrow("left", colors[clr+1]);}
                    if(getRandomInt(0,2)==0){
                        if(clr==0)clr=4;
                        makeArrow("right", colors[clr-1]);
                    }
                }else if(rn==1){
                    if(clr==3){makeArrow("right", colors[0]);}
                    else {makeArrow("right", colors[clr+1]);}
                    if(getRandomInt(0,4)==0){
                        if(clr==0)clr=4;
                        makeArrow("left", colors[clr-1]);
                    }
                }
            }
        }
    } else {
        if(map.left[beat+10])makeArrow("left", shortColor[map.left[beat+10]]);
        if(map.top[beat+10])makeArrow("down", shortColor[map.top[beat+10]]);
        if(map.right[beat+10])makeArrow("right", shortColor[map.right[beat+10]]);
    }
}

function moveArrows(){
    spawnArrows()
    beat = beat+1;
    noise.play();
    hits = 0;
    pitch = 0;
    var jump =  $("#scale").width();
    $(".down").each(function(){
        var t = $( this ).position().top+jump;
        $(this).animate({top: t+"px"}, 100);
        if(t>=$("#box").offset().top-2*jump){
            console.log("hit top");
            verifyHit(this);
            $(this).remove();
        }
    });
    $(".left").each(function(){
        var t = $( this ).position().left;
        $(this).animate({left: t+"px"}, 100);
        if(t>$("#box").offset().left-3*jump){
            console.log("hit left");
            verifyHit(this);
            $(this).remove();
        }
    });
    $(".right").each(function(){
        var t = $( this ).position().left;
        $(this).animate({left: t-2*jump+"px"}, 100);
        if(t<$("#box").offset().left+6*jump){
            console.log("hit right");
            verifyHit(this);
            $(this).remove();
        }
    });

    if(hits>0){
        
        shiftedSound(sqrWave, pitch-16);
        edges(-1);
        score = score + hits;
        if(delay>151&&endless)delay = 600-(50*parseInt(score/50));
        
        console.log(delay);
    } else if (hits<0){
        shiftedSound(sinWave, pitch-16);
       edges(1);
    }
    if(game){
        if(endless)gameloop = setTimeout(moveArrows, delay);
        else{ 
            if(map.beats[beat]){
                console.log(map.beats[beat])
                prevdelay = parseInt(map.beats[beat]);
            }
            if(beat<map.beats.length) gameloop = setTimeout(moveArrows, prevdelay);
            else setTimeout(stopGame, prevdelay);
            
        }
    }
}
function shiftedSound(sound, tones){
    sound.pause();
    sound.playbackRate = Math.pow(a, tones);
    sound.play();
}
function getColor(direction){
    
    var mod = 0;
    if (direction == "right") {
        mod = -1*flip;
    }
    if (direction == "left") {
        mod = 1*flip;
    }
    out = ((sqrot/90)+mod)%4;
    if(out<0)out = 4+out
    if(direction=="top")pitch = pitch + out*9;
    if(direction=="left")pitch = pitch + out*3;
    if(direction=="right")pitch = pitch + out;
    
    return colors[out];
}

function verifyHit(obj){
    if($(obj).hasClass("down")){
        console.log("got here");
        if($(obj).hasClass(getColor("top"))){
            // edges(-1);
            console.log("good color");
            hits = hits+1;

        }else{
            // edges(1);
            console.log("bad color");
            hits = hits-1;
            // sinWave.play();
        }
    }
    if($(obj).hasClass("left")){
        console.log("got here");
        if($(obj).hasClass(getColor("left"))){
            // edges(-1);
            console.log("good color");
            hits = hits+1;
        }else{
            // edges(1);
            console.log("bad color");
            hits = hits-1;
        }
    }
    if($(obj).hasClass("right")){
        console.log("got here");
        if($(obj).hasClass(getColor("right"))){
            // edges(-1);
            console.log("good color");
            hits = hits+1;
        }else{
            // edges(1);
            console.log("bad color");
            hits = hits-1;
        }
    }
}
function convertBPM(x){
    return parseInt(1000/(x/60));
}
function stopGame(){
    game = false;

    $(".arrow").remove();
    (gameloop);
    $("#title").animate({height: "20vh"}, 500);
    $("#switch").show();
    $("#fullscr").show();
    $("#settings").show();
    
    ResetRotate();
    $("#score").html(score);
    $("#replay").animate({opacity: "1"}, 500);
    SC.Widget($("#sc-widget").get(0)).pause();
}
var editor = true;
function toggleEditor(){
    editor = !editor;1
    if(editor) $("#editor").hide();
    else $("#editor").show();

}
var x = 14;
var prevdelay = 0;
var beat = 0;
function startGame(){
    score = 0;
    beat = 0; 
    prevdelay = 0;
    ResetRotate();
    $("#score").html("");
    $(".shy").hide();
    $("#play_icon").remove();
    $("#square").animate({"border-radius": 0+"px"}, 200);
    $("#replay").animate({opacity: "0"}, 500);
    $("#title").animate({height: "0px"}, 500);
    clearInterval(gameloop);
    
    if(endless){delay = 600;
        gameloop = setTimeout(moveArrows, delay);
    }
    else {
        if(map.beats[beat]){
            prevdelay = parseInt(map.beats[beat]);
        } else delay = 600;
        SC.Widget($("#sc-widget").get(0)).load(map.URL);
        SC.Widget($("#sc-widget").get(0)).bind(SC.Widget.Events.READY, function(){
        SC.Widget($("#sc-widget").get(0)).seekTo(0);
        SC.Widget($("#sc-widget").get(0)).play();
        gameloop = setTimeout(moveArrows, prevdelay);
        });
        
    }
    
    // SC.Widget($("#sc-widget").get(0)).seekTo(0);
    // SC.Widget($("#sc-widget").get(0)).play();
    game = true;
}


window.onload = function(){

    var bodyStyles = window.getComputedStyle(document.body);
    if (window.localStorage.getItem("map")){
        map = JSON.parse(window.localStorage.getItem("map"));
    }
    $("input").each(function(){
        console.log($(this).attr('id').substring(6, $(this).attr('id').length));
        $(this).val(bodyStyles.getPropertyValue('--'+$(this).attr('id').substring(6, $(this).attr('id').length))); 

    });

    elL = document.getElementById("LT");
    elR = document.getElementById("RT");
    elL.addEventListener("touchstart", function(evt){
        evt.preventDefault();
        if(!game) $("#touch").show();
        if(!game) $("#prompt").show();
        Ltouch = true;
        if(Rtouch){
            rotated = true;
            AnimateFlip(-flip);
            clearTimeout(keyTO);
        }else {     
            keyTO = setTimeout(function(){
                if (Rtouch&&!rotated) {
                    rotateCW();
                    rotated = true;
                }if (Ltouch&&!rotated) {
                    rotateCCW();
                    rotated = true;
                }
            }, 50);
        }
    });
    elR.addEventListener("touchstart", function(evt){
        evt.preventDefault();
        if(!game) $("#touch").show();
        Rtouch = true;
        if(Ltouch){
            rotated = true;
            AnimateFlip(-flip);
            Rtouch = false;
            Ltouch = false;
            clearTimeout(keyTO);
        }else {     
        keyTO = setTimeout(function(){
        if (Rtouch&&!rotated) {
            rotateCW();
            rotated = true;
            Rtouch = false;

        }if (Ltouch&&!rotated) {
            rotateCCW();
            rotated = true;
            Ltouch = false;
        }
    }, 50);
        }
    });

elL.addEventListener("touchend", function(){Ltouch = false;rotated = false; });
elR.addEventListener("touchend", function(){Rtouch = false;rotated = false;});
}
document.addEventListener('keydown', (event) => {
keysPressed[event.key] = true;
if(!game) $("#keyboard").show();
if (keysPressed['Enter']&&!game) {

    ResetRotate();
    startGame();
}
if (keysPressed['f']) {
    openFullscreen();
}
if (keysPressed['e']) {
    toggleEditor();
}
if (keysPressed["ArrowUp"]){

        console.log(x);
        shiftedSound(sinWave, x-14);
        x = x+1;

    
}if (keysPressed["ArrowDown"]){


    

} if (keysPressed['ArrowRight'] &&keysPressed['ArrowLeft']&&!rotated){

        rotated = true;

        AnimateFlip(-flip);
        
        clearTimeout(keyTO);
}else {
keyTO = setTimeout(function(){
    if (keysPressed['ArrowRight'] &&!rotated) {
        rotateCW();
        rotated = true;

    }if (keysPressed['ArrowLeft']&&!rotated) {
        rotateCCW();
        rotated = true;
    }
}, 50);

}
});

document.addEventListener('keyup', (event) => {
   delete keysPressed[event.key];
   rotated = false;


});
