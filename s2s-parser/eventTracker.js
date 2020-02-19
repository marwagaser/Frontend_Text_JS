let lastKeyPress = {};
let lastMouseClick = {};
let mousePosition = {};
document.onmousemove = mouseMoveHandler;

document.addEventListener("keydown", event => {
    let c = '';
    if (event.code.startsWith('Digit')) {
        c = event.code.charAt((event.code.length - 1)).toLowerCase();
    }
    else {
        if (event.code.startsWith('Arrow')) {
            c = (event.code.split(/(?=[A-Z])/)[1] + ' ' + event.code.split(/(?=[A-Z])/)[0]).toLowerCase();
        } else {

            if (event.code.startsWith('Key')) {
                c = event.code.split(/(?=[A-Z])/)[1].toLowerCase();
            } else {

                if (event.code.startsWith('Space')) {
                    c = event.code.toLowerCase();
                } else {
                    c = event.code;
                }
            }
        }
    }

    lastKeyPress = {
        code: c,
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
