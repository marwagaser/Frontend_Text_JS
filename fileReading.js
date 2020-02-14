var circle;

function init() {
  //Create a stage by getting a reference to the canvas
  stage = new createjs.Stage('demoCanvas');
  //Create a Shape DisplayObject.
  circle = new createjs.Shape();
  circle.graphics.beginFill('red').drawRect(0, 0, 40, 40);
  //Set position of Shape instance.
  circle.x = circle.y = 50;
  //Add Shape instance to stage display list.
  stage.addChild(circle);
  //Update stage will render next frame
  stage.update();
}
var key = null;
var captureTime = null;
var MouseClick = null;
document.onmousedown = myMouseDownHandler;
document.addEventListener('keydown', isKeyClicked);
function myMouseDownHandler() {
  MouseClick = Math.floor(Date.now() / 1000);
}
function isKeyClicked(e) {
  captureTime = Math.floor(Date.now() / 1000);
  key = e.key;
  console.log(e.key);
}
var commands_Array = [];
const input = document.querySelector('input[type=file]');
input.addEventListener(
  'change',
  function(e) {
    const reader = new FileReader();
    reader.onload = function() {
      // call this once reading finished this is an onload callback
      const lines = reader.result.split('\n').map(function(line) {
        commands_Array.push(line);
      });
      var string = '';
      var arrayrepeats = [];
      var num = 0;
      var repeatVisited = 0;
      var numSteps = 0;
      var numTurns = 0;
      for (var k = 0; k < commands_Array.length; k++) {
        var words = commands_Array[k].split(' ');

        var theWord = words[0].replace(/[^\x20-\x7E]/gim, '');

        switch (theWord) {
          case 'REPEAT':
            var times = words[1].replace(/[^\x20-\x7E]/gim, '');
            arrayrepeats.push(times);
            string +=
              'for (var x' +
              num +
              ' = 0; ' +
              'x' +
              num +
              ' < times' +
              num +
              ' ; x' +
              num +
              '++ )';
            repeatVisited = repeatVisited + 1;
            num = num + 1;
            //repeat a command
            break;
          case 'BEGIN':
            string += '{ ';
            break;
          case 'END':
            string += '} ';
            break;
          case 'MOVE':
            var steps = words[1].replace(/[^\x20-\x7E]/gim, '');
            string += 'var steps' + numSteps + ' = ' + steps + '; ';
            string +=
              'for (var j = 1; j <= steps' +
              numSteps +
              ' ; j++ ){ console.log(MouseClick); circle.x += 1; } ';

            break;
          case 'TURN':
            var turns = words[1].replace(/[^\x20-\x7E]/gim, '');
            string += 'var turns' + numTurns + ' = ' + turns + '; ';
            string +=
              'for (var j = 1; j <= turns' +
              numTurns +
              ' ; j++ ){ circle.rotation += 1; } ';
            break;
          case 'IF':
            if (words[1].replace(/[^\x20-\x7E]/gim, '') == 'Key') {
              var theKey = words[words.length - 1].replace(
                /[^\x20-\x7E]/gim,
                ''
              );
              if (words.length < 5)
                if (!(theKey == 'space') && !(theKey == 'any')) {
                  string +=
                    'if (key != null && key == ' +
                    theKey +
                    ' && captureTime != null && ' +
                    Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                    '<20 )';
                } else if (theKey == 'space') {
                  var theSpace = ' ';
                  string +=
                    'if (key != null && key == " " && captureTime != null && ' +
                    Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                    '<20 )';
                } else if (theKey == 'any') {
                  string +=
                    'if (captureTime != null && ' +
                    Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                    '<20 )';
                } else {
                  theKey = words[4].replace(/[^\x20-\x7E]/gim, '');
                  var theDirection;
                  if (theKey == 'down') {
                    theDirection = 'ArrowDown';
                  } else if (theKey == 'up') {
                    theDirection = 'ArrowUp';
                  } else if (theKey == 'right') {
                    theDirection = 'ArrowRight';
                  } else {
                    theDirection = 'ArrowLeft';
                  }
                  string +=
                    'if (key != null && key == ' +
                    theDirection +
                    ' && captureTime != null && ' +
                    Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                    ' < 20 )';
                }
            } else if (words[1].replace(/[^\x20-\x7E]/gim, '') == 'Mouse') {
              string +=
                'if ( MouseClick != null && ' +
                Math.abs(MouseClick - Math.floor(Date.now() / 1000)) +
                ' < 0.01 )';
            }
        }
      }
      var repeats = '';
      for (var w = 0; w < arrayrepeats.length; w++) {
        repeats += 'var times' + w + ' = ' + arrayrepeats[w] + '; ';
      }
      string = repeats + string;
      console.log(string);
      var func = new Function(string);
      func();
      stage.update();
    };
    reader.readAsText(input.files[0]);
  },
  false
);
