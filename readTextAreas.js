let s2sParser = null;

function executeScratchJSON() {
  const text = document.querySelector("#json-object-area").value;
  let projectSyntax = null;
  try {
    projectSyntax = JSON.parse(text);
  } catch (e) {
    alert('could not parse invalid JSON');
    console.error(e);
  }
  try {
    const scratchParser = new ScratchParser(projectSyntax);
    console.log(scratchParser.syntax);
    s2sParser = new S2sParser(scratchParser.syntax);
    if (s2sParser.flagTriggered) {
      const syntax = s2sParser.syntax;
      document.querySelector('#green-flag').addEventListener('click', () => executeSyntax(syntax));
    }
  } catch (e) {
    s2sParser = null;
    alert(e);
  }
}

function executeParsedText() {
  const text = document.querySelector("#parsed-text-area").value;
  try {
    s2sParser = new S2sParser(text);

    if (s2sParser.flagTriggered) {
      const syntax = s2sParser.syntax;
      document.querySelector('#green-flag').addEventListener('click', () => executeSyntax(syntax));
    }
  } catch (e) {
    s2sParser = null;
    console.log(e);
    alert(e);
  }

}


const executeSyntax = async (syntax) => {
  s2sParser.started = true;
  lastMouseClick = null;
  document.querySelector('#green-flag').disabled = true;
  const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
  const execute = new AsyncFunction(syntax);
  await execute();
  document.querySelector('#green-flag').disabled = false;
  s2sParser = null;
}