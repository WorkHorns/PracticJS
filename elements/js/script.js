'use strict';
// По играть со стилями, поиграть с формами
const a = document.getElementById('box');
console.log(a);

const b = document.getElementsByTagName('button');
console.log(b[4]);

const c = document.getElementsByClassName('circle');
console.log(c);

const q = document.querySelectorAll('.heart');
console.log(q);

q.forEach(item => {
    console.log(item);
});

const qq = document.querySelector('.heart');
console.log(qq);

const qw = document.querySelector('div');
console.log(qw);

    
