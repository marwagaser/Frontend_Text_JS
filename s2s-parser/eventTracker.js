let lastKeyPress = {};
let lastMouseClick = {};
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

