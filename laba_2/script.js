const table = document.querySelector('table');
const button = document.querySelector('button');

let personalMovieDB = {
  privat: false,
  movies: {
    'Карты, деньги, два ствола': '8.6',
    'Большой куш': '8.6',
    'Рок-н-рольщик': '7.8',
  },
};

const showMovies = () => {
  const tableHeader = document.createElement('tr');
  const column1 = document.createElement('th');
  column1.textContent = 'Название фильма';
  const column2 = document.createElement('th');
  column2.textContent = 'Оценка';

  tableHeader.appendChild(column1);
  tableHeader.appendChild(column2);
  table.appendChild(tableHeader);

  for (let movie in personalMovieDB.movies) {
    const row = document.createElement('tr');
    const movieName = document.createElement('td');
    movieName.textContent = movie;
    const rating = document.createElement('td');
    rating.textContent = personalMovieDB.movies[movie];

    row.appendChild(movieName);
    row.appendChild(rating);
    table.appendChild(row);
  }
}

showMovies();