// Получаем данные о футболке из localStorage, которые были сохранены при нажатии на кнопку "See Page"
const item = JSON.parse(localStorage.getItem('item'));

// Переменные для управления выбранной стороной футболки и её цветом
let sideShirt = 'front';
let colorShirt = 'white';

// Получаем ссылки на кнопки для отображения передней и задней сторон футболки
const btnFront = document.querySelector('.btnFront');
const btnBack = document.querySelector('.btnBack');

// Функция для установки изображения футболки
export const setImage = (element, item) => {
  // Устанавливаем изображение исходя из выбранного цвета и стороны
  element.src = item.colors[colorShirt][sideShirt];
  // Если изображение не загрузилось, заменяем его изображением по умолчанию
  element.onerror = () => {
    element.src = item.default[sideShirt]; // Фолбэк на изображение по умолчанию
    console.log('Ошибка: картинка не найдена, загружена картинка по умолчанию.');
  };
}

// Функция для отображения информации о футболке на странице
export const displayPage = () => {
  // Устанавливаем название футболки
  const title = document.querySelector('.page__title');
  title.textContent = item.name;

  // Устанавливаем изображение футболки (по умолчанию - передняя сторона, белый цвет)
  const image = document.querySelector('.page__image');
  setImage(image, item);
  
  // Устанавливаем цену футболки
  const cost = document.querySelector('.page__cost');
  cost.textContent = item.price;

  // Устанавливаем описание футболки
  const description = document.querySelector('.page__description');
  description.textContent = item.description;

  // Динамически создаем кнопки для выбора цветов футболки
  const colors = document.querySelector('.page__colors');
  for (let color in item.colors) {
    const btnColor = document.createElement('button');
    btnColor.className = page__button btnColor ${color}; // Добавляем класс с цветом
    btnColor.textContent = color; // Отображаем название цвета на кнопке
    
    // Устанавливаем цвет кнопки (в соответствии с цветом футболки)
    btnColor.style.backgroundColor = color;
    
    // Устанавливаем цвет текста на кнопке для светлых цветов (чтобы текст был видим)
    if (['white', 'pink', 'yellow'].includes(color)) btnColor.style.color = 'black';
    
    // Добавляем черную рамку для белой кнопки, чтобы она была видима
    if (color === 'white') btnColor.style.border = '1px solid black';

    // Добавляем кнопку в контейнер для цветов
    colors.appendChild(btnColor);

    // Обработчик события клика на кнопку, который меняет цвет футболки
    btnColor.addEventListener('click', () => {
      colorShirt = color; // Меняем выбранный цвет футболки
      setImage(image, item); // Обновляем изображение футболки
    });
  }
}

// Вызываем функцию для отображения страницы с данными о футболке
displayPage();

// Обработчик для кнопки "Front" (отображение передней стороны футболки)
btnFront.addEventListener('click', () => {
  sideShirt = 'front'; // Меняем сторону на "переднюю"
  const image = document.querySelector('.page__image');
  setImage(image, item); // Обновляем изображение
});

// Обработчик для кнопки "Back" (отображение задней стороны футболки)
btnBack.addEventListener('click', () => {
  sideShirt = 'back'; // Меняем сторону на "заднюю"
  const image = document.querySelector('.page__image');
  setImage(image, item); // Обновляем изображение
});