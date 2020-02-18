function executeParsedText() {
  const text = document.querySelector("#parsed-text-area").value;
}

function executeScratchJSON() {
  const text = document.querySelector("#json-object-area").value;
  try {
    const projectSyntax = JSON.parse(text);
  } catch (e) {
    alert('could not parse invalid JSON');
    console.error(e);
  }
  const parser = new ScratchParser();
  console.log(parser.syntax);
}
