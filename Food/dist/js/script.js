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

    timer();
    tabs();
    menu();
    calculate();
    form('form', modalTimerID);
    modalWindow('[data-modal]','.modal', modalTimerID);
    slider();
});