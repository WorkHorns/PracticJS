const slides = document.querySelectorAll('.offer__slide'),
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

    next.addEventListener('click', () =>{
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
    slidesField.style.transform = `translateX(-${offset}px)`;
        if(sliderIndex == slides.length){
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        if(slides.length < 10){
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    });

    prev.addEventListener('click', () =>{
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
    slidesField.style.transform = `translateX(-${offset}px)`;
        if(sliderIndex == 1){
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        
        if(slides.length < 10){
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    });


    // showSlids(sliderIndex)

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // //Показ слайда
    // function showSlids(n){
    //     if(n > slides.length){
    //         sliderIndex = 1;
    //     }
        
    //     if(n < 1){
    //         sliderIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[sliderIndex - 1].style.display = 'block';

    //     if(slides.length < 10){
    //         current.textContent = `0${sliderIndex}`;
    //     } else {
    //         current.textContent = sliderIndex;
    //     }

    // };
    
    // //Изменение спомощью стрелочек
    // function plusSlides(n){
    //     showSlids(sliderIndex += n);
    // };
    
    // prev.addEventListener('click', () =>{
    //         plusSlides(-1);
    // })

    // next.addEventListener('click', () =>{
    //     plusSlides(+1);
    // })
