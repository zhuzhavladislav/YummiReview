import React from 'react'
import logo from '../../images/logo.png'
import s from './Header.module.css'

const Header = () => {
    return (
        <header>
            <img alt="Логотип YummiReview" src={logo} />
            <nav className={s.menu}>
                <a href="/">Главная</a>
                <a href="/">О рейтинге</a>
                <a href="/add">Добавить заведение</a>
            </nav>
        </header>
    )
}

export default Header