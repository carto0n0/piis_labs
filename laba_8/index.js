const circleBtn = document.getElementById("circleBtn");
const rectBtn = document.getElementById("rectBtn");
const canvas = document.getElementById("drawingArea");
const context = canvas.getContext("2d");

let startX, startY;
let r = 0;
let isDrawing = false;
let savedCanvas = context.getImageData(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", (e) => {
    if (circleBtn.checked || rectBtn.checked) isDrawing = true;

    if (isDrawing && context) {
            startX = e.offsetX;
            startY = e.offsetY;
        }
    }
)

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        if (savedCanvas) {
            context.putImageData(savedCanvas, 0, 0);
        }

        if (circleBtn.checked) {
            let r = Math.sqrt((e.offsetX - startX) ** 2 + (e.offsetY - startY) ** 2);

            context.beginPath();
            context.arc(startX, startY, r, 0, 2 * Math.PI);
            context.stroke();
        }
        else if (rectBtn.checked) {
            context.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY)
        }
    }

})
canvas.addEventListener("mouseup", (e) => {
    context.closePath();
    savedCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
    isDrawing = false;
})