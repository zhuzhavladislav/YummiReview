import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import s from './Main.module.css'
import MainCard from './MainCard'

const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    fetch("/api/getdata")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result.data);
          setIsLoaded(true);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
        }
      )
  }, [])

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <main>
      {isLoaded ?
        <>
          <h1>Обзоры заведений общественного питания</h1>
          <div className={s.category}>
            <div className={s.categoryTitle}>
              <h2>ВКУСНЫЕ РЕСТОРАНЫ РОССИИ</h2>
              <Link className="button" to="/establishments">Смотреть все</Link>
            </div>
            <div className={s.categoryItems}>
              {data.map((data) => <MainCard key={data.name} data={data} />)}
            </div>
          </div>
        </> : <p className={s.loading}>Загрузка...</p>}

      <div id="toTop"></div>
    </main>
  )
}

export default Main