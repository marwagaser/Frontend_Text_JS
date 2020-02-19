const acceptedDirections = [90, 180, 0, 360];
const parsePrimitiveBlock = block => {
  let result = "";
  switch (block.opcode) {
    case "event_whenflagclicked":
      result += "IFGREENFLAGCLICKED\n";
      break;
    case "event_whenkeypressed":
      result += "IF " + block.fields.KEY_OPTION[0] + " PRESSED\n";
      break;
    case "motion_movesteps":
      result += "MOVE " + block.inputs.STEPS[1][1] + "\n";
      break;
    case "motion_pointindirection":
      if (
        !acceptedDirections.includes(parseInt(block.inputs.DIRECTION[1][1]))
      ) {
        throw "An unsupported point direction was detected";
      }
      result += "POINT " + block.inputs.DIRECTION[1][1] + "\n";
      break;
    case "motion_turnright":
      result += "TURN " + block.inputs.DEGREES[1][1] + "\n";
      break;
    case "motion_turnleft":
      result += "TURN " + block.inputs.DEGREES[1][1] * -1 + "\n";
      break;
    case "control_repeat":
      result += "REPEAT " + block.inputs.TIMES[1][1] + "\n";
      break;
    case "motion_gotoxy":
      result +=
        "Go TO " + block.inputs.X[1][1] + " " + block.inputs.Y[1][1] + "\n";
      break;
    case "motion_changexby":
      result += "CHANGE X " + block.inputs.DX[1][1] + "\n";
      break;
    case "motion_setx":
      result += "SET X " + block.inputs.X[1][1] + "\n";
      break;
    case "motion_changeyby":
      result += "CHANGE Y " + block.inputs.DY[1][1] + "\n";
      break;
    case "motion_sety":
      result += "SET Y " + block.inputs.Y[1][1] + "\n";
      break;
    default:
      result += block.opcode + "\n";
      break;
  }
  return result;
};
