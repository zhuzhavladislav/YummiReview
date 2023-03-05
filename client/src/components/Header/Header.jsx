import React from 'react'
import logo from '../../images/logo.png'
import filterLeft from '../../images/icons/filter-left.svg'
import arrowDown from '../../images/icons/arrow-down.svg'
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
            <div className={s.search}>
                <input type="text" placeholder="Поиск" />
                <div className={s.filters}>
                    <img alt="filter" src={filterLeft} />Фильтры<img alt="Развернуть фильтры" style={{ width: "20px" }} src={arrowDown} />
                </div>
            </div>
        </header>
    )
}

export default Header