var elem=document.documentElement;
var names = {"s":"Simp","c":"Chad"};
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
    for (const argument of textLineArgs){
        argNumber = argNumber+1;
        
        if (argument.length==1){
            $("#speakerBox").text(names[argument]);
        display(textLineArgs[argNumber]);
        }
        
    }
    
}
function display(x){
    $("#textDisplay").text(x);
    console.log(x);
}
function changeBackground(x){
    $("#backdrop").attr('src', x);
}