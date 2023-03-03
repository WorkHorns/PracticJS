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