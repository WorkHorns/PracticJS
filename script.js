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

    writeYourGenres: function()
    {
        for (let i = 1; i <= 3; i++)
        {
            let genre = prompt(`Какой жанр вам нравится ${i}?`);

            if(genre ==='' || genre == null)
            {
                console.log('Ошибка');
                i--;
            }
            else
            {
                personalMovie.genres[i - 1] = genre;
            }

            console.log(`Ваш любимый жанр под номером ${i} это ${genre}`)
        }
    },

    showMyDB: function() 
    {
        if (this.privat == false) 
        {
            console.log(personalMovie);
        }
        else
        {
            console.log('База данных закрыта.');
        }
    },

    rememberMyFilm: function()
    {
        for(i=0; i<2; i++)
        {
            const   a = prompt('Какой последний фильмов вы смотрели?',''),
                b = prompt('Как вы его оценили? По 5 бальной шкале.','')
    
            if(a != null && b != null && a != '' && b != '' && a.length <= 50)
            {
                console.log('Данные внесены')
                personalMovie.movies[a] = b;
            }
            else 
            {
                console.log('Ошибка')
                i--;
            }
        }
    },

    toggleVisibleMyDB: function()
    {
        if(personalMovie.privat)
        {
            personalMovie.privat = false;
        }
        else
        {
            personalMovie.privat = true;
        }

    }
};





