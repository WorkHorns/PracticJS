//Функция закрития модального окна
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.toggle('show');
    document.body.style.overflow = '';
};
 //Функция открытия модального окна
function openModal(modalSelector, modalTimerID)  {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    if(modalTimerID) {
        clearInterval(modalTimerID);
    }
};


function modalWindow(triggerSelector, modalSelector, modalTimerID) {

    //Модальное окно
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    //тригер открытия модального окна
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    });

    //Закрытие модального окна на свободное пространство
    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == '')
        {
            closeModal(modalSelector, modalTimerID);
        }
    });

    //Закрытие модального окна на "ESC"
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show'))
        {
            closeModal(modalSelector,modalTimerID);
        }
    });
    
    //Модальное окно при достижения конца страницы
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
        {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

export default modalWindow;
export {closeModal};
export {openModal};