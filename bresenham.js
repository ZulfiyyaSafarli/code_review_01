/*
    Code sample for CSCI 2408 Computer Graphics 
    (c)2022-24 by Araz Yusubov 
    DISCLAIMER: All code examples we will look at are quick hacks intended to present working prototypes.
    Hence they do not follow best practice of programming or software engineering.    
*/
var canvas;
var context;
window.onload = init;
var GRID_SIZE = 30;
var GRID_COLOR = "grey";
var LINE_COLOR = "red";
//Coordinates of the line to draw
var lineX0, lineY0;
var lineX1, lineY1;

//Remember if you are to draw a line or mark the start point
var startNewLine = false; 

function init() {
    // Get reference to the 2d context of the canvas
    canvas = document.getElementById("gl-canvas");
    context = canvas.getContext("2d");

    if (context) {
        console.log("Context created");
        drawGrid();
        // set a listener for the mouse down event
        canvas.onclick = onClick;
    }
}
function onClick(event) {
    startNewLine = !startNewLine;
    // Get the coordinates of the mouse click witin the canvas
    rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;

    // console.log(x, ':', y);

    // Calculate the coordinates within the grid
    x = Math.floor(x / GRID_SIZE);
    y = Math.floor(y / GRID_SIZE);

    if (startNewLine) {
        // draw the first pixel
        lineX0 = x;
        lineY0 = y;
        drawPixel(lineX0, lineY0);
    } else {
        // draw the line to the second pixel
        lineX1 = x;
        lineY1 = y;
        drawBresenham();
    }

}

function drawPixel(x, y) {
    context.fillStyle = LINE_COLOR;
    x = x * GRID_SIZE;
    y = y * GRID_SIZE;
    context.fillRect(x, y, GRID_SIZE, GRID_SIZE);
}

function drawBresenham() {
    x = lineX0;
    y = lineY0;
    dx = lineX1 - lineX0;
    dy = lineY1 - lineY0;

    d = dx;
    while(x <= lineX1) {
        drawPixel(x, y);
        x = x + 1;
        d = d - 2*dy;
        // check if we need to move to the next line
        if (d < 0) {
            y = y + 1;
            d = d + 2*dx;
        }
    }
}
function drawLine(x0, y0, x1, y1) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
}


function drawGrid() {
    //Set the line styles
    context.strokeStyle = GRID_COLOR;
    context.lineWidth = 1;

    //Draw the vertical lines
    x = 0;
    while (x < canvas.clientWidth) {
        drawLine(x, 0, x, canvas.clientHeight);
        x += GRID_SIZE;
    }

    //Draw the horizontal lines
    y = 0;
    while (y < canvas.clientHeight) {
        drawLine(0, y, canvas.clientWidth, y);
        y += GRID_SIZE;
    }
}