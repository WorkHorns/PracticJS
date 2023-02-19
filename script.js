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
// let i = 0;
// while(i<2)
// {
//     const   a = prompt('Какой из последний фильмов вы смотрели?',''),
//             b = prompt('На сколько вы его оценили?','')
    
//     if(a != null && b != null && a != ' ' && b != ' ' && a.length <= 50)
//     {
//          console.log("ok")
//         personalMovie.movies[a] = b;
        
//     }
//     else 
//     {
//         console.log("error")
//         i--;
//     }
//      i++;
// }

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
console.log(personalMovie);
