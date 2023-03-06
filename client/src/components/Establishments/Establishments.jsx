import React, { useState, useEffect } from 'react'
import EstablishmentsCard from './EstablishmentsCard'
import filterLeft from '../../images/icons/filter-left.svg'
import arrowDown from '../../images/icons/arrow-down.svg'
import s from './Establishments.module.css'

const Establishments = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState()
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch(`/api/establishment/?name=${search}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(data);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                }
            )
    }, [search])

    return (
        <main>
            <h1>Рейтинг лучших ресторанов России</h1>
            <div className={s.search}>
                <input type="text" placeholder="Поиск" onChange={(e) =>setSearch(e.target.value)}/>
                <div className={s.filters}>
                    <img alt="filter" src={filterLeft} />Фильтры<img alt="Развернуть фильтры" style={{ width: "20px" }} src={arrowDown} />
                </div>
            </div>
            {isLoaded ? Object.keys(data).length === 0 ? <p className={s.loading}>Результаты поиска отсутсвуют</p> : data.map((data) => <EstablishmentsCard key={data.name} data={data} />) : <p className={s.loading}>Загрузка...</p>}
            <div id="to-top"></div>
        </main>
    )
}

export default Establishments