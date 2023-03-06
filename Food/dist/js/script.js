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

       //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'OK',
        fail: 'Fail'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url , {
            method: 'POST',
               headers: {
                'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;           
            `;
            form.append(statusMessage);

            //Предвача данных через XML
            // const request = new XMLHttpRequest(); 
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
           
            // const obj = {};
            // formData.forEach(function(value, key){
            //     obj[key] = value;
            // });
            
            postData('http://localhost:3000/requests', json)
            .then(data =>{
                console.log(data)
                showThanksModalWindow(message.success);
                statusMessage.remove();
            }).catch(()=> {
                showThanksModalWindow(message.fail);
            }).finally(()=>{
                form.reset();
            });


            // request.addEventListener('load', ()=> {
            //     if(request.status === 200) {
            //         // statusMessage.textContent = message.success; //Старое оповещение
            //         showThanksModalWindow(message.success);
            //         form.reset();
            //         statusMessage.remove()
            //     }
            //     else {
            //         // statusMessage.textContent = message.fail; // старое оповещение
            //         showThanksModalWindow(message.fail);
            //     }
            // })
        });
    };

    function showThanksModalWindow(message)
    {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },3000)
    };
        

    
    // //база с меню
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

//     const result = document.querySelector('.calculating__result span');
//     let sex, height, weight, age, ratio;

// function calcTotal(){
//     if(!sex || !height || !weight || !age || !ratio ){
//         result.textContent = '____';
//         return;
//     }

//     if(sex === 'female') {
//         result.textContent = (447.6 + (9.2 * weight ) + (3.1 * height) - (4.3 * age)) * ratio;
//     } else {
//         result.textContent = (88.36 + (13.4 * weight ) + (4.8 * height) - (5.7 * age)) * ratio;
//     }
// }

// calcTotal();
// getStaticInformation('#gender','calculating__choose-item_active');
// getStaticInformation('.calculating__choose_big','calculating__choose-item_active');

// function getStaticInformation(parentSelector, activeClass){
//     const elements = document.querySelectorAll(`${parentSelector} div`);

//     document.querySelector(parentSelector).addEventListener('click', (event)=>{
//         if(event.target.getAttribute('data-ratio')) {
//             ratio = +elements.target.getAttribute('data-ratio');
//         } else {
//             sex = event.target.getAttribute('id');
//         }

//         console.log(ratio,sex);

//         elements.forEach(element =>{
//             element.classList.remove(activeClass);
//         });

//         event.target.classList.add(activeClass);

//     });

    
// }
    
});
