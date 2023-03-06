import React, { useState, useEffect } from 'react'
import EstablishmentsCard from './EstablishmentsCard'
import s from './Establishments.module.css'

const Establishments = () => {
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

    return (
        <main>
            <h1>Рейтинг лучших ресторанов России</h1>
            {isLoaded ? data.map((data) => <EstablishmentsCard key={data.name} data={data} />) : <p className={s.loading}>Загрузка...</p>}
            <div id="to-top"></div>
        </main>
    )
}

export default Establishments