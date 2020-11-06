var elem=document.documentElement;
var names = {"s":"Simp","c":"Chad","b":"Bob", " ":" "};
var colors = {"s": "#00ff00", "c":"#00ffff","b":"#ff8800"};
var fullscr=false; 
/* View in fullscreen */
function openFullscreen() {
    if (!fullscr){
        fullscr=true;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }}
    else{
        fullscr=false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        }
}
var mainCounter = 0;
var textLines = new Array;
function load(){
    $("#buttonBox").hide();
    $(".character").hide();
    $.get('https://pobulus.github.io/script.txt', function(data){
        console.log(data);
        textLines = data.split('\n');
        console.log(textLines);
        readLine(mainCounter);
    });
}

function nextLine(){
    if (mainCounter<textLines.length-1){
        mainCounter = mainCounter+1;
    } else {
        console.log("End of the script!");
    }
    
    readLine(mainCounter);
}
function prevLine(){
    if (!mainCounter==0){
        mainCounter = mainCounter-1;
    } else {
        console.log("Start of the script!");
    }
    
    readLine(mainCounter);
}
function readLine(x){
    
    textLineArgs = textLines[x].split("; ");
    console.log(textLineArgs);
    var argNumber = 0;
    if (textLineArgs.length==1){
        display(textLineArgs[0]);
    }else{
        for (const argument of textLineArgs){
            argNumber = argNumber+1;

            if (argument.length==1){
                $("#speakerBox").text(names[argument]);
                $("#speakerBox").css({"color":colors[argument]});
            display(textLineArgs[argNumber]);
            } else if(argument == "ch") {
                imageChange(textLineArgs[argNumber],textLineArgs[argNumber+1]+".png");
            }else if(argument == "ml") {
                imageMoveLeft(textLineArgs[argNumber]);
            }else if(argument == "mr") {
                imageMoveRight(textLineArgs[argNumber]);
            }else if(argument == "mc") {
                imageMoveCenter(textLineArgs[argNumber]);
            }else if(argument == "al") {
                imageAnimateLeft(textLineArgs[argNumber]);
            }else if(argument == "ar") {
                imageAnimateRight(textLineArgs[argNumber]);
            }else if(argument == "ac") {
                imageAnimateCenter(textLineArgs[argNumber]);
            }else if(argument == "vh") {
                imageHide(textLineArgs[argNumber]);
            }else if(argument == "vs") {
                imageShow(textLineArgs[argNumber]);
            }
        }
    }
    
}
function display(x){
    $("#textDisplay").text(x);
    console.log(x);
}

function imageMoveLeft(x){
    $("#"+x).css({left:"-33vw"});
}
function imageMoveRight(x){
    $("#"+x).css({left:"33vw"});
}
function imageMoveCenter(x){
    $("#"+x).css({left:"0vw"});
}function imageAnimateLeft(x){
    $("#"+x).animate({left:"-35vw"});
}
function imageAnimateRight(x){
    $("#"+x).animate({left:"35vw"});
}
function imageAnimateCenter(x){
    $("#"+x).animate({left:"0vw"});
}
function imageHide(x){
    $("#"+x).hide("slow");
}
function imageShow(x){
    $("#"+x).show("slow");
}
function imageChange(x, y){
    $("#"+ x).attr('src', y);
}
function debugMode(){
    $("#buttonBox").show();
}