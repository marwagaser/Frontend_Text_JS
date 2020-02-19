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
  const avatarImage = new Image();
  avatarImage.src = "./images/avatar.png";
  avatarImage.onload = handleAvatarImageLoad;
  const appleImage = new Image();
  appleImage.src = "./images/apple.png";
  appleImage.onload = handleAppleImageLoad;
}

function handleAvatarImageLoad(event) {
  const avatarImage = event.target;
  avatar = new createjs.Bitmap(avatarImage);
  avatar.scaleX = 1;
  avatar.scaleY = 1;
  avatar.x = 100;
  avatar.y = 200;
  stage.addChild(avatar);
  stage.update();
}

function handleAppleImageLoad(event) {
  const appleImage = event.target;
  apple = new createjs.Bitmap(appleImage);
  apple.scaleX = 0.2;
  apple.scaleY = 0.2;
  apple.x = 380;
  apple.y = 50;
  stage.addChild(apple);
  stage.update(); 
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
init();