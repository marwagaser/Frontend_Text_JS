class S2sParser {
  constructor(intermediateSyntax) {
    this.intermediateSyntax = intermediateSyntax;
    this.commands = intermediateSyntax.split("\n");
    this.flagTriggered = false;
    this.keyTriggered = false;
  }

  get syntax() {
    return this.parseLines();
  }

  parseLines() {
    console.log("parsing lines here");
    let js = "";
    let currentCommand = this.commands.shift().trim();
    this.handleTriggers(currentCommand);
    // if(this.commands.length > 0){
    //   currentCommand = this.commands.shift().trim();  
    // }else{
    //   currentCommand = null;
    // }
    
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
`;
          break;
        case "SET":
          js += `avatar.${commandParams[1].toLowerCase()} = ${commandParams[2]};
stage.update();
`;
          break;
        case "GO":
          js += parseGoCommand(commandParams);
          break;
        // Basic animation cases
        case "MOVE":
          js += `
          avatar.x += +${commandParams[1]};
stage.update();
`;
          break;
        case "TURN":
          js += `avatar.rotation += ${commandParams[1]};
stage.update();
`;
          break;
        // Control struct cases
        case "REPEAT":
          js += `for(let index${indexCounter} = 0; index${indexCounter} < ${commandParams[1]}; index${indexCounter}++)`;
          indexCounter++;
          break;
        case "IF":
          parseCondition(commandParams);
          break;
      }
      currentCommand = this.commands.shift();
    }
    return js;
  }


  parseGoCommand(commandParams) {
    let params = commandParams[3].split(",");
    return `avatar.x = ${params[0]};
avatar.y = ${params[1]};
stage.update();` + '\n';
  }

  handleTriggers(command){
    if (command === "IFGREENFLAGCLICKED") {
      this.flagTriggered = true;
    }else{
      if(command.endsWith('PRESSED')){
        this.keyTriggered = command[1];
      }else{
        throw new Error("Could not find an event to trigger input code. Either IFGREENFLAGCLICKED or a key press is necessary in the beginning");
      }
    }
  }

  parseCondition(commandParams) {

  }
}
