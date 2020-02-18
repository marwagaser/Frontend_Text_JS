class ScratchParser {
  constructor(projectSyntax) {
    this.projectSyntax = projectSyntax;
    this.blocks = this.projectSyntax.targets[1].blocks;
    this.substacks = [];
    // Get the root block
    for (let key of Object.keys(this.blocks)) {
      if (this.blocks[key].parent == null) {
        this.rootBlock = this.blocks[key];
        break;
      }
    }
  }

  get syntax() {
    return this.parseBlocks();
  }

  static parseSyntax(syntax) {
    const lines = syntax.split("\n");
    const root = new TreeNode("root", null);
    let currentNode = root;
    for (let line of lines) {
      const tokens = line.split(" ");
      switch (tokens[0]) {
        case "MOVE":
          currentNode.addChild(
            new TreeNode("move", currentNode, parseInt(tokens[1]))
          );
          break;
        case "TURN":
          currentNode.addChild(
            new TreeNode("turn", currentNode, parseInt(tokens[1]))
          );
          break;
        case "POINT":
          currentNode.addChild(
            new TreeNode("point", currentNode, parseInt(tokens[1]))
          );
          break;
      }
    }
  }

  parseBlocks() {
    let syntax = "";
    let currentBlock = this.rootBlock;
    while (this.substacks.length > 0 || currentBlock !== null) {
      if (currentBlock == null) {
        let currentToken = this.substacks.pop();
        if (currentToken) {
          if (
            currentToken === "ELSE\n" ||
            currentToken === "BEGIN\n" ||
            currentToken === "END\n"
          ) {
            syntax += currentToken;
            continue;
          } else {
            currentBlock = this.blocks[currentToken];
          }
        } else {
          currentBlock = null;
        }
      } else {
        switch (currentBlock.opcode) {
          case "control_repeat":
            syntax += parsePrimitiveBlock(currentBlock);
            if (currentBlock.next) {
              this.substacks.push(
                currentBlock.next,
                "END",
                currentBlock.inputs.SUBSTACK[1],
                "BEGIN\n"
              );
            } else {
              this.substacks.push(
                "END\n",
                currentBlock.inputs.SUBSTACK[1],
                "BEGIN\n"
              );
            }

            currentBlock = null;
            break;
          case "control_if":
          case "control_if_else":
            if (currentBlock.opcode == "control_if") {
              if (currentBlock.next) {
                this.substacks.push(
                  currentBlock.next,
                  "END\n",
                  currentBlock.inputs.SUBSTACK[1],
                  "BEGIN\n"
                );
              } else {
                this.substacks.push(
                  "END\n",
                  currentBlock.inputs.SUBSTACK[1],
                  "BEGIN\n"
                );
              }
            } else if (currentBlock.next) {
              this.substacks.push(
                currentBlock.next,
                "END\n",
                currentBlock.inputs.SUBSTACK2[1],
                "BEGIN\n",
                "ELSE\n",
                "END\n",
                currentBlock.inputs.SUBSTACK[1],
                "BEGIN\n"
              );
            } else {
              this.substacks.push(
                "END\n",
                currentBlock.inputs.SUBSTACK2[1],
                "BEGIN\n",
                "ELSE\n",
                "END\n",
                currentBlock.inputs.SUBSTACK[1],
                "BEGIN\n"
              );
            }
            const conditionBlock = this.blocks[
              currentBlock.inputs.CONDITION[1]
            ];
            syntax += "IF " + this.parseCondition(conditionBlock);
            currentBlock = null;
            break;
          default:
            syntax += this.parsePrimitiveBlock(currentBlock);
            currentBlock = this.blocks[currentBlock.next];
            break;
        }
      }
    }
    return syntax;
  }
}

ScratchParser.prototype.parsePrimitiveBlock = parsePrimitiveBlock;
ScratchParser.prototype.parseCondition = parseCondition;