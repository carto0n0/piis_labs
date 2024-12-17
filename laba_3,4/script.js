// Импортируем массив с информацией о футболках из файла shirts.js
import shirts from './shirts.js';

// Получаем ссылки на элементы из DOM: обертку страницы и список футболок
const wrapper = document.querySelector('.wrapper');
const list = document.querySelector('.shirts__list');

// Функция для прокрутки страницы к блоку просмотра футболки
const scroll = () => {
  const viewBlock = document.querySelector('.viewBlock');
  viewBlock.scrollIntoView({
    behavior: 'smooth' // Плавная прокрутка
  });
}

// Функция для удаления блока просмотра футболки
const clearViewBlock = () => {
  const viewBlock = document.querySelector('.viewBlock');
  viewBlock.remove(); // Удаление элемента из DOM
}

// Функция для установки изображения с fallback на изображение по умолчанию, если не удается загрузить основное
const setImage = (element, src, src_default) => {
  element.src = src; // Устанавливаем основной источник изображения
  element.onerror = () => { // Если произойдет ошибка загрузки
    img.src = src_default; // Загружаем изображение по умолчанию
    console.log('Ошибка: картинка не найдена, загружена картинка по умолчанию.');
  };
}

// Функция для отображения подробной информации о выбранной футболке
const displayView = (item) => {
  const findViewBlock = document.querySelector('.viewBlock');
  
  // Если блок уже есть на странице, обновляем его содержимое
  if (findViewBlock) {
    const img_front = document.querySelector('.imgFront');
    const img_back = document.querySelector('.imgBack');
    const title = document.querySelector('.viewBlock__title');
    const cost = document.querySelector('.viewBlock__cost');
    
    // Обновляем изображения и текст
    setImage(img_front, item.colors.white.front, item.default.front);
    setImage(img_back, item.colors.white.back, item.default.back);
    title.textContent = item.name;
    cost.textContent = item.price;
    scroll(); // Прокручиваем страницу к блоку
    return;
  }

  // Если блок отсутствует, создаем его
  const viewBlock = document.createElement('div');
  viewBlock.className = 'viewBlock';

  const viewBlockWrapper = document.createElement('div');
  viewBlockWrapper.className = 'viewBlock__wrapper wrapper';

  // Создаем контейнер для изображений
  const images = document.createElement('div');
  images.className = 'viewBlock__images';

  // Добавляем изображение спереди
  const img_front = document.createElement('img');
  img_front.className = 'viewBlock__image imgFront';
  setImage(img_front, item.colors.white.front, item.default.front);
  images.appendChild(img_front);

  // Добавляем изображение сзади
  const img_back = document.createElement('img');
  img_back.className = 'viewBlock__image imgBack';
  setImage(img_back, item.colors.white.back, item.default.back);
  images.appendChild(img_back);

  // Создаем контейнер для информации о товаре
  const info = document.createElement('div');
  info.className = 'viewBlock__info';

  // Заголовок с названием футболки
  const title = document.createElement('h2');
  title.className = 'viewBlock__title';
  title.textContent = item.name;
  info.appendChild(title);

  // Стоимость футболки
  const cost = document.createElement('p');
  cost.className = 'viewBlock__cost';
  cost.textContent = item.price;
  info.appendChild(cost);

  // Кнопка закрытия окна
  const btnClose = document.createElement('button');
  btnClose.className = 'viewBlock__btnClose';
  btnClose.textContent = 'Close';
  info.appendChild(btnClose);

  // Вкладываем все созданные элементы в блоки
  viewBlockWrapper.appendChild(images);
  viewBlockWrapper.appendChild(info);
  viewBlock.appendChild(viewBlockWrapper);
  
  // Вставляем созданный блок после обертки страницы
  wrapper.insertAdjacentElement('afterend', viewBlock);
  scroll(); // Прокручиваем к блоку

  // Добавляем обработчик для кнопки закрытия
  btnClose.addEventListener('click', clearViewBlock);
}

// Функция для создания карточки товара (футболки)
const createCard = (item) => {
  const card = document.createElement('div');
  card.className = 'shirts__item card';
  // Добавляем изображение футболки
  const img = document.createElement('img');
  img.className = 'card__image';
  setImage(img, item.colors.white.front, item.default.front)
  card.appendChild(img);

  // Создаем блок с информацией о футболке
  const info = document.createElement('div');
  info.className = 'card__info';

  // Название футболки
  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = item.name;
  info.appendChild(title);

  // Текст с количеством доступных цветов
  const text = document.createElement('p');
  text.className = 'card__text';
  const numColors = Object.keys(item.colors).length; // Определяем количество цветов
  text.textContent = Available in ${numColors} ${numColors === 1 ? 'color' : 'colors'};
  info.appendChild(text);

  // Блок с кнопками "Quick View" и "See Page"
  const buttons = document.createElement('div');
  buttons.className = 'card__buttons';

  const btnQuickView = document.createElement('button');
  btnQuickView.className = 'card__button btnQuickView';
  btnQuickView.textContent = 'Quick View';

  const btnSeePage = document.createElement('button');
  btnSeePage.className = 'card__button btnSeePage';
  btnSeePage.textContent = 'See Page';

  buttons.appendChild(btnQuickView);
  buttons.appendChild(btnSeePage);
  info.appendChild(buttons);
  card.appendChild(info);
  list.appendChild(card);

  // Добавляем обработчик для кнопки "Quick View"
  btnQuickView.addEventListener('click', () => displayView(item));

  // Добавляем обработчик для кнопки "See Page"
  btnSeePage.addEventListener('click', () => {
    localStorage.setItem('item', JSON.stringify(item)); // Сохраняем данные о футболке в localStorage
    window.location.href = './detail.html'; // Переходим на страницу с подробностями
  });
}

// Функция для заполнения списка футболок
const fillList = () => {
  shirts.forEach(item => createCard(item)); // Для каждой футболки вызываем функцию createCard
}

// Заполняем список футболок при загрузке страницы
fillList();