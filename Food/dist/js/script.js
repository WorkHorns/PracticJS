window.addEventListener('DOMContentLoaded', () => {
    const   timer = require('./modules/timer'),
            tabs = require('./modules/tabs'),
            menu = require('./modules/menu'),
            slider = require('./modules/slider'),
            calculate = require('./modules/calculate'),
            modalWindow = require('./modules/modalWindow');


    timer();
    tabs();
    menu();
    slider();
    calculate();
    modalWindow();
});