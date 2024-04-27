let SCREEN_WIDTH = 1063 / 2;
let SCREEN_HEIGHT = 1890 / 2;
let SCREEN_RATIO = 1;
let img;
let seq = 0;
let cam;

let button1, button_next, button_snap, button_save;
let button_proceed, button_retake, button_submit;
let button_edit, button_text_input;

let emoji_1_sun, button_emoji_1_sun;
let showEmoji1 = false;
let bs1_sun;

let snap;

let tempCanvas;


let userTextInput = "";

// IMG
let em1X, em1Y;


// TEXT OBJ
let userTextObj = "";
let textX, textY;

let words;

function preload() {
  img = loadImage('assets/start.png');


  emoji_1_sun = loadImage('assets/em1.png');


}

function setup() {

  let canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  canvas.parent("p5-canvas-container");


  SCREEN_RATIO = SCREEN_HEIGHT / 480;

  cam = createCapture(VIDEO);
  cam.hide();

  snap = createImage(640 * SCREEN_RATIO, 480 * SCREEN_RATIO);

  createTextInput();
  fill(255, 150, 200);
  textX = width / 2;
  textY = height / 2;


  button_next = createButton('next');
  button_next.parent("button-container");

  // In CSS, display: flex will allow you to arrange the items effectively in the container.

  // button_next.position(100, 100);

  // button_next.elt.style.position = "absolute";
  // button_next.elt.style.right = "100px";
  // button_next.elt.style.bottom = "100px";

  button_next.mousePressed(NEXT);


  button_snap = createButton('Snap');
  button_snap.parent("button-container");
  button_snap.mousePressed(SNAP);
  text(userTextObj, textX, textY);
  button_snap.hide();

  button_save = createButton('Save');
  button_save.parent("button-container");
  button_save.mousePressed(SAVE);
  button_save.hide();

  button_proceed = createButton('Proceed');
  button_proceed.parent("button-container");
  button_proceed.mousePressed(PROCEED);
  button_proceed.hide();

  button_retake = createButton('Retake');
  button_retake.parent("button-container");
  button_retake.mousePressed(RETAKE);
  button_retake.hide();

  button_submit = createButton("Submit");
  button_submit.parent("text-input-container");
  button_submit.mousePressed(submitText)
  button_submit.hide();

  button_edit = createButton('Finish');
  button_edit.parent("button-container");
  button_edit.mousePressed(EDIT)
  button_edit.hide();

  button_text_input = createButton('Say Something');
  button_text_input.parent("button-container");
  button_text_input.mousePressed(text_input)
  button_text_input.hide();

  button_emoji_1_sun = createImg("../assets/em1.png", "loading");
  //button.position(19, 19);
  button_emoji_1_sun.mousePressed(BS1);
  button_emoji_1_sun.hide();
}

function draw() {
  background(0);

  if (seq == 0) {
    //background(255, 0, 0);
    image(img, 0, 0)
  }
  else if (seq == 1) {
    //
  }
  else if (seq == 2) {
    push();

    // to flip
    translate(width, 0);
    scale(-1, 1);

    // to place the camera image to the center
    translate(-640 * SCREEN_RATIO / 2 + 1063 / 2, 0); // - camWidth/2 + canvasWidth/2

    // display the cam image and snapshot!
    image(cam, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);
    image(snap, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);

    button_next.hide();

    pop();
  }

  else if (seq == 3) {
    //background(255, 0, 255);
    push();

    // to flip
    translate(width, 0);
    scale(-1, 1);

    // to place the camera image to the center
    translate(-640 * SCREEN_RATIO / 2 + 1063 / 2, 0); // - camWidth/2 + canvasWidth/2

    // display the cam image and snapshot!
    image(cam, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);
    //image(snap, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);

    button_next.hide();
    button_snap.show();

    button_proceed.hide();
    button_retake.hide();

    pop();

  }

  else if (seq == 4) {

    //background(255, 0, 255);
    push();

    // to flip
    translate(width, 0);
    scale(-1, 1);

    // to place the camera image to the center
    translate(-640 * SCREEN_RATIO / 2 + 1063 / 2, 0); // - camWidth/2 + canvasWidth/2

    // display the cam image and snapshot!
    //image(cam, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);
    image(snap, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);

    //button_next.hide();
    //button_snap.show();
    button_edit.show();


    pop();



  }


  // input 显示测试输入
  //textAlign(CENTER);
  //textSize(15);
  //text(userTextInput, width / 2, 50);

  // submitted text
  textSize(30);
  text(userTextObj, textX, textY);

  if (mouseIsPressed) {
    textX = mouseX;
    textY = mouseY;
  }

  if (mouseIsPressed) {
    em1X = mouseX;
    em1Y = mouseY;
  }

  if (showEmoji1) {
    image(emoji_1_sun, em1X, em1Y);
  }

}

function NEXT() {

  //seq = seq + 1;

  //if (seq = 2) {
  seq = 2;
  button_snap.show();
  //button_snap.position(200, 0);
  //}

}

function PROCEED() {

  button_edit.show();
  button_retake.hide();
  button_proceed.hide();

  button_emoji_1_sun.show();


}

function RETAKE() {

  //snap.hide();
  clear();
  seq = 3;

}

function SNAP() {

  //snap = cam.get(0, 0);

  //let tempCanvas = createGraphics(width, height);

  tempCanvas = createGraphics(width, height);

  tempCanvas.push();
  //tempCanvas.scale(-1, 1); 
  tempCanvas.image(cam, width, 0, -width, height);
  tempCanvas.pop();


  snap = tempCanvas.get();

  button_snap.hide();
  button_proceed.show();
  button_retake.show();

  seq = 2;

  return false;


}

function SAVE() {

  saveCanvas('myCanvas.png');
  return false;

}

function EDIT() {

  button_snap.hide();
  button_text_input.show();
  button_edit.hide();
  button_save.show();
  button_emoji_1_sun.hide();

}

function text_input() {

  words.show();
  button_submit.show();
  button_text_input.hide();


  return false;
}

function BS1() {

  showEmoji1 = true;
  console.log("hi");

  // image(emoji_1_sun, em1X, em1Y);



}



//----TEXT INPUT DETAIL SETTINGS----

function createTextInput() {
  words = createInput("");
  words.parent("text-input-container");
  words.hide();
  //words.input(updateText); // not working as intended
  words.elt.addEventListener("keydown", updateText); // JS

  //  button_submit = createButton("Submit!");
  // button_submit.parent("text-input-container");
  // button_submit.mousePressed(submitText)
}


function submitText() {
  //userTextObj = userTextInput;
  userTextObj = userTextInput; //words.value();
  button_save.show();
}

function updateText(event) {
  if (event.key == "Enter") {
    userTextInput += words.value();
    userTextInput += "\n";
    words.elt.innerHTML = ""; // ***
  }
  userTextInput = words.value();
}

function updateText111(event) {
  //userTextInput = words.value();

  console.log(event);
  if (event.key == "Enter") {
    userTextInput += "\n";
  }
  else if (event.key == "Shift") {
    //
  }
  else if (event.key == "Control") {
    //
  }
  else if (event.key == "Alt") {
    //
  }
  else if (event.key == "Meta") {
    //
  }
  else if (event.key == "Backspace") {
    userTextInput = userTextInput.slice(0, -1);
    //https://byby.dev/js-remove-last-char
    //Here slice(0, -1) removes the last character because -1 means the last index of the string. You can also use str.length - 1 instead of -1 to get the same result.
  }
  else if (event.key == "Tab") {
    //
  }
  else {
    userTextInput += event.key;
  }
}