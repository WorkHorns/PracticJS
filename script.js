const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?','');

const personalMovie = 
{
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: Boolean
};


for(i=0; i<2; i++)
{
    const   a = prompt('Какой из последний фильмов вы смотрели?',''),
            b = prompt('На сколько вы его оценили?','')
    
    if(a != null && b != null && a != ' ' && b != ' ' && a.length <= 50)
    {
        personalMovie.movies[a] = b;
    }
    else 
        i--;
}

console.log(personalMovie);
