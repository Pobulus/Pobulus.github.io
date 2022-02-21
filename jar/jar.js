$(document).ready(main);
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  

function scriptLoad(data){
    console.log(data);
    textLines = data.split('\n');
    return textLines;
}
var colors = ["chall", "coup", "nice"]
function main(){
    
    $.get('https://pobulus.github.io/jar/cards.txt', function(data){
        var cards = scriptLoad(data);
    });
    $("#card").text(cards[getRandomInt(0, cards.length)]);
    $("#curtain").remove();
    console.log("started");
    for(i =0; i<100;i++){
        $("#jar-container").prepend("<div class=\" "+colors[getRandomInt(0, colors.length)]+ " others\" style=\"transform: rotate("+getRandomInt(-180, 180)+"deg);left: "+getRandomInt(4, 14)+"vmin;\"></div>");
    }
    $("#card").addClass(colors[getRandomInt(0, colors.length)]);
    
    $("#card").css("animation", "pickout 3s");
}