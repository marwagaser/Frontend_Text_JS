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

var commands_Array = [];
const input = document.querySelector('input[type=file]');
input.addEventListener(
  'change',
  function(e) {
    console.log(input.files);
    const reader = new FileReader();
    reader.onload = function() {
      // call this once reading finished this is an onload callback
      console.log(reader.result);
      const lines = reader.result.split('\n').map(function(line) {
        commands_Array.push(line);
      });
      var string = '';
      var arrayrepeats = [];
      var arraysteps = [];
      var num = 0;
      var repeatVisited = 0;

      var numSteps = 0;
      for (var k = 0; k < commands_Array.length; k++) {
        var words = commands_Array[k].split(' ');
        console.log(words);
        var theWord = words[0].replace(/[^\x20-\x7E]/gim, '');
        switch (theWord) {
          case 'REPEAT':
            var times = words[1];
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
              ' ; j++ ){ circle.x += 1; } ';
            break;
          case 'TURN':
            var turns = words[1].replace(/[^\x20-\x7E]/gim, '');
            string += "console.log('Turn " + turns + "')";
            for (var j = 1; j <= turns; j++) {
              circle.rotation += 1;
            }

            break;
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
