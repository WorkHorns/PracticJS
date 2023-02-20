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

    genres: function writeYourGenres()
    {
        for (let i = 1; i <= 3; i++){
          let genre = prompt(`Какой жанр вам нравится? ${i}?`);
            personalMovie.genres.push(genre)
        }
        return personalMovie
    },

    privat: function showMyDB() 
    {
        if (personalMovie.privat === false) {
          console.log(personalMovie);
        }
    },

    movies: function rememberMyFilm()
    {
        for(i=0; i<2; i++)
        {
            const   a = prompt('Какой последний фильмов вы смотрели?',''),
                b = prompt('Как вы его оценили? По 5 бальной шкале.','')
    
            if(a != null && b != null && a != '' && b != '' && a.length <= 10)
            {
                console.log("ok")
                personalMovie.movies[a] = b;
            }
            else 
            {
                console.log("error")
                i--;
            }
        }
    }
};





