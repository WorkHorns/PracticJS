//Перебор массива
const names = ['al','alexd','alasdd','ala','alsd'];
const shortNames = names.filter(function(name) {
    return name.length < 5;
});
console.log(names);
console.log(shortNames);

//Мапинг массива
let answer = ['dasdDs','ASDAD','asdaWW'];
answer = answer.map(item => item.toLocaleLowerCase());
console.log(answer);

//every/some проверка массива на соответствие.
const some = [4,'dasda','asdas'];
const some1 = [4, 1, 2];
console.log(some.some(item => typeof(item) === 'number'));
console.log(some1.some(item => typeof(item) === 'number'));
console.log(some.every(item => typeof(item) === 'number'));
console.log(some1.every(item => typeof(item) === 'number'));
   
//reduce 
const arr = [4,2,3,4,56];
const sum = arr.reduce((sum, current) => sum + current);
console.log(arr);
console.log(sum);

//entries /filter /map
const obj = {
    i: 'persone',
    a: 'persone',
    d: 'animal',
    w: 'animal'
};

const newArr = Object.entries(obj)
.filter(item => item[1] === 'persone')
.map(item => item[0]);

console.log(newArr);