$(document).ready(preload);
var colors = ["chall", "coup", "nice", "null"]
var cards;
randomOrder = [85, 0, 77, 86, 44, 57, 31, 15, 80, 82, 95, 17, 18, 63, 62, 13, 87, 84, 9, 74, 37, 61, 98, 81, 93, 1, 89, 72, 14, 65, 41, 78, 8, 20, 59, 42, 66, 75, 16, 67, 5, 88, 99, 51, 90, 4, 33, 36, 71, 64, 58, 83, 73, 97, 68, 45, 46, 6, 7, 70, 96, 27, 49, 54, 56, 19, 40, 48, 47, 35, 50, 69, 21, 30, 10, 92, 23, 32, 34, 39, 43, 60, 29, 25, 53, 2, 3, 22, 91, 28, 76, 12, 52, 24, 26, 55, 94, 79, 38, 11]
var index=-1;

function cardColor(x){
    var nice = 33;
    var coup = 34;
    var chall = 33;
    if(x<chall){
        return 0;
    }else if(x <chall+coup){
        return 1;
    }else{
        return 2;
    }
}
function removeByValues(arr, val){
   
    
    for( var i = 0; i < arr.length; i++){ 
    
        if ( arr[i] === val) { 
    
            arr.splice(i, 1); 
        }
    
    }
}

function generateRandomOrder(){
    var randomOrder = [];
    var options = [];
    for(i=0; i<100; i++){
        options.push(i);
    }
    while(options.length){
        var r = getRandomInt(0, options.length);
        randomOrder.push(options[r]);
        removeByValues(options, options[r]);
    }
    console.log(randomOrder.join(", "));

}

document.onkeydown = function (event) {
    if(event.key=="ArrowRight"){
        index++;
        main();
    }
    else if(event.key=="ArrowDown"){
    
    }
    else if(event.key=="ArrowLeft"){
        index--;
        main();
    }
 };
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function countDaysFrom(d, m){
    var now = new Date();
    var start = new Date(now.getFullYear(), m-1, d-1);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay)-1;
    console.log('Day: ' + day);
    return day;
}
function card(color, text){
    $("#card").removeClass("chall nice coup");
    $("#card").addClass(color);
    $("#card").text(text);
}

function preload(){
    // generateRandomOrder();
    index = countDaysFrom(6, 3)
    $.get('https://pobulus.github.io/jar/cards.txt', function(data){
        // console.log(data);
        cards = data.split('\n');
        
    });
    $("#jar").ready(main);
    $("#jar").attr("src","jar.png");
}
function main(){
    if(index<0){
        $("#curtain").show()
        var odmiana = "dni";
        if(index == -1)odmiana = "dzień";
        $("#curtain_message").html("Prezent otworzy się za "+(-index)+" "+odmiana+".<br>🎁");
    }else{
        if(index>7){
            $("body").get(0).style.setProperty("--legenda-opacity", "0%");
            }
        if(index<randomOrder.length){
            if(randomOrder[index]<cards.length){
                card(colors[cardColor(randomOrder[index])], cards[randomOrder[index]]);
            }else{
                card("null", "[kartka niezdefiniowana]");
            }
        }else{
            card(colors[cardColor(randomOrder[index])], "Karteczki się skończyły :(");
        }
        $("#curtain").hide();
        $(".others").remove();
        for(i =0; i<(100-index);i++){
            $("#jar-container").prepend("<div class=\" "+colors[cardColor(randomOrder[100-i])]+ " others\" style=\"transform: rotate("+getRandomInt(-180, 180)+"deg);left: "+getRandomInt(4, 14)+"vmin;\"></div>");
        }
        $("#card").css("animation", "pickout 3s");
    }
}