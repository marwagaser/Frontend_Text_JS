
function getS2sOperant(operent) {
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
function parseS2sOperator(operator) {
  if (operator == '=') {
    return ' == ';
  } else {
    return ' ' + operator + ' ';
  }
}
function parseS2sCondition(commandParams) {
  let value = `await sleep(33);\n if ( `;
  let pointer;
  if (commandParams[1] + commandParams[2] == 'MouseDown') {
    value += 'lastMouseClick != null && ' + new Date().getTime() + ' - ' + lastMouseClick.timestamp.getTime() + ' < ' + 200;
  } else {
    if (commandParams[1] == "Key") {
      var theKey = commandParams[3];
      if (commandParams[4] != null && commandParams[4].startsWith('arr')) {
        theKey = commandParams[3] + ' ' + commandParams[4];
      }

      if (!(theKey == "space") && !(theKey == "any")) {
        value +=
          "lastKeyPress != null &&  new Date().getTime()  -  lastKeyPress.timestamp.getTime() <  1000 && lastKeyPress.code == " +
          `"${theKey}"`;
      } else if (theKey == "space") {
        value +=
          'lastKeyPress != null && new Date().getTime()  -  lastKeyPress.timestamp.getTime() <  1000 && lastKeyPress.code == "space"';
      } else if (theKey == "any") {
        value +=
          "lastKeyPress != null && new Date().getTime()  -  lastKeyPress.timestamp.getTime() <  1000";
      }
    } else {
      if (commandParams[1].startsWith('Mouse') | commandParams[1].startsWith('Y') | commandParams[1].startsWith('X')) {
        value += getS2sOperant(commandParams[1] + commandParams[2]) + parseS2sOperator(commandParams[3]);
        pointer = 4;
      } else {
        value += commandParams[1] + parseS2sOperator(commandParams[2]);
        pointer = 3;
      }
      if (commandParams[pointer].startsWith('Mouse') | commandParams[pointer].startsWith('Y') | commandParams[pointer].startsWith('X')) {
        value += getS2sOperant(commandParams[pointer] + commandParams[pointer + 1]);
      } else {
        value += commandParams[pointer];
      }
    }
  }
  value += ' )';

  return value;
}
