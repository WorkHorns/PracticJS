const personalMovie = 
{
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function()
    {
        personalMovie.count = +prompt('Сколько фильмов вы уже посмотрели?','');
        while (personalMovie.count == '' || personalMovie.count == null || isNaN(personalMovie.count))
        {
            personalMovie.count = +prompt('Сколько фильмов вы уже посмотрели?','');
        }
    },

    genres: function writeYourGenres(_personalMovie){
        for (let i = 1; i <= 3; i++){
          let genre = prompt(`Какой жанр вам нравится? ${i}?`);
            _personalMovie.genres.push(genre)
        }
        return _personalMovie
    },

    privat: function showMyDB(_personalMovie) {
        if (_personalMovie.privat === false) {
          console.log(_personalMovie);
        }
      }

};





function rememberMyFilm()
{
    for(i=0; i<2; i++)
    {
    const   a = prompt('Какой из последний фильмов вы смотрели?',''),
    b = prompt('На сколько вы его оценили?','')
    
    if(a != null && b != null && a != '' && b != '' && a.length <= 10)
    {
        console.log("ok")
        personalMovie.movies[a] = b;
        i++;
    }
    else 
    console.log("error")
    i--;
    }
}

function howManyFilms
{

    if(personalMovie.count < 10)
    {
        console.log("Мало.")
    }
    else if(personalMovie.count >= 10 && personalMovie.count < 30)
    {
        console.log("Киноман.")
    }
    else if (personalMovie.count >= 30)
    {
        console.log("Ошибка")
    }
}
    
