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
            request.setRequestHeader('Content-type', 'multipart/form-data');

            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', ()=> {
                if(request.status === 200) {
                    statusMessage.textContent = message.success;
                }
                else {
                    statusMessage.textContent = message.fail;
                }
            })
        });
    };
});
