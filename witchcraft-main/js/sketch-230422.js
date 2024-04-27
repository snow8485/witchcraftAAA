let SCREEN_WIDTH = 1063 / 2;
let SCREEN_HEIGHT = 1890 / 2;
let SCREEN_RATIO = 1;
let initial_img;
let seq = 0;
let cam;

let button1, button_next, button_snap, button_save;
let button_proceed, button_retake, button_submit;
let button_edit, button_text_input;

//let emoji_1_sun, button_emoji_1_sun;
let showEmoji1 = false;
let bs1_sun;


// IMG
//let em1X, em1Y;



//let dragObject;

//scale
let images = [];
let img = [];
let buttons = [];
let eraseMode = false;
let scaleMode = false;
let selectedImageIndex = -1;

// CAM
let snap;
let tempCanvas;


let userTextInput = "";



// TEXT OBJ
let userTextObj = "";
let textX, textY;

let words;



function preload() {
  initial_img = loadImage('assets/start.png');


  //emoji_1_sun = loadImage('assets/em1.png');



  images.push(loadImage('assets/quzhu.png'));
  images.push(loadImage('assets/men.png'));

  //images.parent("asset_container");


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



  //
  let eraseButton = createButton('Erase Mode');
  eraseButton.position(20, 20);
  eraseButton.mousePressed(EraseMode);


  let scaleButton = createButton('Scale Mode');
  scaleButton.position(20, 40);
  scaleButton.mousePressed(ScaleMode);

  buttons.push(eraseButton, scaleButton);


  for (let i = 0; i < images.length; i++) {
    let button = createButton('Show Image ' + i);
    button.position(20, 80 + i * 40);
    button.mousePressed(() => showImage(i));
    buttons.push(button);
  }



  //try

  const container = document.getElementById('asset-container');

  // 遍历图片数组，创建并添加图片元素到容器中
  images.forEach(src => {
    // 创建图片元素
    const asset = document.createElement('asset');
    asset.src = src;
    asset.alt = 'Image';

    // 将图片元素添加到容器中
    container.appendChild(asset);

    asset.style.zIndex = 9999;
  });


}

