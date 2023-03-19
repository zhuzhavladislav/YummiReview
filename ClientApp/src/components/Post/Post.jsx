import React from 'react'
import s from './Post.module.css'

const Post = () => {
    return (
        <main className={s.main}>
            <p className={s.title}>Предложить заведение</p>
            <form id="validateForm" className={s.form} action="" novalidate>
                <input type="text" id="name" placeholder="Название заведения" className={s.input} />
                <label for="name" className={s.formLabel}>В формате: а-Я, a-Z, 0-9. Минимум 1 символ.</label>
                <input type="text" id="address" placeholder="Адрес" className={s.input} />
                <label for="address" className={s.formLabel}>Название улицы, проспекта и т.п., номер дома, номер квартиры<br />записываются в одну строку и отделяются запятыми.<br />Минимум 5 символов.</label>
                <textarea type="text" id="comment" placeholder="Комментарий" className={s.input} style={{height: 100}}></textarea>
                <label for="comment" className={s.formLabel}>Минимум 10 символов, максимум 200.</label>
                <input type="text" id="email" placeholder="Электронная почта" className={s.input} />
                <label for="email" className={s.formLabel}>Формат email. Пример: test@domain.ru</label>
                <div id="checkbox-div" style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 5, marginTop: 20}}>
                    <input type="checkbox" id="formAgreement" />
                    <label id="agreementLabel" for="formAgreement" className={s.checkbox__label}>Я даю своё согласие на обработку персональных данных</label>
                </div>
                <label for="checkbox-div" className={s.formLabel} style={{marginLeft: 0}}>*Для продолжения необходимо принять условия соглашения</label>
                <button type="submit">Предложить</button>
            </form>
        </main>
    )
}

export default Post