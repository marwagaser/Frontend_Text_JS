
function getS2sOperant(operent) {
  switch (operent.toLowerCase()) {
    case 'mousex':
      return 'mousePosition.x';
    case 'mousey':
      return 'mousePosition.y';
    case 'xposition':
      return 'avatar.x';
    case 'yposition':
      return 'avatar.y';
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
  let value = `await sleep(33);\nif ( `;
  let pointer;
  if (commandParams[1] + commandParams[2] == 'MouseDown') {
    value += 'lastMouseClick != null && new Date().getTime() - lastMouseClick.timestamp.getTime() < 200 && !lastMouseClick.clicked && setMouseEvent(lastMouseClick)';
  } else {
    if (commandParams[1] == "Key") {
      let theKey = commandParams[3];
      if (commandParams[4] != null && commandParams[4].startsWith('arr')) {
        theKey = commandParams[3] + ' ' + commandParams[4];
      }

      if (!(theKey == "space") && !(theKey == "any")) {
        value +=
          `lastKeyPress != null &&  new Date().getTime()  -  lastKeyPress.timestamp.getTime() <  200 && lastKeyPress.code == '${theKey}' && !lastKeyPress.pressed && setKeyEvent(lastKeyPress)`;
      } else if (theKey == "space") {
        value +=
          'lastKeyPress != null && new Date().getTime()  -  lastKeyPress.timestamp.getTime() <  200 && lastKeyPress.code == "space" && !lastKeyPress.pressed && setKeyEvent(lastKeyPress)';
      } else if (theKey == "any") {
        value +=
          'lastKeyPress != null && new Date().getTime()  -  lastKeyPress.timestamp.getTime() <  200 && !lastKeyPress.pressed &&  setKeyEvent(lastKeyPress)';
      }
    } else {
      if (commandParams[1].startsWith('Touching')) {
        value += `areColliding(avatar, apple) && apple.color === "${commandParams[3]}"`
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
  }
  value += ' )';

  return value;
}


function setKeyEvent(keyObject) {
  console.log(keyObject);
  keyObject.pressed = true;
  return true;
}

function setMouseEvent(mouseObject) {
  mouseObject.clicked = true;
  return true;
}

function areColliding(mc1, mc2) {

  m1x = mc1.x;
  m1y = mc1.y;
  m1bounds = mc1.getBounds();
  m1w = m1bounds.width;
  m1h = m1bounds.height;

  m2x = mc2.x;
  m2y = mc2.y;
  m2bounds = mc2.getBounds();
  m2w = m2bounds.width;
  m2h = m2bounds.height;
  if (m1x >= m2x + m2w
    || m1x + m1w <= m2x
    || m1y >= m2y + m2h
    || m1y + m1h <= m2y) {
    return false;
  } else {
    return true;
  }
}