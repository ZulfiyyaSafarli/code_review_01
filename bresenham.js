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
function init() {
    // Get reference to the 2d context of the canvas
    canvas = document.getElementById("gl-canvas");
    context = canvas.getContext("2d");

    if (context) {
        console.log("Context created");
        drawGrid();
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