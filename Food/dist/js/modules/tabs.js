function tabs(tabSelector, tabContentSelector, tabParentSelector, activClass){

    const tabs = document.querySelectorAll(tabSelector),
                tabContent = document.querySelectorAll(tabContentSelector),
                tabsParent = document.querySelector(tabParentSelector);

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
                item.classList.remove(activClass);
            });
        }

        //определения какой таб долженбыть показан.
        function showTabContent(i = 0)
        {
            tabContent[i].classList.add('show', 'fade');
            tabContent[i].classList.remove('hide');
            tabs[i].classList.add(activClass);
        }
        
        tabsParent.addEventListener('click', (event) => 
        {
            const target = event.target;

            if(target && target.classList.contains(tabSelector.slice(1)))
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

export default tabs;