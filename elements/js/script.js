'use strict';
// По играть со стилями, поиграть с формами
const box = document.getElementById('box'),
        btns = document.getElementsByTagName('button'),
        circles = document.getElementsByClassName('circle'),
        allHearts = document.querySelectorAll('.heart'),
        oneHeart = document.querySelector('.heart'),
        wrapper = document.querySelector('.wrapper');
        

console.log(box);
console.log(btns[4]);
console.log(circles);
console.log(allHearts);
allHearts.forEach(item => 
{
    console.log(item);
});
console.log(oneHeart);

// box.style.backgroundColor = 'blue';
// box.style.width = '30px';
box.style.cssText = 'background-color: blue; width: 500px';
btns[1].style.borderRadius = '30%';
circles[0].style.backgroundColor = 'black';

// for(let i = 0; i < allHeart.length; i++)
// {
//     allHeart[i].style.backgroundColor = 'yellow';
// }

allHearts.forEach(item => 
{
    item.style.backgroundColor = 'orange';
});

const a = document.createElement('div');

a.classList.add('black');
// document.body.append(a); //Вставляем эелемент в конце body
// wrapper.append(a); //Вставляем элемент после
wrapper.prepend(a); //Вставляем элемент до

allHearts[0].after(a); //Вставляем элемент после первого элемента массива
// allHearts[0].before(a); //Вставляем элемент перед первым элементом массива
// circles[0].remove(); //Удаление элемента по номеру массива
// allHearts[2].replaceWith(circles[0]); //Перемещение и замена элемента  
a.innerHTML = 'Hi'; //Можно добавлять HTML структуру или текст
// a.textContent = 'Hello'; //Добавление только Текста
a.insertAdjacentHTML('beforebegin','<h2>Hello</h2>'); //Вставление HTML элементов