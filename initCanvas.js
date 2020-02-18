let canvas = document.querySelector('#scratch-canvas');
fitToContainer(canvas);
let sprite;
let sprite2;

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', fitToContainer(canvas));

function init() {
  stage = new createjs.Stage("scratch-canvas");
  const image = new Image();
  image.src = "./images/avatar.png";
  image.onload = handleImageLoad;

  const image2 = new Image();
  image2.src = "./images/apple.png";
  image2.onload = handleImageLoad2;
}

function handleImageLoad(event) {
  const image = event.target;
  sprite = new createjs.Bitmap(image);
  sprite.scaleX = 0.4;
  sprite.scaleY = 0.4;
  sprite.x = 10;
  sprite.y = 10;
  stage.addChild(sprite);
  stage.update();
}

function handleImageLoad2(event) {
  const image2 = event.target;
  sprite2 = new createjs.Bitmap(image2);
  sprite2.scaleX = 0.2;
  sprite2.scaleY = 0.2;
  sprite2.x = 380;
  sprite2.y = 50;
  stage.addChild(sprite2);
  stage.update();
}