$(document).ready(main);
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
var colors = ["chall", "coup", "nice"]
function main(){
    $("#curtain").remove();
    console.log("started");
    for(i =0; i<100;i++){
        $("#jar-container").prepend("<div class=\" "+colors[getRandomInt(0, colors.length)]+ " others\" style=\"transform: rotate("+getRandomInt(-180, 180)+"deg);left: "+getRandomInt(4, 14)+"vmin;\"></div>");
    }
    $("#card").addClass(colors[getRandomInt(0, colors.length)]);
    $("#card").text("");
    $("#card").css("animation", "pickout 3s");
}