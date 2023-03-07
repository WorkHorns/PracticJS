    require('es6-promise').polyfill(); //подключение поливил
    import 'nodelist-foreach-polyfill';
    
    import timer from './modules/timer';
    import tabs from './modules/tabs';
    import menu from './modules/menu';
    import calculate from './modules/calculate';
    import form from './modules/form';
    import modalWindow from './modules/modalWindow';
    import slider from './modules/slider';
    import {openModal} from './modules/modalWindow';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(()=> openModal('.modal', modalTimerID), 30000);

    timer('.timer', '2023-05-15');
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    menu();
    calculate();
    form('form', modalTimerID);
    modalWindow('[data-modal]','.modal', modalTimerID);
    //С помощью деструктуризации
    slider({
        conteiner:      '.offer__slider',
        slide:          '.offer__slide',
        nextArrow:      '.offer__slider-next',
        prevArrew:      '.offer__slider-prev',
        totalCounter:   '#total',
        currentCouner:  '#current',
        wrapper:        '.offer__slider-wrapper',
        field:          '.offer__slider-inner'
    });
});