const result = document.querySelector('.calculating__result span');
let sex = 'female', 
    height, 
    weight, 
    age, 
    ratio = 1.375;

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
    function getStaticInformation(parentSelector , activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(element => {
            element.addEventListener('click', (event)=>{
                if(event.target.getAttribute('data-ratio') ) {
                    ratio = +event.target.getAttribute('data-ratio');
                } else {
                    sex = event.target.getAttribute('id');
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
//Вызовы
calcTotal();
getStaticInformation('#gender','calculating__choose-item_active');
getStaticInformation('.calculating__choose_big','calculating__choose-item_active');
getDinamicInformation('#height');
getDinamicInformation('#weight');
getDinamicInformation('#age');

