import React from 'react'
import s from './Footer.module.css'
import { Link } from 'react-router-dom'
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
                <Link to="/">
                    О проекте
                </Link>
                <Link to="/">
                    Вакансии
                </Link>
                <Link to="/">
                    Правила
                </Link>
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