function draw() {
  background(0);
  //



  for (let button of buttons.slice(2)) {
    if (eraseMode || scaleMode) {
      button.hide();
    } else {
      button.show();
    }
  }
  //

  if (seq == 0) {
    //background(255, 0, 0);
    image(initial_img, 0, 0)
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


  for (let i = 0; i < img.length; i++) {
    img[i].show();
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



//image dragging

function EraseMode() {
  eraseMode = !eraseMode;
  scaleMode = false;
  updateButtonLabels();
}


function ScaleMode() {
  scaleMode = !scaleMode;
  eraseMode = false;
  updateButtonLabels();
}


function updateButtonLabels() {
  buttons[0].elt.textContent = eraseMode ? 'Done' : 'Enter Erase Mode';
  buttons[1].elt.textContent = scaleMode ? 'Done' : 'Enter Scale Mode';
}

function showImage(index) {
  let x = random(width - images[index].width);
  let y = random(height - images[index].height);
  //let x = 1000;
  //let y = 1000;
  let dragObject = new ImageDragObject(x, y, images[index], 1);
  img.push(dragObject);
}

// function isEventOnCanvas(x, y) {
//   const rect = document.getElementById('p5-canvas-container').getBoundingClientRect();
//   return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
// }


function mousePressed() {
  for (let i = 0; i < img.length; i++) {
      if (img[i].mouseInside(mouseX, mouseY)) {
          img[i].dragging = true;
          img[i].offsetX = mouseX - img[i].x;
          img[i].offsetY = mouseY - img[i].y;
          return false;  // 停止处理其他图片
      }
  }
}

function mouseDragged() {
  for (let i = 0; i < img.length; i++) {
      if (img[i].dragging) {
          img[i].x = mouseX - img[i].offsetX;
          img[i].y = mouseY - img[i].offsetY;
      }
  }
  return false;
}

function mouseReleased() {
  for (let i = 0; i < img.length; i++) {
      img[i].dragging = false;
  }
  return false;
}

function touchStarted() {
  if (touches.length > 0 && isEventOnCanvas(touches[0].x, touches[0].y)) {
      let interactionFound = false; // 标记是否找到交互对象
      img.forEach(image => {
          if (image.mouseInside(touches[0].x, touches[0].y)) {
              if (!interactionFound) { // 只有首次找到时设置为true
                  image.dragging = true;
                  image.offsetX = touches[0].x - image.x;
                  image.offsetY = touches[0].y - image.y;
                  interactionFound = true; // 标记找到交互对象
              } else {
                  image.dragging = false; // 确保不触摸的图像不会移动
              }
          } else {
              image.dragging = false; // 确保不触摸的图像不会移动
          }
      });
  }
}

function touchMoved() {
  if (touches.length > 0 && isEventOnCanvas(touches[0].x, touches[0].y)) {
      img.forEach(image => {
          if (image.dragging) {
              image.x = touches[0].x - image.offsetX;
              image.y = touches[0].y - image.offsetY;
          }
      });
  }
}


function touchEnded() {
  if (touches.length > 0 && isEventOnCanvas(touches[0].x, touches[0].y)) {
      handleInteraction(touches[0].x, touches[0].y, 'end');
  }
  // 确保所有图片的拖动状态被重置
  img.forEach(image => {
      image.dragging = false;
  });
}

// 确保 isEventOnCanvas 函数正确定义
function isEventOnCanvas(x, y) {
  const rect = document.getElementById('p5-canvas-container').getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}


function mouseInBox(x, y, w, h) {
  return mouseX >= x && mouseX < x + w &&
    mouseY >= y && mouseY < y + h;
}

function handleInteraction(x, y, type) {
  switch (type) {
    case 'start':
      // 检查是否在擦除模式或缩放模式
      if (eraseMode) {
        for (let i = img.length - 1; i >= 0; i--) {
          if (img[i].mouseInside(x, y)) {
            img.splice(i, 1); // 移除选中的图片
            break;
          }
        }
      } else {
        for (let i = 0; i < img.length; i++) {
          if (img[i].mouseInside(x, y)) {
            img[i].dragging = true;
            img[i].offsetX = x - img[i].x;
            img[i].offsetY = y - img[i].y;
            if (scaleMode) {
              selectedImageIndex = i; // 设置当前缩放的图片索引
            }
            break;
          }
        }
      }
      break;
    case 'move':
      if (!eraseMode && selectedImageIndex !== -1 && scaleMode) {
        // 缩放选中的图片
        img[selectedImageIndex].adjustScale(x, y);
      } else {
        // 移动所有被拖动的图片
        img.forEach((image) => {
          if (image.dragging) {
            image.x = x - image.offsetX;
            image.y = y - image.offsetY;
          }
        });
      }
      break;
    case 'end':
      // 停止所有图片的拖动
      img.forEach((image) => {
        image.dragging = false;
      });
      selectedImageIndex = -1; // 清除选中的图片索引
      break;
  }
}

class ImageDragObject {
  constructor(x, y, img, scale) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.scale = scale;
    this.originalScale = scale;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
}

mouseInside(x, y) {
    let scaledWidth = this.img.width * this.scale;
    let scaledHeight = this.img.height * this.scale;
    return x >= this.x && x <= this.x + scaledWidth &&
           y >= this.y && y <= this.y + scaledHeight;
}

  adjustScale(x, y) {
    let dx = x - pmouseX; // 计算鼠标或触摸移动的距离
    let dy = y - pmouseY;
    // 假设缩放的影响是和移动距离成正比
    this.scale += Math.sqrt(dx * dx + dy * dy) * 0.01;
    this.scale = Math.max(0.1, this.scale); // 保持最小缩放限制
  }

  show() {
    image(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
}
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