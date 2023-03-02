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
    
    //Время акции
    const deadLine = '2023-03-28';
    //подсчет оставшегося времени
    function getTimeRemaining(endTime)
    {
        const t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                        minutes = Math.floor((t / 1000 / 60) % 60),
                            seconds = Math.floor((t / 1000) % 60);

        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds  
        };
    }
    
    //функция подставноки 0 к дням, часам, минутам, секундам если осталось меньше 10
    function getZero(num)
    {
        if(num >= 0 && num < 10)
        return `0${num}`;
        else {
            return num;
        }
    }

    function setClock(selector, endTime)
    {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000)

        updateClock();
        //Обновление времени
        function updateClock() 
        {
            const t = getTimeRemaining(endTime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.total <= 0)
                {
                    clearInterval( timeInterval);
                }
        }

    }

    setClock('.timer', deadLine);

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

        //Класс
        class MenuCard
        {
            constructor(src, alt, title, descr, price, parentSelector, ...classes)
            {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH()
            {
                this.price *= this.transfer;
            }

            render()
            {
                const element = document.createElement('div');

                if(this.classes.length === 0)
                {
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                }
                else
                {
                    this.classes.forEach(className => element.classList.add(className));
                }

                element.innerHTML = 
                        `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                        `;

                    this.parent.append(element);
            }
        }
        //класс с дефолтным классом меню
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            '.menu .container',
        ).render();
        //класс с прописанным классом меню
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            10,
            '.menu .container',
            'menu__item',
            'big'
        ).render();
        //класс с прописанным классом меню
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            11,
            '.menu .container',
            'menu__item',
            'big'
        ).render();
            //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Load',
        success: 'OK',
        fail: 'Fail'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const obj = {};

            formData.forEach(function(value, key){
                obj[key] = value;
            });

            request.send(JSON.stringify(obj));

            request.addEventListener('load', ()=> {
                if(request.status === 200) {
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() =>{
                        statusMessage.remove();
                    },3000);
                }
                else {
                    statusMessage.textContent = message.fail;
                    form.reset();
                }
            })
        });
    };

});
