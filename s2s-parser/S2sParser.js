class S2sParser {
  constructor(intermediateSyntax) {
    this.intermediateSyntax = intermediateSyntax;
    this.commands = intermediateSyntax.trim().split("\n");
    this.flagTriggered = false;
    this.keyTriggered = false;
    this.started = false;
  }

  get syntax() {
    return this.parseLines();
  }

  parseLines() {
    let js = "";
    let currentCommand = this.commands.shift().trim();
    this.handleTriggers(currentCommand);
    if (this.commands.length > 0) {
      currentCommand = this.commands.shift();
    } else {
      currentCommand = null;
    }
    // Counter used for enumerating different possible values of loop indices
    // for example after each loop we construct a new variable name index1, index2, index3, etc.
    let indexCounter = 1;

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
stage.update();
await sleep(33);
`;
          break;
        case "SET":
          js += `avatar.${commandParams[1].toLowerCase()} = ${commandParams[2]};
stage.update();
await sleep(33);
`;
          break;
        case "GO":
          js += this.parseGoCommand(commandParams);
          break;
        // Basic animation cases
        case "MOVE":
          js += `let point${indexCounter} = avatar.localToGlobal(${commandParams[1]}, 0);
avatar.x = point${indexCounter}.x;
avatar.y = point${indexCounter}.y;
stage.update();
await sleep(33);
`;
          indexCounter++;
          break;
        case "POINT":
          js += `avatar.rotation = ${commandParams[1]};
  stage.update();
  await sleep(33);
  `;
          break;
        case "TURN":
          js += `avatar.rotation + ${commandParams[1]} < 360 ? avatar.rotation += ${commandParams[1]} : avatar.rotation += -360 + ${commandParams[1]};
stage.update();
await sleep(33);
`;
          break;
        // Control struct cases
        case "REPEAT":
          js += `for(let index${indexCounter} = 0; index${indexCounter} < ${commandParams[1]}; index${indexCounter}++)`;
          indexCounter++;
          break;
        case "IF":
          js += this.parseCondition(commandParams);
          break;
        case "ELSE":
          js += 'else'
          break;
        default:
          throw new Error('Unsupported command ' + currentCommand);
      }
      currentCommand = this.commands.shift();
    }
    return js;
  }


  parseGoCommand(commandParams) {
    let params = commandParams[3].split(",");
    return `avatar.x = ${params[0]};
avatar.y = ${params[1]};
stage.update();
await sleep(33);
`;
  }

  handleTriggers(command) {
    if (command === "IFGREENFLAGCLICKED") {
      this.flagTriggered = true;
    } else {
      if (command.endsWith('PRESSED')) {
        this.keyTriggered = command[1];
      } else {
        throw new Error("Could not find an event to trigger input code. Either IFGREENFLAGCLICKED or a key press is necessary in the beginning");
      }
    }
  }
}

  S2sParser.prototype.parseCondition = parseS2sCondition