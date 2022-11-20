document.addEventListener('DOMContentLoaded', function() {
    var slideIndex = 1
    prevButton = document.getElementById('prev-button')
    nextButton = document.getElementById('next-button')
    slideshowContainer = document.getElementById('slideshow-container')
    showSlides(slideIndex)

    function plusSlides(n) {
        showSlides(slideIndex += n)
    }
    function currentSlide(n) {
        showSlides(slideIndex = n)
    }
    //Показ слайдов
    function showSlides(n) {
        var i
        var slides = document.getElementsByClassName("slide")
        var dots = document.getElementsByClassName("dot")
        if (n > slides.length) {
            slideIndex = 1
        } else if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("active", "")
        }
        slides[slideIndex - 1].style.display = "block"
        dots[slideIndex - 1].classList.add("active")
    }
    //При наведении на изображение появляются элементы управления
    slideshowContainer.addEventListener("mouseover", function(){
        nextButton.classList.add("active")
        prevButton.classList.add("active")
    });
    slideshowContainer.addEventListener("mouseout", function(){
        nextButton.classList.remove("active")
        prevButton.classList.remove("active")
    });
    //При клике на элементы управления
    nextButton.onclick = function(){
        plusSlides(1)
    }
    prevButton.onclick = function(){
        plusSlides(-1)
    }
});