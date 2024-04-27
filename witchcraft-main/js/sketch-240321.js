let img;
let seq = 0;
let cam;
//let button;


var snap;


var wordsss
var words






function preload() {
  img = loadImage('assets/start.png');


}


function setup() {
  let canvas = createCanvas(1063, 1890);
  canvas.parent("p5-canvas-container");


  cam = createCapture(VIDEO);



  cam.hide();


  snap = createImage(640 * 3.9375, 480 * 3.9375);


}


function draw() {
  background(0);


  if (seq == 0) {
    background(255, 0, 0);
  }
  else if (seq == 1) {
    image(img, 0, 0)
  }
  else if (seq == 2) {

    push();
    translate(width, 0);
    scale(-1, 1);

    image(cam, 0, 0, 640 * 3.9375, 480 * 3.9375);


    image(snap, 0, 0, 640 * 3.9375, 480 * 3.9375)

    pop();
  }
  else if (seq == 3) {
    background(255, 0, 255);
  }
}


function updateText() {
  wordsss.html(words.value());
}


function keyPressed() {


  //function mousePressed() {


  if (key == " ") {
    seq = seq + 1;
  }


  if (key == "a") {


    // save('myCanvas.png');
    snap = cam.get(0, 0);

    return false;
  }


  if (key == "p") {


    words = createInput('say something');
    words.position(2000, 2000);
    createP()
    wordsss = createP('?')


    //wordsss.position(1000, 2200);


    wordsss.style('font-size', 1000)
    wordsss.style('color', 'deeppink');
    wordsss.position(2000, 2000);


    words.input(updateText);
  }


  if (key == "s") {


    saveCanvas('myCanvas.png');
    //snap = cam.get(0, 0);

    return false;
  }






}



















