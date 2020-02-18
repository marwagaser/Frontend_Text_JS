let key = null;
let captureTime = null;
let MouseClick = null;
let startExecution = false;
let started = false;
document.onmousedown = myMouseDownHandler;
document.addEventListener("keydown", isKeyClicked);
function myMouseDownHandler() {
  MouseClick = Math.floor(Date.now() / 1000);
}
function isKeyClicked(e) {
  captureTime = Math.floor(Date.now() / 1000);
  key = e.key;
  if (started == false) {
    started = true;
    //set to true after loop starts
  }
}

function parseJSON() {
  const text = document.querySelector('#scratch-json').value;
  const parser = new ScratchParser(text);
  console.log(parser.syntax);
}

function processText() {
  const parsedText = document.querySelector("#parsed-text").value;
  // call this once reading finished this is an onload callback
  const commands = parsedText.split("\n");
  console.log(commands);
  var string = "";
  var num = 0;
  var numSteps = 0;
  var numTurns = 0;
  for (var k = 0; k < commands.length; k++) {
    var words = commands[k].split(" ");

    var theWord = words[0].replace(/[^\x20-\x7E]/gim, "").toUpperCase();

    switch (theWord) {
      case "CHANGE":
        let commandParams = words.split(" ");
        string += `sprite.${commandParams[1].toLowerCase()} += ${
          commandParams[2]
        }`;
        break;
      case "SET":
        commandParams = words.split(" ");
        string += `sprite.${commandParams[1].toLowerCase()} += ${
          commandParams[2]
        }`;
        break;
      case "GO":
        commandParams = words.split(" ");
        let params = commandParams[3].split(",");
        string += `sprite.x = ${params[0]};
            sprite.y = ${params[1]};
             `;
        break;
      case "REPEAT":
        var times = words[1].replace(/[^\x20-\x7E]/gim, "");
        string +=
          "for (var x" +
          num +
          " = 0; " +
          "x" +
          num +
          " < times" +
          num +
          " ; x" +
          num +
          "++ )";
        num = num + 1;
        //repeat a command
        break;
      case "BEGIN":
        string += "{ ";
        break;
      case "END":
        string += "} ";
        break;
      case "MOVE":
        var steps = words[1].replace(/[^\x20-\x7E]/gim, "");
        string += "var steps" + numSteps + " = " + steps + "; ";
        string +=
          "for (var j = 1; j <= steps" +
          numSteps +
          " ; j++ ){ console.log(MouseClick); sprite.x += 1; } ";

        break;
      case "TURN":
        var turns = words[1].replace(/[^\x20-\x7E]/gim, "");
        string += "var turns" + numTurns + " = " + turns + "; ";
        string +=
          "for (var j = 1; j <= turns" +
          numTurns +
          " ; j++ ){ sprite.rotation += 1; } ";
        break;
      case "IF":
        if (words[1].replace(/[^\x20-\x7E]/gim, "") == "Key") {
          var theKey = words[words.length - 1].replace(/[^\x20-\x7E]/gim, "");
          if (words.length < 5)
            if (!(theKey == "space") && !(theKey == "any")) {
              string +=
                "if (key != null && key == " +
                theKey +
                " && captureTime != null && " +
                Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                "<20 )";
            } else if (theKey == "space") {
              var theSpace = " ";
              string +=
                'if (key != null && key == " " && captureTime != null && ' +
                Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                "<20 )";
            } else if (theKey == "any") {
              string +=
                "if (captureTime != null && " +
                Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                "<20 )";
            } else {
              theKey = words[4].replace(/[^\x20-\x7E]/gim, "");
              var theDirection;
              if (theKey == "down") {
                theDirection = "ArrowDown";
              } else if (theKey == "up") {
                theDirection = "ArrowUp";
              } else if (theKey == "right") {
                theDirection = "ArrowRight";
              } else {
                theDirection = "ArrowLeft";
              }
              string +=
                "if (key != null && key == " +
                theDirection +
                " && captureTime != null && " +
                Math.abs(captureTime - Math.floor(Date.now() / 1000)) +
                " < 20 )";
            }
        } else if (words[1].replace(/[^\x20-\x7E]/gim, "") == "Mouse") {
          string +=
            "if ( MouseClick != null && " +
            Math.abs(MouseClick - Math.floor(Date.now() / 1000)) +
            " < 0.01 )";
        }
      case "WHEN":
        let pressedKey = words[1].replace(/[^\x20-\x7E]/gim, "");
        if (!(pressedKey == "space") && !(pressedKey == "any")) {
          string += "if (key != null && key == pressedKey && started == true)";
        } else if (pressedKey == "space") {
          string += 'if (key != null && key == " " && started == true)';
        } else if (pressedKey == "any") {
          string += "if(started == true)";
        } else {
          pressedKey = words[2].replace(/[^\x20-\x7E]/gim, "");
          var theDirection;
          if (pressedKey == "down") {
            theDirection = "ArrowDown";
          } else if (pressedKey == "up") {
            theDirection = "ArrowUp";
          } else if (pressedKey == "right") {
            theDirection = "ArrowRight";
          } else {
            theDirection = "ArrowLeft";
          }
          string +=
            "if (key != null && key ==" + theDirection + " && started == true)";
        }
    }
  }

  string += "started = false;\n";
  console.log(string);
  var func = new Function(string);
  func();
  stage.update();
}

init();
