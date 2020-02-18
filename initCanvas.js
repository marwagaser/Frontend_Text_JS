let canvas = document.querySelector('#scratch-canvas');
fitToContainer(canvas);
let stage;
let avatar;
let apple;

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
  avatar = new createjs.Bitmap(image);
  avatar.scaleX = 0.4;
  avatar.scaleY = 0.4;
  avatar.x = 90;
  avatar.y = 50;
  stage.addChild(avatar);
  stage.update();
}

function handleImageLoad2(event) {
  const image2 = event.target;
  apple = new createjs.Bitmap(image2);
  apple.scaleX = 0.2;
  apple.scaleY = 0.2;
  apple.x = 380;
  apple.y = 50;
  stage.addChild(apple);
  stage.update();
}

init();