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