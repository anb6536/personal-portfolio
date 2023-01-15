
(function(){
    init();

    var pastScroll = 0;
    var g_containerInViewport;
    function init(){
        setStickyContainersSize();
        bindEvents();
    }

    function bindEvents(){
        window.addEventListener("scroll", wheelHandler);        
    }

    function setStickyContainersSize(){
        document.querySelectorAll('.sticky-container').forEach(function(container){
            const stikyContainerHeight = container.querySelector('.content-div-1').scrollWidth;
            container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
        });
    }

    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }

    function wheelHandler(evt){
        console.log(pastScroll);
        const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
            return isElementInViewport(container);
        })[0];

        if(!containerInViewPort){
            pastScroll = window.scrollY;
            return;
        }

        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

        if(g_canScrollHorizontally){
            containerInViewPort.querySelector('.content-div-1').scrollLeft += window.scrollY - pastScroll;
        }
        pastScroll = window.scrollY;
    }
})();