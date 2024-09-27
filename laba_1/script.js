let numberOfFilms, lastMovie, rating;

while(!numberOfFilms || numberOfFilms < 1) {
  numberOfFilms = Number(prompt('Сколько фильмов вы уже посмотрели?', ''));
}

let personalMovieDB = {
  count: numberOfFilms,
  movies: {},
};

function fillMyMovies() {
  while(!lastMovie) {
    lastMovie = prompt('Один из последних просмотренных фильмов?', '');
  }
  while(!rating || rating < 0) {
    rating = Number(prompt('На сколько оцените его?', ''));
  }
  personalMovieDB.movies[lastMovie] = rating;
}

fillMyMovies();

console.log(personalMovieDB);

