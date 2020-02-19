let lastKeyPress = {};
let lastMouseClick = {};
let mousePosition = {};
document.onmousemove = mouseMoveHandler;

document.addEventListener("keydown", async event => {
    if (s2sParser && s2sParser.keyTriggered && !s2sParser.started) {
        let code = transformKey(event);
        if (code === s2sParser.keyTriggered) {
            try {
                await executeSyntax(s2sParser.syntax);
            }
            catch (e) {
                s2sParser = null;
                console.log(e);
                alert(e);
            }
        }
    }
    else {
        lastKeyPress = {
            code: transformKey(event),
            timestamp: new Date(),
            pressed: false
        }
    }
});

document.addEventListener('mousedown', event => {
    lastMouseClick = {
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date(),
        clicked: false
    }
});

function mouseMoveHandler(event) {
    mousePosition = {
        x: event.pageX,
        y: event.pageY
    };
};


function transformKey(event) {
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
    return c;
}