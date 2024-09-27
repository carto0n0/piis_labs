const circleBtn = document.getElementById("circleBtn");
const rectBtn = document.getElementById("rectBtn");
const drawingArea = document.getElementById("drawingArea");

let startX, startY;
let r = 0;
let figure;
let isDrawing = false;

drawingArea.addEventListener("mousedown", (e) => {
    if (circleBtn.checked || rectBtn.checked) isDrawing = true;

    if (isDrawing) {
        startX = e.offsetX;
        startY = e.offsetY;

        if (circleBtn.checked) {
            figure = document.createElementNS("http://www.w3.org/2000/svg", "circle");;
            figure.setAttribute("cx", startX)
            figure.setAttribute("cy", startY)
            figure.setAttribute("r", 0);
            figure.setAttribute("stroke", "black");
            figure.setAttribute("fill", "transparent");
            drawingArea.appendChild(figure);
        }
        else if (rectBtn.checked) {
            figure = document.createElementNS("http://www.w3.org/2000/svg", "rect");;
            figure.setAttribute("x", startX)
            figure.setAttribute("y", startY)
            figure.setAttribute("stroke", "black");
            figure.setAttribute("fill", "transparent");
            drawingArea.appendChild(figure);
        }
    }

})
drawingArea.addEventListener("mousemove", (e) => {
    if (isDrawing) {

        if (circleBtn.checked) {
            let r = Math.round(Math.sqrt((e.offsetX - startX) ** 2 + (e.offsetY - startY) ** 2));
            figure.setAttribute("r", r)
        }
        else if (rectBtn.checked) {
            if (e.offsetX - startX < 0) 
                figure.setAttribute("x", e.offsetX)
            
            if (e.offsetY - startY < 0) 
                figure.setAttribute("y", e.offsetY)
            
            figure.setAttribute("width", Math.abs(e.offsetX - startX));
            figure.setAttribute("height", Math.abs(e.offsetY - startY));
        }
    }

})
drawingArea.addEventListener("mouseup", (e) => {
    isDrawing = false
})
