var canvas = document.querySelector('#demoCanvas');
fitToContainer(canvas);

function fitToContainer(canvas){
    console.log("Executing")
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', fitToContainer(canvas));
