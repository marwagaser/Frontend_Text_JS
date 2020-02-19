const parseOperand = function (operand) {
    let result = '';
    if (this.blocks.hasOwnProperty(operand[1])) {
        const operandBlock = this.blocks[operand[1]];
        switch (operandBlock.opcode) {
            case "motion_xposition":
                result += 'X Position ';
                break;
            case "motion_yposition":
                result += 'Y position ';
                break;
            case "sensing_mousex":
                result += "Mouse X ";
                break;
            case "sensing_mousey":
                result += "Mouse Y ";
                break;
        }
    } else {
        result += operand[1][1];
    }
    return result;
}

// Return an expression representing Operand1 Operator Operand2
// e.g. MouseX > MouseY
// or   PositionY = 50
const parseOperator = function (operatorBlock){
    let result = '';

    result += parseOperand.call(this, operatorBlock.inputs.OPERAND1);

    switch (operatorBlock.opcode) {
        case "operator_gt":
            result += '> ';
            break;
        case "operator_lt":
            result += '< ';
            break;
        case "operator_equals":
            result += '= ';
            break;
    }

    result += parseOperand.call(this, operatorBlock.inputs.OPERAND2) + '\n';
    return result;
}



const parseCondition = function (conditionBlock) {
    let result = '';
    // parse sensing condition
    switch (conditionBlock.opcode) {
        case "sensing_mousedown":
            result += "Mouse Down\n";
            break;
        case "sensing_touchingcolor":
            result += "Touching Color" + conditionBlock.inputs.COLOR[1][1] + "\n";
            break;
        case "sensing_keypressed":
            const keyOption = this.blocks[conditionBlock.inputs.KEY_OPTION[1]];
            result += "Key Press " + keyOption.fields.KEY_OPTION[0] + "\n";
            break;
    }
    // parse comparison conditions
    if (conditionBlock.opcode.startsWith("operator")) {
        result += parseS2sOperator.call(this, conditionBlock);
    }
    return result;
}