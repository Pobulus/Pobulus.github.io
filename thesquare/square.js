var darkmode = false;
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
var sqrWave = new Audio("square.ogg");
var sinWave = new Audio("sine.ogg");
var noise = new Audio("ksh.ogg");
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
        duration: 100,
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
    $("#square").animate({"border-radius": curBR+direction*(sqw/5)+"px"}, 200);
    if(curBR>(sqw-30)&&direction == 1){
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
    if(getRandomInt(0,5)> 2){
        // dirs[getRandomInt(0,2)]
        var nc = getRandomInt(0,2);
        if(nc<2){
        if(clr%2==0)clr = odd[nc];
        else clr = even[nc];
        }else if (clr == 4) clr = 0;
        makeArrow("down", colors[clr]);
        if(getRandomInt(0,5)<2){
            if(clr==3){makeArrow("left", colors[0]);}
            else {makeArrow("left", colors[clr+1]);}
            if(getRandomInt(0,3)==0){
                if(clr==0)clr=4;
                makeArrow("right", colors[clr-1]);
            }
        }else if(getRandomInt(0,5)<2){
            if(clr==3){makeArrow("right", colors[0]);}
            else {makeArrow("right", colors[clr+1]);}
            if(getRandomInt(0,3)==0){
                if(clr==0)clr=4;
                makeArrow("left", colors[clr-1]);
            }
        }
    }
}

function moveArrows(){
    spawnArrows()
    noise.play();
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
}

function getColor(direction){
    
    var mod = 0;
    if (direction == "right") mod = -1*flip;
    if (direction == "left") mod = 1*flip;
    out = ((sqrot/90)+mod)%4;
    if(out<0)out = 4+out
    return colors[out];
}

function verifyHit(obj){
    if($(obj).hasClass("down")){
        console.log("got here");
        if($(obj).hasClass(getColor("top"))){
            edges(-1);
            console.log("good color");
            sqrWave.play();
            score = score +1;
        }else{
            edges(1);
            console.log("bad color");
            sinWave.play();
        }
    }
    if($(obj).hasClass("left")){
        console.log("got here");
        if($(obj).hasClass(getColor("left"))){
            edges(-1);
            console.log("good color");
        }else{
            edges(1);
            console.log("bad color");
        }
    }
    if($(obj).hasClass("right")){
        console.log("got here");
        if($(obj).hasClass(getColor("right"))){
            edges(-1);
            console.log("good color");
        }else{
            edges(1);
            console.log("bad color");
        }
    }
}

function stopGame(){
    game = false;

    $(".arrow").remove();
    clearInterval(gameloop);
    $("#title").animate({height: "20vh"}, 500);
    $("#switch").show();
    $("#fullscr").show();
    $("#settings").show();

    ResetRotate();
    $("#score").html(score);
    $("#replay").animate({opacity: "1"}, 500);
}

function startGame(){
    score = 0;
    ResetRotate();
    $("#score").html("");
    $(".shy").hide();
    $("#play_icon").remove();
    $("#square").animate({"border-radius": 0+"px"}, 200);
    $("#replay").animate({opacity: "0"}, 500);
    $("#title").animate({height: "0px"}, 500);
    clearInterval(gameloop);
    gameloop = setInterval(moveArrows, 500);
    game = true;
}


window.onload = function(){
    var bodyStyles = window.getComputedStyle(document.body);
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