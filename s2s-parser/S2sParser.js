class S2sParser {
  constructor(intermediateSyntax) {
    this.intermediateSyntax = intermediateSyntax;
    this.commands = intermediateSyntax.split("\n");
  }

  get syntax() {
    return this.parseLines();
  }

  parseLines() {
    let js = "";
    let currentCommand = commands.shift().trim();
    // Counter used for enumerating different possible values of loop indices
    // for example after each loop we construct a new variable name index1, index2, index3, etc.
    let indexCounter = 1;
    if (currentCommand == "IFGREENFLAGCLICKED") {
    }
    while (currentCommand != null) {
      let commandParams = currentCommand.split(" ");
      switch (commandParams[0]) {
        // Scoping cases
        case "BEGIN":
          js += "{\n";
          break;
        case "END":
          js += "}\n";
          break;
        // CHANGE avatar X, Y cases
        case "CHANGE":
          js += `avatar.${commandParams[1].toLowerCase()} += ${
            commandParams[2]
            };
          `;
          break;
        case "SET":
          js += `avatar.${commandParams[1].toLowerCase()} = ${commandParams[2]};
          `;
          break;
        case "GO":
          js += parseGoCommand(commandParams);
          break;
        // Basic animation cases
        case "MOVE":
          
        window.addEventListener('mouseup', e => {
          if (isDrawing === true) {
            drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
            x = 0;
            y = 0;
            isDrawing = false;
          }
        }); ":
          js += `avatar.x += ${commandParams[1]}`;
          break;
        case "TURN":
          js += `avatar.rotation += ${commandParams[1]};
          break;`;
        // Control struct cases
        case "REPEAT":
          js += `for(let index${indexCounter} = 0; index${indexCounter} < ${commandParams[1]}; index${indexCounter}++)`;
          break;
        case "IF":
          parseCondition(commandParams);
        case "IFGREENFLAGCLICKED":
      }
    }
  }

  parseGoCommand(commandParams) {
    let values = commandParams[3].split(",");
    return `avatar.x = ${params[0]};
        avatar.y = ${params[1]};
         `;
  }

  parseCondition(commandParams) {

  }
}
