window.addEventListener('DOMContentLoaded', 
() =>
{
    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
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
