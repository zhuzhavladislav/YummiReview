import React from 'react'
import s from './Footer.module.css'
import logo from '../../images/logo.png'

const Footer = () => {
    return (
        <footer>
            <div className={s.footerTop}>
                <img alt="Логотип YummiReview" src={logo} />
                <div>
                    <p>+7 (777) 777-77-77</p>
                    <p>zhuzha_vladislav@mail.ru</p>
                </div>
            </div>
            <hr className={s.footerLine} />
            <div className={s.footerItems}>
                <a href="">
                    О проекте
                </a>
                <a href="">
                    Вакансии
                </a>
                <a href="">
                    Мобильная версия
                </a>
                <a href="">
                    Правила
                </a>
            </div>
            <hr className={s.footerLine} />
            <div className={s.copyright}>
                <p>© 2022 YummiReview Перепечатка и использование любых материалов (текстовых и графических элементов),
                    допускается только с письменного разрешения редакции.</p>
            </div>
        </footer>
    )
}

export default Footer