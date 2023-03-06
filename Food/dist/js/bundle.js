/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((module) => {

function calculate(){

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

        //Калькулятор
        function calcTotal() {
            //Условие с пустыми значениями
            if(!sex || !height || !weight || !age || !ratio ) {
                result.textContent = '____';
                return;
            }
            //Условие выполнение формулы 
            if(sex === 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight ) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight ) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
        //Получение статической информации из калькулятора
        function getStaticInformation(selector , activeClass) {
            const elements = document.querySelectorAll(selector);

            elements.forEach(element => {
                element.addEventListener('click', (event)=> {
                    if(event.target.getAttribute('data-ratio') ) {
                        ratio = +event.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                    } else {
                        sex = event.target.getAttribute('id');
                        localStorage.setItem('sex', event.target.getAttribute('id'));
                    }
        
                    elements.forEach(element => {
                        element.classList.remove(activeClass);
                    });
        
                    event.target.classList.add(activeClass);
                    calcTotal();
                });
            });
        }
        //Получение динамической информации из калькулятора
        function getDinamicInformation(selector) {
            const input = document.querySelector(selector);

            input.addEventListener('input', () => {
                if(input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
                switch(input.getAttribute('id')) {
                    case 'height':
                            height = +input.value;
                            break;
                    case 'weight':
                            weight = +input.value;
                            break;
                    case 'age':
                            age = +input.value;
                            break;
                }
                calcTotal();
            });
        };
        //Полученеие данных из lockalStoredge если они там есть и отображение их визуально
        function getLocalStoredge(selector, activeClass) {
            const element = document.querySelectorAll(selector);
            element.forEach(item => {
                item.classList.remove(activeClass);
                if(item.getAttribute('id') === localStorage.getItem('sex')) {
                    item.classList.add(activeClass);
                }
                if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    item.classList.add(activeClass);
                }
            });
        };

    //Вызовы
    getLocalStoredge('#gender div','calculating__choose-item_active');
    getLocalStoredge('.calculating__choose_big div','calculating__choose-item_active');
    calcTotal();
    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

module.exports = calculate;



/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((module) => {

function menu(){

    class MenuCard{

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
      
    //Интеграция библиотеки
    axios.get('http://localhost:3000/menu')
        .then(data => {
                data.data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render();
        });
    });
}

module.exports = menu;

/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/***/ ((module) => {

function modalWindow(){

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
}

module.exports = modalWindow;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){

const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrepper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrepper).width;

    let sliderIndex = 1;
    let offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrepper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
            dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.innerHTML = `
            <div class="carousel-indicators">
            </div>
            `;
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0 ){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () =>{
        // if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
        if(offset == deleteNotDigits() * (slides.length - 1)){
            offset = 0;
        } else {
            offset += deleteNotDigits();
        }
    slidesField.style.transform = `translateX(-${offset}px)`;
        if(sliderIndex == slides.length){
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        currentTarget();
        pointArray();
    });

    prev.addEventListener('click', () =>{
        if(offset == 0){
            offset = deleteNotDigits() * (slides.length - 1);
        } else {
            offset -= deleteNotDigits();
        }
    slidesField.style.transform = `translateX(-${offset}px)`;
        if(sliderIndex == 1){
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        
        currentTarget();
        pointArray();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            offset = deleteNotDigits() * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            currentTarget();
            pointArray();
        });
    }); 
    
    function currentTarget(){
        if(slides.length < 10){
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    };

    function pointArray(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex -1].style.opacity = 1;
    };

    function deleteNotDigits(){
       return +width.replace(/\D/g, '');
    };
}

module.exports = slider;




/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){

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
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

 function timer() {
 
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

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const   timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
            tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
            menu = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js"),
            slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
            calculate = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js"),
            modalWindow = __webpack_require__(/*! ./modules/modalWindow */ "./js/modules/modalWindow.js");


    timer();
    tabs();
    menu();
    slider();
    calculate();
    modalWindow();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map