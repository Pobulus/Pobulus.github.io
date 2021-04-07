var playerX = 0;
var playerY = 0;
var prevX = 1;
var prevY = 0;
var sprint = false;
var playerV = 10;
var pause = "True"
var skin0 = "";
var skin1 = "🏻";
var skin2 = "🏼";
var skin3 = "🏽";
var skin4 = "🏾";
var skin5 = "🏿";
var race = skin0;
var man = "👨";
var woman = "👩";
var person = "🧑";
var male = "‍♂️";
var female = "‍♀️";
var nb = "";
var gender = nb;
var ginger = "‍🦰";
var bald = "‍🦲";
var curly = "‍🦱";
var old = "‍🦳";
var normal = "";
var onetime = true;
var hair = normal;
$(document).ready(function(){
	console.log($('.student').text());
	$('.student').each(function(i, obj) {
		console.log(obj);
		classes = $(obj).attr("class").split(/\s+/)
		console.log(classes);
		out = ""
		if (classes.includes("man")){
			out += man;
		} else{ 
			if (classes.includes("woman")){
				out += woman;
			} else {
				out += person;
			} 
		};
		if (classes.includes("blonde")){
			out+= "🏼"; 
		} else {
			if (classes.includes("brown")){
				out += "🏽"
			} else {
				out += "🏻";
			}
		}
		if (classes.includes("buszman")){
			out = "🧔🏽";
		}else if (classes.includes("shirt")) {
				out = "👔";
			}
		
		
		else {

		out += "‍🎓";
		}
		$(obj).html(twemoji.parse(out, {className: "studented"+i, folder: "svg", ext: ".svg"}));
	});

//$(".student").append(twemoji.parse(woman+skin1+'‍'+'🎓', {className: "playerMoji", folder: "svg", ext: ".svg"}));

 $("#portrait").append(twemoji.parse(person+skin4+old, {className: "portraitEmoji", folder: "svg", ext: ".svg"})); 
 $(".building").replaceWith(twemoji.parse($(".building").text(), {className: "buildingEmoji", folder: "svg", ext: ".svg"}))                       
});

