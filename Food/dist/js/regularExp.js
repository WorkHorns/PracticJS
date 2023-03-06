
// new RegExp('pattern', 'flag'); // старый метод
// /pattern/  //новое

const ans = prompt('Имя');

const reg = /n/ig;
// i - Найти что-то вне зависимости от регистра.
// g - Найти несколько вхождений.
// m - Многострочный режим.

console.log(ans.search(reg));
console.log(ans.match(reg));
console.log(ans.replace(/./g,'r'));
console.log(reg.test(ans));

// классы регулярных выражений:
// \d - ищим цифры
// \w - все буквы
// \s - все пробелы

console.log(ans.match(/\d/ig));

// Не числа:
// \D - не числа.
// \W - не буквы.
