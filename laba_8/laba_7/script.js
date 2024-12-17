const svg = document.querySelector('.drawingArea');
const inputs = document.querySelectorAll('input[name="shape"]');
const btnChangeColor = document.querySelector('.changeColor');
const colorDisplay = document.querySelector('.colorDisplay');

const colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E3C9FF", "#FFC9DE", "#C9F0FF", "#FFE1C6", "#D4FFEA", "#FFD1DC", "#E2F0CB", "#FDE1C7", "#B5EAD7", "#C7CEEA"];
let activeColor = colors[0];
let currentElement = null;
let isDrawing = false;
let shapeType = 'circle';
let startX = 0;
let startY = 0;

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


svg.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (shapeType === 'circle') {
    currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    currentElement.setAttribute('cx', startX);
    currentElement.setAttribute('cy', startY);
    currentElement.setAttribute('r', 0);
    currentElement.setAttribute('fill', activeColor);
  } else if (shapeType === 'rectangle') {
    currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    currentElement.setAttribute('x', startX);
    currentElement.setAttribute('y', startY);
    currentElement.setAttribute('width', 0);
    currentElement.setAttribute('height', 0);
    currentElement.setAttribute('fill', activeColor);
  }
  svg.appendChild(currentElement);
});

svg.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  const currentX = e.offsetX;
  const currentY = e.offsetY;

  if (shapeType === 'circle') {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    currentElement.setAttribute('r', radius);
  } else if (shapeType === 'rectangle') {
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    currentElement.setAttribute('width', width);
    currentElement.setAttribute('height', height);
    currentElement.setAttribute('x', Math.min(currentX, startX));
    currentElement.setAttribute('y', Math.min(currentY, startY));
  }
});

svg.addEventListener('mouseup', () => {
  isDrawing = false;
  currentElement = null;
});