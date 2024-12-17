const canvas = document.querySelector('.drawingArea');
const ctx = canvas.getContext('2d');
const inputs = document.querySelectorAll('input[name="shape"]');
const btnChangeColor = document.querySelector('.changeColor');
const colorDisplay = document.querySelector('.colorDisplay');

const colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E3C9FF", "#FFC9DE", "#C9F0FF", "#FFE1C6", "#D4FFEA", "#FFD1DC", "#E2F0CB", "#FDE1C7", "#B5EAD7", "#C7CEEA"];
let activeColor = colors[0];
let isDrawing = false;
let shapeType = 'circle';
let startX = 0;
let startY = 0;
let savedCanvas;

colorDisplay.style.backgroundColor = activeColor;

const getRandomColor = () => {
  const otherColors = colors.filter(value => value !== activeColor)
  const index = Math.floor(Math.random() * otherColors.length);
  return otherColors[index];
}

btnChangeColor.addEventListener('click', () => {
  const newColor = getRandomColor();
  activeColor = newColor;
  colorDisplay.style.backgroundColor = activeColor;
});

inputs.forEach(input => {
  input.addEventListener('change', (e) => {
    shapeType = e.target.value;
  });
});


canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  ctx.fillStyle = activeColor;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  const currentX = e.offsetX;
  const currentY = e.offsetY;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(savedCanvas, 0, 0);
  
  if (shapeType === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.fill();
  } else if (shapeType === 'rectangle') {
    ctx.fillRect(startX, startY, currentX - startX, currentY - startY);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath();
  savedCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
});