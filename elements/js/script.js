'use strict';
// По играть со стилями, поиграть с формами
const box = document.getElementById('box'),
        btns = document.getElementsByTagName('button'),
        circles = document.getElementsByClassName('circle'),
        allHeart = document.querySelectorAll('.heart'),
        oneHeart = document.querySelector('.heart'),
        wrapper = document.querySelector('.wrapper');

console.log(box);
console.log(btns[4]);
console.log(circles);
console.log(allHeart);
allHeart.forEach(item => 
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

allHeart.forEach(item => 
{
    item.style.backgroundColor = 'orange';
});

const a = document.createElement('div');

a.classList.add('black');
// document.body.append(a);
wrapper.append(a);
wrapper.prepend(a);

    
