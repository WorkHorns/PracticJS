//Табы
window.addEventListener('DOMContentLoaded', 
() =>
{
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    //Скрытие не выбранных табов.
    function hiddeTabContent()
    {
        tabContent.forEach(item =>
        {
            item.classList.add('hide');
            item.classList.remove('show' , 'fade');
        });

        tabs.forEach(item => 
        {
            item.classList.remove('tabheader__item_active');
        });
    }

    //определения какой таб долженбыть показан.
    function showTabContent(i = 0)
    {
         tabContent[i].classList.add('show', 'fade');
         tabContent[i].classList.remove('hide');
         tabs[i].classList.add('tabheader__item_active');
    }
    
    tabsParent.addEventListener('click', (event) => 
    {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item'))
        {
            tabs.forEach((item, i) => 
            {
                if(target == item)
                {
                    hiddeTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hiddeTabContent();
    showTabContent();

    //Модальное окно
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        
        //Функция открытия модального окна
        function openModal()
        {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerID);
        };

        //Функция закрития модального окна
        function closeModal()
        {
            modal.classList.toggle('show');
            document.body.style.overflow = '';
        };

        //тригер открытия модального окна
        modalTrigger.forEach(btn => 
        {
            btn.addEventListener('click', openModal) 
        });

        //Закрытие модального окна на свободное пространство
        modal.addEventListener('click', (event) => 
        {
            if(event.target === modal || event.target.getAttribute('data-close') == '')
            {
                closeModal();
            }
        });

        //Закрытие модального окна на "ESC"
        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape' && modal.classList.contains('show'))
            {
                closeModal();
            }
        });

        const modalTimerID = setTimeout(openModal, 30000);
        
        //Модальное окно при достижения конца страницы
        function showModalByScroll(){
            
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
            {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        };

        window.addEventListener('scroll', showModalByScroll);

        
});
