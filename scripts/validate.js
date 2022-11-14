document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('validateForm')
    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault() //запрещаем стандартную отправку формы
        let error = formValidate() //Проверка на ошибки
        let formData = new FormData(form) //Берем все данные полей
        
        if (error === 0) {
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let result = await response.json()
                alert(result.message)
                form.reset()
            } else {
                alert('Ошибка')
            }
        } else {
            console.log(error)
            alert('Заполните обязательные поля')
        }
    }

    function formValidate() {
        let error = 0
        let formReq = document.querySelectorAll('._req')
        let formLabel = document.querySelectorAll('.form-label')

        for(let index = 0; index <formReq.length; index++) {
            const element = formReq[index]
            const elementLabel = formLabel[index]
            formRemoveError(element)
            formRemoveError(elementLabel)

            if (element.id === 'name') {
                if(!validateName(element.value)) {
                    formAddError(element)
                    formAddError(elementLabel)
                    error++
                }
            } else if (element.id ==='address') {
                if (!validateAddress(element.value)) {
                    formAddError(element)
                    formAddError(elementLabel)
                    error++
                }
            } else if (element.id ==='comment') {
                if (!validateComment(element.value)) {
                    formAddError(element)
                    formAddError(elementLabel)
                    error++
                }
            } else if (element.id === 'email') {
                if(!validateEmail(element.value)) {
                    formAddError(element)
                    formAddError(elementLabel)
                    error++
                }
            } else if (element.getAttribute('type') === 'checkbox' && element.checked === false) {
                formAddError(elementLabel)
                error++
            } else if (element.value === '') {
                formAddError(element)
                formAddError(elementLabel)
                error++
            }
        } 
        return error;
    }

    function validateName(name) {
        let example = /^[а-яА-ЯёЁa-zA-Z0-9\w\d:#!"%/;$()~_?\+-=\\\.&].*$/
        return example.test(String(name).toLowerCase())
    }
    function validateAddress(address) {
        let example = /^(?=^.{5,}$)[а-яА-ЯёЁa-zA-Z0-9\w\d:#!"%/;$()~_?\+-=\\\.&].*$/
        return example.test(String(address).toLowerCase())
    }
    function validateComment(comment) {
        let example = /(?=^.{10,200}$).*$/
        return example.test(String(comment).toLowerCase())
    }
    function validateEmail(email) {
        let example = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return example.test(String(email).toLowerCase())
    }

    function formAddError(element) {
        element.classList.remove('correct')
        element.classList.add('error')
    }
    function formRemoveError(element) {
        element.classList.remove('error')
        element.classList.add('correct')
    }
});