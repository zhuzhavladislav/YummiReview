document.addEventListener('DOMContentLoaded', function() {
    let scrolled, timer;
    upButton = document.getElementById('to-top')

    document.addEventListener('scroll', function() {
        scrolled = window.pageYOffset
        if (scrolled > 200) {
            upButton.classList.add('display')
        } else {
            upButton.classList.remove('display')
        }
    })

    upButton.onclick = function() {
        scrolled = window.pageYOffset
        scrollToTop()
    }

    function scrollToTop() {
        if (scrolled > 0) {
            window.scrollTo(0, scrolled)
            scrolled -= 5 // 5 - скорость прокрутки
            timer = setTimeout(scrollToTop, 1)
        } else {
            clearTimeout(timer);
            window.scrollTo(0, 0)
        }
    }

})