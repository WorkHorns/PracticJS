const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            current = document.querySelector('#current'),
            total = document.querySelector('#total');

    let sliderIndex = 1;

    showSlids(sliderIndex)

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    //Показ слайда
    function showSlids(n){
        if(n > slides.length){
            sliderIndex = 1;
        }
        
        if(n < 1){
            sliderIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[sliderIndex - 1].style.display = 'block';

        if(slides.length < 10){
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }

    };
    
    //Изменение спомощью стрелочек
    function plusSlides(n){
        showSlids(sliderIndex += n);
    };
    
    prev.addEventListener('click', () =>{
            plusSlides(-1);
    })

    next.addEventListener('click', () =>{
        plusSlides(+1);
    })
