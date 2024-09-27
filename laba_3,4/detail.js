const item = JSON.parse(localStorage.getItem('item'));
let sideShirt = 'front';
let colorShirt = 'white';

const btnFront = document.querySelector('.btnFront');
const btnBack = document.querySelector('.btnBack');

export const setImage = (element, item) => {
  element.src = item.colors[colorShirt][sideShirt];
  element.onerror = () => {
    element.src = item.default[sideShirt];
    console.log('Ошибка: картинка не найдена, загружена картинка по умолчанию.');
  };
}

export const displayPage = () => {
  const title = document.querySelector('.page__title');
  title.textContent = item.name;

  const image = document.querySelector('.page__image');
  setImage(image, item);
  
  const cost = document.querySelector('.page__cost');
  cost.textContent = item.price;

  const description = document.querySelector('.page__description');
  description.textContent = item.description;

  const colors = document.querySelector('.page__colors');
  for (let color in item.colors) {
    const btnColor = document.createElement('button');
    btnColor.className = `page__button btnColor ${color}`;
    btnColor.textContent = color;
    
    btnColor.style.backgroundColor = color;
    if (['white', 'pink', 'yellow'].includes(color)) btnColor.style.color = 'black';
    if (color === 'white') btnColor.style.border = '1px solid black';

    colors.appendChild(btnColor);

    btnColor.addEventListener('click', () => {
      colorShirt = color;
      setImage(image, item);
    });
  }
}

displayPage();

btnFront.addEventListener('click', () => {
  sideShirt = 'front';
  const image = document.querySelector('.page__image');
  setImage(image, item);
});

btnBack.addEventListener('click', () => {
  sideShirt = 'back';
  const image = document.querySelector('.page__image');
  setImage(image, item);
});
