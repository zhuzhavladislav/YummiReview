import React from 'react'
import { Link } from "react-router-dom"
import s from './Main.module.css'
import { restaraunts } from '../../Restaraunts'
import Card from './MainCard'

const Main = () => {
  return (
    <main>
      <h1>Обзоры заведений общественного питания</h1>
      <div className={s.category}>
        <div className={s.categoryTitle}>
          <h2>ВКУСНЫЕ РЕСТОРАНЫ РОССИИ</h2>
          <Link className="button" to="/establishments">Смотреть все</Link>
        </div>
        <div className={s.categoryItems}>
          {restaraunts.map((data) => <Card key={data.name} data={data} />)}
        </div>
      </div>
      <div id="toTop"></div>
    </main>
  )
}

export default Main