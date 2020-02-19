let lastKeyPress = {};
let lastMouseClick = {};
let mousePosition = {};
document.onmousemove = mouseMoveHandler;
document.addEventListener("onkeydown", event => {
    lastKeyPress = {
        code : event.code,
        timestamp: new Date()
    }
});

document.addEventListener('mousedown', event => {
    lastMouseClick = {
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date()
    }
});

function mouseMoveHandler(event) {
    mousePosition = {
        x: event.pageX,
        y: event.pageY
    };
  };
