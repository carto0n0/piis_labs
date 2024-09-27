import shirts from './shirts.js';

const wrapper = document.querySelector('.wrapper');
const list = document.querySelector('.shirts__list');

const scroll = () => {
  const viewBlock = document.querySelector('.viewBlock');
  viewBlock.scrollIntoView({
    behavior: 'smooth'
  });
}

const clearViewBlock = () => {
  const viewBlock = document.querySelector('.viewBlock');
  viewBlock.remove();
}

const setImage = (element, src, src_default) => {
  element.src = src;
  element.onerror = () => {
    img.src = src_default;
    console.log('Ошибка: картинка не найдена, загружена картинка по умолчанию.');
  };
}

const displayView = (item) => {
  const findViewBlock = document.querySelector('.viewBlock');
  if (findViewBlock) {
    const img_front = document.querySelector('.imgFront');
    const img_back = document.querySelector('.imgBack');
    const title = document.querySelector('.viewBlock__title');
    const cost = document.querySelector('.viewBlock__cost');
    
    setImage(img_front, item.colors.white.front, item.default.front);
    setImage(img_back, item.colors.white.back, item.default.back);
    title.textContent = item.name;
    cost.textContent = item.price;
    scroll();
    return;
  }

  const viewBlock = document.createElement('div');
  viewBlock.className = 'viewBlock';

  const viewBlockWrapper = document.createElement('div');
  viewBlockWrapper.className = 'viewBlock__wrapper wrapper';

  const images = document.createElement('div');
  images.className = 'viewBlock__images';

  const img_front = document.createElement('img');
  img_front.className = 'viewBlock__image imgFront';
  setImage(img_front, item.colors.white.front, item.default.front);
  images.appendChild(img_front);

  const img_back = document.createElement('img');
  img_back.className = 'viewBlock__image imgBack';
  setImage(img_back, item.colors.white.back, item.default.back);
  images.appendChild(img_back);

  const info = document.createElement('div');
  info.className = 'viewBlock__info';

  const title = document.createElement('h2');
  title.className = 'viewBlock__title';
  title.textContent = item.name;
  info.appendChild(title);

  const cost = document.createElement('p');
  cost.className = 'viewBlock__cost';
  cost.textContent = item.price;
  info.appendChild(cost);

  const btnClose = document.createElement('button');
  btnClose.className = 'viewBlock__btnClose';
  btnClose.textContent = 'Close';
  info.appendChild(btnClose);

  viewBlockWrapper.appendChild(images);
  viewBlockWrapper.appendChild(info);
  viewBlock.appendChild(viewBlockWrapper);
  wrapper.insertAdjacentElement('afterend', viewBlock);
  scroll();

  btnClose.addEventListener('click', clearViewBlock);
}

const createCard = (item) => {
  const card = document.createElement('div');
  card.className = 'shirts__item card';

  const img = document.createElement('img');
  img.className = 'card__image';
  setImage(img, item.colors.white.front, item.default.front)
  card.appendChild(img);

  const info = document.createElement('div');
  info.className = 'card__info';

  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = item.name;
  info.appendChild(title);

  const text = document.createElement('p');
  text.className = 'card__text';
  const numColors = Object.keys(item.colors).length;
  text.textContent = `Available in ${numColors} ${numColors === 1 ? 'color' : 'colors'}`;
  info.appendChild(text);

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

  btnQuickView.addEventListener('click', () => displayView(item));
  btnSeePage.addEventListener('click', () => {
    localStorage.setItem('item', JSON.stringify(item));
    window.location.href = './detail.html';
  });
}

const fillList = () => {
  shirts.forEach(item => createCard(item));
}

fillList();