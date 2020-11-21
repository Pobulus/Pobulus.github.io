var elem=document.documentElement;
var names = {" ":" "};
var colors = {};
var fullscr=false; 
var debug=false;
var startLine = 0;
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
var dataLines = new Array;
var definitions = new Array;
function load(){
    $("#buttonBox").hide();
    $(".character").hide();
    $.get('https://pobulus.github.io/script.txt', function(data){
        console.log(data);
        dataLines = data.split('\n');
        var count = 0;
        for (const line of dataLines){
            if (line=="#START"){
                console.log(count);
                startLine = count;
                definitions = dataLines.slice(0, count);
                textLines = dataLines.slice(count+1);   
            }
            count = count+1;
        }
        var lineArgs;
        for (const line of definitions){
            lineArgs = line.split("; ");
            names[lineArgs[0]]=lineArgs[1];
            console.log(lineArgs[2][lineArgs[2].length-1]);
            if(lineArgs[2][lineArgs[2].length-1]==";"){
                lineArgs[2]=lineArgs[2].substring(0,7);
               
               }
            colors[lineArgs[0]]=lineArgs[2];
            
        }
        console.log(definitions);
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
    if (!mainCounter==startLine){
        mainCounter = mainCounter-1;
    } else {
        console.log("Start of the script!");
    }
    
    readLine(mainCounter);
}
function readLine(x){
    interpret(textLines[x]);
}
function interpret(x){
    
    textLineArgs = x.split("; ");
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
            } else if(argument == "sprite") {
                var filename = textLineArgs[argNumber+1]
                if (filename.charAt(filename.length-4)=="."){
                    imageChange(textLineArgs[argNumber], filename);
                } else {
                    imageChange(textLineArgs[argNumber], filename+".png");
                }
            }else if(argument == "goL") {
                imageMoveLeft(textLineArgs[argNumber]);
            }else if(argument == "goR") {
                imageMoveRight(textLineArgs[argNumber]);
            }else if(argument == "goC") {
                imageMoveCenter(textLineArgs[argNumber]);
            }else if(argument == "slideL") {
                imageAnimateLeft(textLineArgs[argNumber]);
            }else if(argument == "slideR") {
                imageAnimateRight(textLineArgs[argNumber]);
            }else if(argument == "slideC") {
                imageAnimateCenter(textLineArgs[argNumber]);
            }else if(argument == "hide") {
                imageHide(textLineArgs[argNumber]);
            }else if(argument == "show") {
                imageShow(textLineArgs[argNumber]);
            }else if(argument == "scene") {
                imageChange("backdrop", textLineArgs[argNumber]);
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
    if(debug){
        $("#buttonBox").hide();
        debug=false;
    }else{
        $("#buttonBox").show();
        debug=true;

    }
}
document.onkeydown = function(e) {
    switch(e.which) {
        case 68: // d
        debugMode();
        break;

        case 70: // f
        openFullscreen();
        break;
        case 32: //space
        case 39: // right
        nextLine();
        break;

        case 37: // left
        prevLine();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};