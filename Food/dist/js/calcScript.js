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
    function calcTotal(){
        //Условие с пустыми значениями
        if(!sex || !height || !weight || !age || !ratio ){
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
            element.addEventListener('click', (event)=>{
                if(event.target.getAttribute('data-ratio') ) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                elements.forEach(element =>{
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
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){
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
    //
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

