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

        currentTarget();
        pointArray();
    });

    prev.addEventListener('click', () =>{
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
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


