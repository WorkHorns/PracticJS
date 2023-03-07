import {closeModal, openModal} from './modalWindow';
import { postData } from '../services/services';

function form(formSelector, modalTimerID){
    //Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'OK',
        fail: 'Fail'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    

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

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
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
        });
    };

    function showThanksModalWindow(message)
    {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerID);

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
            closeModal('.modal');
        },3000)
    };
}

export default form;
