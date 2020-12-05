let table, colorPicker, input, button;

function preload() {
  table = loadTable('colornames.txt', 'csv', 'header');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorPicker = createColorPicker('#000000');
  colorPicker.position(0, height-25);
  input = createInput();
  input.position(0,0);
  button = createButton("SEARCH");
  button.position(input.width, 0);
  button.mousePressed(lookup);
  textSize(75);
  textFont('monospace');
}
function keyTyped(){
  if(keyCode==13){
    lookup();
  }
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  colorPicker.position(0, height-25);
}


let c, hexname;
function draw() {
  background(colorPicker.color());
  //print(colorPicker.color());

  textAlign(CENTER);
  c = colorPicker.color();
  
  fill(inverseColor(red(c), green(c), blue(c)));
  hexname = join([hex(red(c),2), hex(green(c),2), hex(blue(c),2)], "").toLowerCase();
    let row = table.findRow(hexname, "hexCode");
  
  if (row!=null){
    text(row.getString("bestName"), window.innerWidth/2, window.innerHeight/2-60);
    text(row.getString("votes"), window.innerWidth/2, window.innerHeight/2+60);
  }else{
    text("null", window.innerWidth/2, window.innerHeight/2);
  }
}
function inverseColor(r,g,b){
  
  r = 255 - r; //get the mathmatical inverse
  g = 255 - g; //get the mathmatical inverse
  b = 255 - b; //get the mathmatical inverse
  if (r==b&&b==g){
    if (g<128){
    return color(0, 0, 0);
  } else {
      return color(255, 255, 255);
  }
  }
  return color(r,g,b); //return a p5 color function containing our inverse color!
}

function lookup(){
  quer = input.value();
  let rows = table.matchRows(quer, "bestName");
  console.log(rows);
  var top = 0;
  if(rows.length == 0){
    print("Querry not found");
    let k = 0;
    let r = rows.length; //why is it 9? I don't remember
    while(r!=null){
      k++;
      r = table.findRow(hex(k, 6).toLowerCase(), "hexCode");
    
    }
    colorPicker.value("#"+hex(k, 6));
    //background(255,255,0);
    text("not Found", window.innerWidth/2, window.innerHeight/2);
    return;
  }
  for (let i = 0; i < rows.length; i++) {
    let x = parseInt(rows[i].getString("votes"));
    if(x>top){
      top = x;
      print(x, top);
      colorPicker.value("#"+rows[i].getString("hexCode"));}      
  }

}
