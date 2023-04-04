import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import s from './Header.module.css'

const Header = () => {
    return (
        <header>
            <img alt="Логотип YummiReview" src={logo} />
            <nav className={s.menu}>
                <Link to="/">Главная</Link>
                <Link to="/">О рейтинге</Link>
                <Link to="/add">Добавить заведение</Link>
            </nav>
        </header>
    )
}

export default Header