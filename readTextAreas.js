

function executeScratchJSON() {
  const text = document.querySelector("#json-object-area").value;
  let projectSyntax = null;
  try {
    projectSyntax = JSON.parse(text);
  } catch (e) {
    alert('could not parse invalid JSON');
    console.error(e);
  }
  try{
    const scratchParser = new ScratchParser(projectSyntax);
    const s2sParser = new S2sParser(scratchParser.syntax);
    const syntax = s2sParser.syntax;
    if(s2sParser.flagTriggered){
      document.querySelector('#green-flag').addEventListener('click', () => {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const execute = new AsyncFunction(syntax);
        execute();
      });
    }
  }catch(e){
    alert(e);
  }
}

function executeParsedText() {
  const text = document.querySelector("#parsed-text-area").value;
  console.log(text);
  try{
    const s2sParser = new S2sParser(text);
    const syntax = s2sParser.syntax; 
    console.log(syntax);
    if(s2sParser.flagTriggered){
      document.querySelector('#green-flag').addEventListener('click', () =>  {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const execute = new AsyncFunction(syntax);
        execute();
      } );
    }
  }catch(e){
    console.log(e);
    alert(e);
  }
  
}