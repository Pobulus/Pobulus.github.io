function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(-360, 360, 0, 5);
  sliderr = createSlider(0, 500, 250, 5);
  sliderr.position(0, 25);
  sliderr.style('width', '200px');
  slider.position(0,0);
  slider.style('width', '200px');
  
}
let sliderr;
let slider; 
let r = 250;
let x = 0;
let y = 0;
function draw() {
  r = sliderr.value();
  clear();
  strokeWeight(1);
  stroke(0);
  line(width/2, 0, width/2, height );
  line(0, height/2, width, height/2 );
  angle = radians(90+slider.value());
  console.log(angle);
  text("Kąt "+slider.value(), 210, 15);
  text("Promień: "+r, 210, 45);
  stroke(255, 0, 0);
  
  x = sin(angle)*r;
  y = cos(angle)*r;
  fill(25);
  text("KĄT: "+slider.value()+"\nSINUS:"+round(sin(radians(slider.value())), 5)+"\nCOSINUS: "+round(cos(radians(slider.value())), 5)+"\nTANGENS: "+round(tan(radians(slider.value())), 5)+"\nCOTANGENS: "+round(1/tan(radians(slider.value())), 5), 10, 50, 200, 200);
  strokeWeight(3);
  line(width/2, height/2, width/2+x, height/2+y);//ray
  noFill();
  arc(width/2, height/2, r/2, r/2, HALF_PI-angle, 0);
  fill(0);
  stroke(0,255,0);
  line(width/2+x, height/2, width/2+x, height/2+y);//xline
  text("y: "+int(r*sin(radians(slider.value()))), width/2+x, height/2+y);
  stroke(0,0,255);
  line(width/2, height/2+y, width/2+x, height/2+y);//xline
  text("x: "+int(r*cos(radians(slider.value()))), width/2+x, height/2+y-15);
}
