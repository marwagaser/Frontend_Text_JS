
var stage;
var image;
var bitmap;

function init() {
  stage = new createjs.Stage('myCanvas');
  console.log("init");
  var image = new Image();
  image.src = './sprite1.png';
  image.onload = handleImageLoad;
}

function handleImageLoad(event) {
  var image = event.target;
  bitmap = new createjs.Bitmap(image);
  bitmap.scaleX = 0.5;
  bitmap.scaleY = 0.5;
  bitmap.x = 100;
  bitmap.y = 100;
  stage.addChild(bitmap);
  stage.update();
}


//var steps = ["MOVE 10", "Change X by: 45", "TURN 45","Set X by:"];

function GreenButtonClicked() {
  for (var i = 0; i < steps.length; i++) {
    var command = steps[i];
    var times = parseInt(command.match(/(\d+)/)[0]);
    if (command.includes('MOVE')) bitmap.x += times;

    if (command.includes('TURN')) bitmap.rotation += times;

    if (command.includes('CHANGE X')) bitmap.x += times;

    if (command.includes('CHANGE Y')) bitmap.y += times;

    if (command.includes('POINT')) bitmap.rotation = times;

    //createjs.Tween.get(circle).to({x: 275, y: 200}

    // if(command.includes("Set Y by:"))

    // if(command.includes("Change Y by:"))
    //   circle.y+=times;

    //if(command.includes(""))

    stage.update();
  } //end of for loop
} // end of Green Button Clicked
