document.addEventListener('DOMContentLoaded', function() {
    var images = document.getElementsByClassName("item-image")

    if (images.length > 0) {
        for(let img of images){
            img.addEventListener("click", zoomImg)
        }
    }

    document.getElementById("lbOuter").addEventListener("click", function(){
        this.classList.remove("show")
    })

    function zoomImg() {
        //Клонируем изображение
        var clone = this.cloneNode()
        clone.classList.remove("item-image")

        var lb = document.getElementById("lbInner")
        lb.innerHTML=""
        lb.appendChild(clone)

        lb= document.getElementById("lbOuter")
        lb.classList.add("show")
    }
    
    
});