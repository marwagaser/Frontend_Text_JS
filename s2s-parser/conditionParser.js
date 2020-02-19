const parseCondition = function (commandParams) {
  console.log('params: ',commandParams);
  let value = 'if ( ';
  let pointer;

  if(commandParams[1]+ commandParams[2] == 'MouseDown'){
      value += 'lastMouseClick != null && ' + new Date().getTime() + ' - ' + lastMouseClick.timestamp.getTime() + ' < ' + 200;
  } else {
    if (commandParams[1] == "Key") {
      
      var theKey = commandParams[3];
        if (!(theKey == "space") && !(theKey == "any")) {
          value +=
            "key != null && key == " +
            theKey;
        } else if (theKey == "space") {
          value +=
            'key != null && key == " " && captureTime != null ';
        }
    } else {
      if(commandParams[1].startsWith('Mouse')| commandParams[1].startsWith('Y') |commandParams[1].startsWith('X')){
        value += this.getOperant(commandParams[1]+commandParams[2]) + this.parseOperator(commandParams[3]);
        pointer = 4;
      } else {
        value += commandParams[1] + this.parseOperator(commandParams[2]);
        pointer = 3;
      }
      if (commandParams[pointer].startsWith('Mouse')| commandParams[pointer].startsWith('Y') |commandParams[pointer].startsWith('X')){
        value += this.getOperant(commandParams[pointer]+commandParams[pointer+1]);
      } else {
        value += commandParams[pointer];
      }
    }
  }
  value += ' )';

  return value;
}

const getOperant = function (operent){
  switch (operent) {
    case 'MouseX':
      return mousePosition.x;
    case 'MouseY':
      return mousePosition.y;
    case 'Xposition':
      return avatar.x;
    case 'Yposition':
      return avatar.y;
  }
}
const parseOperator = function (operator){
  if (operator == '='){
    return ' == ';
  } else {
    return ' ' + operator + ' ';
  }
}