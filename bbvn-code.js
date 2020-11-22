var elem=document.documentElement;
var names = {" ":" "};
var colors = {};
var labels = {};
var fullscr=false; 
var debug=false;
var startLine = 0;
var backlog = 0;
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
    $("#title").hide();
    $(".character").hide();
    if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
        if(localStorage.userScript !== undefined){
        document.getElementById("txtArea").innerHTML = localStorage.userScript;
        }
        console.log("localStorageAccessed")
} else {
    console.log("localStorage unavailable...");
}
    $.get('https://pobulus.github.io/script.txt', function(data){
        scriptLoad(data);
    });
}
mainCounter = 0;
function userScriptLoad(){
    localStorage.userScript = $('#txtArea').val();
    scriptLoad($('#txtArea').val())
}
function scriptLoad(data){
        console.log(data);
        textLines = data.split('\n');
        var count = 0;
        for (const line of textLines){
            if (line.charAt(0)=="#"){
                console.log(count);
                labels[line.substring(1, line.indexOf(';'))] = count+1;
                console.log(labels);
                if (line.slice(1)=="START"){
                startLine = count+1 ;
            }}
            count = count+1;
        }
        var lineArgs;
        definitions = textLines.slice(0, startLine);
        console.log(definitions);
        for (const line of definitions){   
            console.log(line);
            interpret(line);
            
        }
        
        
        mainCounter = startLine;
        readLine(mainCounter);
}
function defineCharacter(x, alias, colr){
    names[x] = alias;
    colors[x] = colr; 
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
    if (mainCounter>startLine){
        mainCounter = mainCounter-1;
    } else {
        console.log("Start of the script!");
    }
    
    revert(mainCounter);
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
            }else if(argument == "define") {
                defineCharacter(textLineArgs[argNumber].charAt(1), textLineArgs[argNumber+1], textLineArgs[argNumber+2]);
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
            }else if(argument == "bannerSet") {
                bannerSet(textLineArgs[argNumber]);
            }else if(argument == "jump") {
                jumpLabel(textLineArgs[argNumber]);
            }
        }
    }
    
}
function jumpLabel(x){
    mainCounter = labels[x];
    console.log(labels[x]);
    readLine(mainCounter);
}
function revert(x){ 
    textLineArgs = textLines[x].split("; ");
    console.log(textLineArgs);
    var argNumber = 0;
    if (textLineArgs.length==1){
        display(textLineArgs[0]);
    }   else{
    for (const argument of textLineArgs){
        argNumber = argNumber+1;

        if (argument.length==1){
            $("#speakerBox").text("BACKLOG: "+names[argument]);
            $("#speakerBox").css({"color":colors[argument]});
        display(textLineArgs[argNumber]);
        }  }}
}
function display(x){
    $("#textDisplay").html(x);
    console.log(x);
}function bannerSet(x){
    $("#banner").html(x);
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
    if (!debug){
    switch(e.which) {
        case 68: // d
        debugMode();
        break;

        case 70: // f
        openFullscreen();
        break;
        //case 32: //space
        case 39: // right
        nextLine();
        break;

        case 37: // left
        prevLine();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
    }
};