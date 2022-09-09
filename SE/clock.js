
var mode = "count";
mode = localStorage.getItem('mode');
var ring0 = 2;
var ring1 = 4;
var ring2 = 2;
var ring3 = 8;
var interval;
if(mode != "count"){
    mode = "clock";
    interval = window.setInterval(getTime, 100);
}else{
    interval = window.setInterval(incrementHands, 500);
}

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)
function toggleTheme(){
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
    if(!$("#fifth").is(':animated')){
        openAnimation();
    }
};
function openAnimation(){
    setHands();
    $(".fading").stop(true, true).css("opacity", "0%");
    $(".ring").each( function (index){
        var w = $(this).css("width");
        $(this).css("width", "0%");
        $(this).css("height", "0%");
        $(this).animate({height: w, width: w },((index+1))*350, function(){$(this).css("height", "").css("width", "");});
    });

    $(".fading").animate({opacity: "100%"}, 15000);
}
function toggleMode(){
    if(mode==="clock"){
        mode="count";
        ring0 = 2;
        ring1 = 4;
        ring2 = 2;
        ring3 = 8;
        setHands();
        window.clearInterval(interval);
        interval = window.setInterval(incrementHands, 500);

    }else{
        mode="clock";
        window.clearInterval(interval);
        interval = window.setInterval(getTime, 100);
        getTime();
        
    }
    localStorage.setItem('mode', mode);
}
function getTime(){
    var timeNow = new Date();
    ring0 = parseInt(timeNow.getSeconds()/5);
    if(ring0==0)ring0=12;
    ring1 = (parseInt(timeNow.getMinutes()/5)-1)%12+1;
    if(ring1==0)ring1=12;
    ring2 = timeNow.getHours()%12;
    if(ring2==0)ring2=12;
    ring3 = timeNow.getDate()%12+1;
    setHands();
}
function incrementHands(){
    ring0 = ring0+1;
    if(ring0>12){
        ring0 = 1;
        ring1 = ring1 + 1;
        if(ring1>12){
            ring1 = 1;
            ring2 = ring2 + 1;
            if(ring2>12){
                ring2 = 1;
                ring3 = ring3 + 1;
            }
        }
    }
    setHands();
}

function setHands(){
    $("#small-hand").removeClass("at1 at2 at3 at4 at5 at6 at7 at8 at9 at10 at11 at12").addClass("at"+ring0)
    $("#big-hand").removeClass("at1 at2 at3 at4 at5 at6 at7 at8 at9 at10 at11 at12").addClass("at"+ring1)
    $("#inner-hand").removeClass("at1 at2 at3 at4 at5 at6 at7 at8 at9 at10 at11 at12").addClass("at"+ring2)
    $("#outer-hand").removeClass("at1 at2 at3 at4 at5 at6 at7 at8 at9 at10 at11 at12").addClass("at"+ring3)

}